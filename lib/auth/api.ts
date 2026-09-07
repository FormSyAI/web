import {
  DEFAULT_AUTH_RETURN_TO,
  isSafeAuthReturnTo,
  normalizeAuthReturnTo,
} from './redirect';
import { withBasePath } from '@/components/runtime/app-link';

export type AuthIntent = 'login' | 'signup';

export type AuthFieldErrors = Record<string, string>;

export type AuthResult = {
  message?: string;
  redirectTo?: string;
  preview?: true;
};

export type SignupPreparation = AuthResult & {
  signupToken: string;
};

export type SignupInput = {
  email: string;
  fullName: string;
  password: string;
  signupToken: string;
  termsAccepted: true;
  verificationToken: string;
  returnTo?: string;
};

export type LoginInput = {
  email: string;
  password: string;
  returnTo?: string;
};

export type PhoneAuthInput = {
  phone: string;
  code: string;
  intent: AuthIntent;
  returnTo?: string;
};

export type WechatSession = AuthResult & {
  sessionId: string;
  expiresIn: number;
};

export type SsoInput = {
  workEmail?: string;
  accountId?: string;
  returnTo?: string;
};

export class AuthApiError extends Error {
  readonly code: string;
  readonly fieldErrors: AuthFieldErrors;
  readonly status: number;

  constructor({
    code = 'AUTH_REQUEST_FAILED',
    fieldErrors = {},
    message,
    status = 0,
  }: {
    code?: string;
    fieldErrors?: AuthFieldErrors;
    message: string;
    status?: number;
  }) {
    super(message);
    this.name = 'AuthApiError';
    this.code = code;
    this.fieldErrors = fieldErrors;
    this.status = status;
  }
}

export type AuthApi = {
  prepareSignup(email: string): Promise<SignupPreparation>;
  completeSignup(input: SignupInput): Promise<AuthResult>;
  login(input: LoginInput): Promise<AuthResult>;
  requestPhoneCode(phone: string, intent: AuthIntent): Promise<AuthResult>;
  verifyPhone(input: PhoneAuthInput): Promise<AuthResult>;
  createWechatSession(
    intent: AuthIntent,
    returnTo?: string,
  ): Promise<WechatSession>;
  requestPasswordReset(email: string): Promise<AuthResult>;
  resolveSso(input: SsoInput): Promise<AuthResult>;
};

type ApiErrorPayload = {
  code?: string;
  message?: string;
  fieldErrors?: AuthFieldErrors;
};

const configuredAuthApiBaseUrl =
  import.meta.env.VITE_AURINOVA_AUTH_API_BASE_URL?.trim() ?? '';
const authApiEnabled = Boolean(
  configuredAuthApiBaseUrl &&
  import.meta.env.VITE_AURINOVA_AUTH_ENABLED?.toLowerCase() === 'true',
);
const configuredTurnstileSiteKey =
  import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() ?? '';

function safeLegalDocumentUrl(value?: string) {
  const candidate = value?.trim();
  if (!candidate) return '';
  if (isSafeAuthReturnTo(candidate)) return normalizeAuthReturnTo(candidate);
  try {
    const url = new URL(candidate);
    return url.protocol === 'https:' ? url.toString() : '';
  } catch {
    return '';
  }
}

const configuredTermsUrl = safeLegalDocumentUrl(
  import.meta.env.VITE_AURINOVA_TERMS_URL,
);
const configuredDataAgreementUrl = safeLegalDocumentUrl(
  import.meta.env.VITE_AURINOVA_DATA_AGREEMENT_URL,
);
const signupApiEnabled = Boolean(
  authApiEnabled &&
  configuredTurnstileSiteKey &&
  configuredTermsUrl &&
  configuredDataAgreementUrl,
);
const requestTimeoutMs = 12_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function parseErrorPayload(payload: unknown): ApiErrorPayload {
  if (!isRecord(payload)) return {};
  const fieldErrors = isRecord(payload.fieldErrors)
    ? Object.fromEntries(
        Object.entries(payload.fieldErrors).filter(
          (entry): entry is [string, string] => typeof entry[1] === 'string',
        ),
      )
    : undefined;
  return {
    code: typeof payload.code === 'string' ? payload.code : undefined,
    message: typeof payload.message === 'string' ? payload.message : undefined,
    fieldErrors,
  };
}

function parseAuthResult(payload: unknown): AuthResult {
  if (!isRecord(payload)) {
    throw new AuthApiError({
      code: 'AUTH_INVALID_RESPONSE',
      message: 'The authentication service returned an invalid response.',
      status: 502,
    });
  }

  const result: AuthResult = {};
  if (payload.message !== undefined) {
    if (typeof payload.message !== 'string') {
      throw new AuthApiError({
        code: 'AUTH_INVALID_RESPONSE',
        message: 'The authentication service returned an invalid response.',
        status: 502,
      });
    }
    result.message = payload.message;
  }
  if (payload.redirectTo !== undefined) {
    if (!isSafeAuthReturnTo(payload.redirectTo)) {
      throw new AuthApiError({
        code: 'AUTH_INVALID_REDIRECT',
        message: 'The authentication service returned an unsafe destination.',
        status: 502,
      });
    }
    result.redirectTo = normalizeAuthReturnTo(payload.redirectTo);
  }
  return result;
}

function parseSignupPreparation(payload: unknown): SignupPreparation {
  const result = parseAuthResult(payload);
  const signupToken = isRecord(payload) ? payload.signupToken : undefined;
  if (
    typeof signupToken !== 'string' ||
    signupToken.length === 0 ||
    signupToken.length > 2048
  ) {
    throw new AuthApiError({
      code: 'AUTH_INVALID_RESPONSE',
      message: 'The authentication service did not return a signup token.',
      status: 502,
    });
  }
  return { ...result, signupToken };
}

function parseSsoResult(payload: unknown): AuthResult {
  const result = parseAuthResult(payload);
  if (!result.redirectTo) {
    throw new AuthApiError({
      code: 'AUTH_SSO_REDIRECT_MISSING',
      message:
        'The authentication service did not return an identity-provider destination.',
      status: 502,
    });
  }
  return result;
}

function parseWechatSession(payload: unknown): WechatSession {
  const result = parseAuthResult(payload);
  const sessionId = isRecord(payload) ? payload.sessionId : undefined;
  const expiresIn = isRecord(payload) ? payload.expiresIn : undefined;
  if (
    typeof sessionId !== 'string' ||
    !sessionId ||
    typeof expiresIn !== 'number' ||
    !Number.isFinite(expiresIn)
  ) {
    throw new AuthApiError({
      code: 'AUTH_INVALID_RESPONSE',
      message: 'The authentication service returned an invalid WeChat session.',
      status: 502,
    });
  }
  return { ...result, sessionId, expiresIn };
}

async function request<T>(
  path: string,
  body: unknown,
  parseSuccess: (payload: unknown) => T,
): Promise<T> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    const response = await fetch(
      new URL(
        path.replace(/^\//, ''),
        `${configuredAuthApiBaseUrl.replace(/\/$/, '')}/`,
      ),
      {
        method: 'POST',
        cache: 'no-store',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Accept-Language':
            document.documentElement.lang === 'zh-CN' ? 'zh-CN' : 'en-US',
          'Content-Type': 'application/json',
          'X-AURINOVA-Auth-Request': 'auth-ui-v1',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      },
    );
    const responseText = await response.text();
    let payload: unknown = {};
    if (responseText) {
      try {
        payload = JSON.parse(responseText) as unknown;
      } catch {
        throw new AuthApiError({
          code: 'AUTH_INVALID_RESPONSE',
          message: 'The authentication service returned an invalid response.',
          status: 502,
        });
      }
    }

    if (!response.ok) {
      const error = parseErrorPayload(payload);
      throw new AuthApiError({
        code: error.code,
        fieldErrors: error.fieldErrors,
        message:
          error.message ??
          `Authentication request failed (${response.status}).`,
        status: response.status,
      });
    }
    return parseSuccess(payload);
  } catch (error) {
    if (error instanceof AuthApiError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new AuthApiError({
        code: 'AUTH_TIMEOUT',
        message: 'The authentication service took too long to respond.',
      });
    }
    throw new AuthApiError({
      code: 'AUTH_NETWORK_ERROR',
      message:
        error instanceof Error ? error.message : 'Network request failed.',
    });
  } finally {
    window.clearTimeout(timer);
  }
}

const demoDelay = 420;

async function demoResult<T>(value: T): Promise<T> {
  await new Promise((resolve) => window.setTimeout(resolve, demoDelay));
  return value;
}

export const authApi: AuthApi = {
  prepareSignup(email) {
    if (!signupApiEnabled) {
      return demoResult({ signupToken: 'preview-signup-token', preview: true });
    }
    return request(
      '/api/auth/signup/prepare',
      { email },
      parseSignupPreparation,
    );
  },

  completeSignup(input) {
    if (!signupApiEnabled) return demoResult({ preview: true });
    return request('/api/auth/signup/complete', input, parseAuthResult);
  },

  login(input) {
    if (!authApiEnabled) return demoResult({ preview: true });
    return request('/api/auth/login', input, parseAuthResult);
  },

  requestPhoneCode(phone, intent) {
    if (!authApiEnabled) return demoResult({ preview: true });
    return request('/api/auth/phone/code', { phone, intent }, parseAuthResult);
  },

  verifyPhone(input) {
    if (!authApiEnabled) return demoResult({ preview: true });
    return request('/api/auth/phone/verify', input, parseAuthResult);
  },

  createWechatSession(intent, returnTo) {
    if (!authApiEnabled) {
      return demoResult({
        sessionId: 'preview-wechat-session',
        expiresIn: 300,
        preview: true,
      });
    }
    return request(
      '/api/auth/wechat/session',
      {
        intent,
        returnTo: normalizeAuthReturnTo(returnTo, DEFAULT_AUTH_RETURN_TO),
      },
      parseWechatSession,
    );
  },

  requestPasswordReset(email) {
    if (!authApiEnabled) return demoResult({ preview: true });
    return request(
      '/api/auth/password/reset-request',
      { email },
      parseAuthResult,
    );
  },

  resolveSso(input) {
    if (!authApiEnabled) return demoResult({ preview: true });
    return request('/api/auth/sso/resolve', input, parseSsoResult);
  },
};

export const isAuthApiConfigured = authApiEnabled;
export const isSignupApiConfigured = signupApiEnabled;
export const turnstileSiteKey = configuredTurnstileSiteKey;
export const authTermsUrl =
  configuredTermsUrl || withBasePath('/aurinova-reference/terms');
export const authDataAgreementUrl =
  configuredDataAgreementUrl ||
  withBasePath('/aurinova-reference/data-processing');
