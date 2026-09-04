export type AuthProvider = 'google' | 'github' | 'linkedin';
export type AuthIntent = 'login' | 'signup';

export type AuthFieldErrors = Record<string, string>;

export type AuthResult = {
  message?: string;
  redirectTo?: string;
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
};

export type LoginInput = {
  email: string;
  password: string;
};

export type SsoInput = {
  workEmail?: string;
  accountId?: string;
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
  requestPasswordReset(email: string): Promise<AuthResult>;
  resolveSso(input: SsoInput): Promise<AuthResult>;
  getOAuthUrl(
    provider: AuthProvider,
    intent: AuthIntent,
    returnTo?: string,
  ): string | null;
};

type ApiErrorPayload = {
  code?: string;
  message?: string;
  fieldErrors?: AuthFieldErrors;
};

const authApiEnabled =
  process.env.NEXT_PUBLIC_AURINOVA_AUTH_ENABLED?.toLowerCase() === 'true';
const requestTimeoutMs = 12_000;

function safeReturnTo(value = '/account/home') {
  return value.startsWith('/') && !value.startsWith('//')
    ? value
    : '/account/home';
}

async function request<T>(path: string, body: unknown): Promise<T> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    const response = await fetch(path, {
      method: 'POST',
      cache: 'no-store',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const payload = (await response.json().catch(() => ({}))) as
      | T
      | ApiErrorPayload;

    if (!response.ok) {
      const error = payload as ApiErrorPayload;
      throw new AuthApiError({
        code: error.code,
        fieldErrors: error.fieldErrors,
        message:
          error.message ??
          `Authentication request failed (${response.status}).`,
        status: response.status,
      });
    }
    return payload as T;
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
    if (!authApiEnabled) {
      return demoResult({ signupToken: `preview-${email}` });
    }
    return request<SignupPreparation>('/api/auth/signup/prepare', { email });
  },

  completeSignup(input) {
    if (!authApiEnabled) return demoResult({});
    return request<AuthResult>('/api/auth/signup/complete', input);
  },

  login(input) {
    if (!authApiEnabled) return demoResult({});
    return request<AuthResult>('/api/auth/login', input);
  },

  requestPasswordReset(email) {
    if (!authApiEnabled) return demoResult({});
    return request<AuthResult>('/api/auth/password/reset-request', { email });
  },

  resolveSso(input) {
    if (!authApiEnabled) return demoResult({});
    return request<AuthResult>('/api/auth/sso/resolve', input);
  },

  getOAuthUrl(provider, intent, returnTo) {
    if (!authApiEnabled) return null;
    const url = new URL(`/api/auth/oauth/${provider}`, window.location.origin);
    url.searchParams.set('intent', intent);
    url.searchParams.set('return_to', safeReturnTo(returnTo));
    return url.toString();
  },
};

export const isAuthApiConfigured = authApiEnabled;
