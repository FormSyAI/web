'use client';

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  type InputHTMLAttributes,
  type SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { LanguageSwitcher } from '@/components/i18n/language-switcher';
import { HumanVerification } from '@/components/auth/human-verification';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/components/i18n/i18n-provider';
import {
  authDictionaries,
  type AuthContent,
  type AuthProvider,
  type AuthScreen,
} from '@/content/auth.i18n';
import {
  authApi,
  authDataAgreementUrl,
  authTermsUrl,
  AuthApiError,
  isAuthApiConfigured,
  isSignupApiConfigured,
} from '@/lib/auth/api';
import {
  DEFAULT_AUTH_RETURN_TO,
  normalizeAuthReturnTo,
} from '@/lib/auth/redirect';

type Notice = { tone: 'error' | 'info' | 'success'; text: string } | null;
type FieldErrors = Record<string, string>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const accountIdPattern = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

function format(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, value),
    template,
  );
}

function focusField(id: string) {
  window.requestAnimationFrame(() => document.getElementById(id)?.focus());
}

function apiFailure(error: unknown, copy: AuthContent) {
  if (error instanceof AuthApiError) {
    const localizedField = (field: string) => {
      if (field === 'email' || field === 'workEmail') {
        return copy.validation.invalidEmail;
      }
      if (field === 'fullName') return copy.validation.requiredName;
      if (field === 'password') return copy.validation.requiredPassword;
      if (field === 'accountId') return copy.validation.invalidAccountId;
      if (field === 'verificationToken' || field === 'humanVerification') {
        return copy.validation.humanVerification;
      }
      if (field === 'termsAccepted') {
        return copy.validation.termsAcceptance;
      }
      return null;
    };
    const fieldErrors =
      error.code === 'AUTH_VALIDATION_FAILED'
        ? Object.fromEntries(
            Object.keys(error.fieldErrors).flatMap((field) => {
              const localized = localizedField(field);
              const target =
                field === 'verificationToken' ? 'humanVerification' : field;
              return localized ? [[target, localized]] : [];
            }),
          )
        : {
            ...error.fieldErrors,
            ...(error.fieldErrors.verificationToken &&
            !error.fieldErrors.humanVerification
              ? { humanVerification: error.fieldErrors.verificationToken }
              : {}),
          };
    const localizedMessages: Partial<Record<string, string>> = {
      AUTH_CONTENT_TYPE_REQUIRED: copy.validation.apiErrors.invalidRequest,
      AUTH_INVALID_JSON: copy.validation.apiErrors.invalidRequest,
      AUTH_INVALID_REDIRECT: copy.validation.apiErrors.invalidResponse,
      AUTH_INVALID_RESPONSE: copy.validation.apiErrors.invalidResponse,
      AUTH_NETWORK_ERROR: copy.validation.apiErrors.unavailable,
      AUTH_NOT_CONFIGURED: copy.validation.apiErrors.notConfigured,
      AUTH_REQUEST_REJECTED: copy.validation.apiErrors.rejected,
      AUTH_REQUEST_TOO_LARGE: copy.validation.apiErrors.invalidRequest,
      AUTH_SSO_REDIRECT_MISSING: copy.validation.apiErrors.ssoDestination,
      AUTH_TIMEOUT: copy.validation.apiErrors.timeout,
      AUTH_UPSTREAM_ERROR: copy.validation.apiErrors.unavailable,
      AUTH_VALIDATION_FAILED: copy.validation.apiErrors.invalidRequest,
    };
    const statusMessage =
      error.status === 401
        ? copy.validation.apiErrors.credentials
        : error.status === 429
          ? copy.validation.apiErrors.rateLimited
          : error.status >= 500
            ? copy.validation.apiErrors.unavailable
            : undefined;
    return {
      message:
        localizedMessages[error.code] ??
        statusMessage ??
        error.message ??
        copy.validation.genericError,
      fieldErrors,
    };
  }
  return { message: copy.validation.genericError, fieldErrors: {} };
}

function safeRedirect(destination?: string) {
  if (!destination) return false;
  const normalized = normalizeAuthReturnTo(destination, '');
  if (!normalized) return false;
  window.location.assign(normalized);
  return true;
}

function currentReturnTo() {
  const params = new URLSearchParams(window.location.search);
  return normalizeAuthReturnTo(
    params.get('return_to') ?? params.get('redirectURI'),
    DEFAULT_AUTH_RETURN_TO,
  );
}

const termsHref = authTermsUrl;
const dataAgreementHref = authDataAgreementUrl;

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285f4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.4Z"
      />
      <path
        fill="#34a853"
        d="M12 22c2.7 0 4.97-.9 6.63-2.37l-3.24-2.54c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#fbbc05"
        d="M6.39 13.92a6 6 0 0 1 0-3.84V7.46H3.04a10 10 0 0 0 0 9.08l3.35-2.62Z"
      />
      <path
        fill="#ea4335"
        d="M12 5.95c1.47 0 2.8.5 3.84 1.5l2.86-2.86A9.61 9.61 0 0 0 12 2a10 10 0 0 0-8.96 5.46l3.35 2.62C7.18 7.71 9.39 5.95 12 5.95Z"
      />
    </svg>
  );
}

function ProviderIcon({ provider }: { provider: AuthProvider }) {
  if (provider === 'google') return <GoogleMark />;
  if (provider === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .08 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.66a9.3 9.3 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.23 10.23 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5.2 3.4A2.2 2.2 0 1 1 5.2 7.8a2.2 2.2 0 0 1 0-4.4ZM3.3 9.2h3.8V21H3.3V9.2Zm6.1 0H13v1.61h.05c.5-.94 1.72-1.94 3.54-1.94 3.78 0 4.48 2.5 4.48 5.74V21h-3.79v-5.66c0-1.35-.03-3.08-1.88-3.08-1.88 0-2.17 1.47-2.17 2.98V21H9.44V9.2Z"
      />
    </svg>
  );
}

function AuthField({
  error,
  hint,
  id,
  label,
  ...props
}: {
  error?: string;
  hint?: string;
  id: string;
  label: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  const descriptionId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      <Input
        {...props}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={descriptionId}
      />
      {error ? (
        <p className="auth-field-error" id={`${id}-error`}>
          {error}
        </p>
      ) : hint ? (
        <p className="auth-field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function PasswordField({
  error,
  hint,
  id,
  label,
  onChange,
  value,
}: {
  error?: string;
  hint?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  const { locale } = useI18n();
  const copy = authDictionaries[locale];
  const [visible, setVisible] = useState(false);

  return (
    <div className="auth-password-field">
      <AuthField
        id={id}
        label={label}
        type={visible ? 'text' : 'password'}
        autoComplete={
          id === 'login-password' ? 'current-password' : 'new-password'
        }
        maxLength={256}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        error={error}
        hint={hint}
      />
      <button
        className="auth-password-toggle"
        type="button"
        aria-label={
          visible ? copy.common.hidePassword : copy.common.showPassword
        }
        title={visible ? copy.common.hidePassword : copy.common.showPassword}
        onClick={() => setVisible((current) => !current)}
      >
        {visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
      </button>
    </div>
  );
}

function StatusNotice({ notice }: { notice: Notice }) {
  if (!notice) return null;
  return (
    <div
      className={`auth-notice is-${notice.tone}`}
      role={notice.tone === 'error' ? 'alert' : 'status'}
      aria-live="polite"
    >
      {notice.tone === 'success' && <Check aria-hidden="true" />}
      <span>{notice.text}</span>
    </div>
  );
}

function Terms({ copy }: { copy: AuthContent }) {
  return (
    <p className="auth-terms">
      {copy.common.termsPrefix} <a href={termsHref}>{copy.common.terms}</a>{' '}
      {copy.common.termsJoin}{' '}
      <a href={dataAgreementHref}>{copy.common.dataAgreement}</a>
      {copy.common.termsSuffix}
    </p>
  );
}

function SignupConsent({
  checked,
  copy,
  error,
  onChange,
}: {
  checked: boolean;
  copy: AuthContent;
  error?: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="auth-consent">
      <input
        id="signup-terms"
        type="checkbox"
        checked={checked}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'signup-terms-error' : undefined}
        onChange={(event) => onChange(event.target.checked)}
      />
      <label htmlFor="signup-terms">
        {copy.signup.acceptTerms} <a href={termsHref}>{copy.common.terms}</a>{' '}
        {copy.common.termsJoin}{' '}
        <a href={dataAgreementHref}>{copy.common.dataAgreement}</a>
        {copy.common.termsSuffix}
      </label>
      {error && (
        <p className="auth-field-error" id="signup-terms-error">
          {error}
        </p>
      )}
    </div>
  );
}

function SocialButtons({
  copy,
  intent,
  onNotice,
}: {
  copy: AuthContent;
  intent: 'login' | 'signup';
  onNotice: (notice: Notice) => void;
}) {
  const providers = useMemo<AuthProvider[]>(
    () => ['google', 'github', 'linkedin'],
    [],
  );
  const prefix =
    intent === 'signup'
      ? copy.signup.providerPrefix
      : copy.login.providerPrefix;

  const startProvider = (provider: AuthProvider) => {
    const url = authApi.getOAuthUrl(provider, intent, currentReturnTo());
    if (url) {
      window.location.assign(url);
      return;
    }
    onNotice({
      tone: 'info',
      text: format(copy.validation.providerReady, {
        provider: copy.common.providers[provider],
      }),
    });
  };

  return (
    <div className="auth-social-list">
      {providers.map((provider) => (
        <Button
          className="auth-social-button"
          variant="outline"
          type="button"
          key={provider}
          onClick={() => startProvider(provider)}
        >
          <ProviderIcon provider={provider} />
          <span>
            {format(prefix, { provider: copy.common.providers[provider] })}
          </span>
        </Button>
      ))}
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="auth-divider" aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}

function getPasswordChecks(password: string, confirmation: string) {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  return {
    minLength: password.length >= 8,
    lowercase: hasLowercase,
    uppercase: hasUppercase,
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    match: password.length > 0 && password === confirmation,
  };
}

function PasswordChecklist({
  confirmation,
  copy,
  password,
}: {
  confirmation: string;
  copy: AuthContent;
  password: string;
}) {
  const checks = getPasswordChecks(password, confirmation);
  return (
    <ul className="auth-password-checks" aria-live="polite">
      {(Object.keys(checks) as (keyof typeof checks)[]).map((key) => (
        <li className={checks[key] ? 'is-valid' : ''} key={key}>
          {checks[key] ? (
            <Check aria-hidden="true" />
          ) : (
            <X aria-hidden="true" />
          )}
          <span>{copy.signup.passwordRules[key]}</span>
        </li>
      ))}
    </ul>
  );
}

function SuccessState({
  actionHref,
  actionLabel,
  description,
  secondaryAction,
  title,
}: {
  actionHref: string;
  actionLabel: string;
  description: string;
  secondaryAction?: React.ReactNode;
  title: string;
}) {
  return (
    <section className="auth-success" aria-live="polite">
      <CheckCircle2 aria-hidden="true" />
      <h1>{title}</h1>
      <p>{description}</p>
      <Link className="auth-primary-link" href={actionHref}>
        {actionLabel}
        <ArrowRight aria-hidden="true" />
      </Link>
      {secondaryAction}
    </section>
  );
}

function SignupPanel({ copy }: { copy: AuthContent }) {
  const { locale } = useI18n();
  const [step, setStep] = useState<'email' | 'details' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [signupToken, setSignupToken] = useState('');
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState<Notice>(null);
  const passwordChecks = getPasswordChecks(password, confirmPassword);
  const passwordReady = Object.values(passwordChecks).every(Boolean);

  const submitEmail = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const nextErrors: FieldErrors = {};
    if (!trimmedEmail) nextErrors.email = copy.validation.requiredEmail;
    else if (!emailPattern.test(trimmedEmail))
      nextErrors.email = copy.validation.invalidEmail;
    if (nextErrors.email) {
      setErrors(nextErrors);
      focusField('signup-email');
      return;
    }

    setPending(true);
    setErrors({});
    setNotice(null);
    try {
      const result = await authApi.prepareSignup(trimmedEmail);
      setEmail(trimmedEmail);
      setSignupToken(result.signupToken);
      setStep('details');
      focusField('signup-name');
    } catch (error) {
      const failure = apiFailure(error, copy);
      setErrors(failure.fieldErrors);
      setNotice({ tone: 'error', text: failure.message });
    } finally {
      setPending(false);
    }
  };

  const submitDetails = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FieldErrors = {};
    if (!fullName.trim()) nextErrors.fullName = copy.validation.requiredName;
    if (!passwordReady) nextErrors.password = copy.validation.shortPassword;
    if (!verificationToken)
      nextErrors.humanVerification = copy.validation.humanVerification;
    if (!termsAccepted)
      nextErrors.termsAccepted = copy.validation.termsAcceptance;

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      focusField(
        nextErrors.fullName
          ? 'signup-name'
          : nextErrors.password
            ? 'signup-password'
            : nextErrors.humanVerification
              ? 'signup-human-verification'
              : 'signup-terms',
      );
      return;
    }

    setPending(true);
    setErrors({});
    setNotice(null);
    try {
      const result = await authApi.completeSignup({
        email,
        fullName: fullName.trim(),
        password,
        signupToken,
        termsAccepted: true,
        verificationToken,
        returnTo: currentReturnTo(),
      });
      if (!safeRedirect(result.redirectTo)) setStep('success');
    } catch (error) {
      const failure = apiFailure(error, copy);
      setErrors(failure.fieldErrors);
      setNotice({ tone: 'error', text: failure.message });
    } finally {
      setPending(false);
    }
  };

  const resend = async () => {
    setPending(true);
    setNotice(null);
    try {
      await authApi.prepareSignup(email);
      setNotice({ tone: 'success', text: copy.signup.resendSuccess });
    } catch (error) {
      setNotice({
        tone: 'error',
        text: apiFailure(error, copy).message,
      });
    } finally {
      setPending(false);
    }
  };

  if (step === 'success') {
    return (
      <SuccessState
        title={
          isSignupApiConfigured
            ? copy.signup.successTitle
            : copy.preview.signupTitle
        }
        description={format(
          isSignupApiConfigured
            ? copy.signup.successDescription
            : copy.preview.signupDescription,
          { email },
        )}
        actionHref="/aurinova-reference/login"
        actionLabel={copy.signup.goToLogin}
        secondaryAction={
          isSignupApiConfigured ? (
            <>
              <Button
                className="auth-text-button"
                variant="ghost"
                type="button"
                disabled={pending}
                onClick={resend}
              >
                {pending ? copy.common.submitPending : copy.signup.resend}
              </Button>
              <StatusNotice notice={notice} />
            </>
          ) : undefined
        }
      />
    );
  }

  if (step === 'details') {
    return (
      <>
        <button
          className="auth-back"
          type="button"
          onClick={() => {
            setStep('email');
            setEmail('');
            setSignupToken('');
            setFullName('');
            setPassword('');
            setConfirmPassword('');
            setVerificationToken('');
            setTermsAccepted(false);
            setErrors({});
            setNotice(null);
          }}
        >
          <ArrowLeft aria-hidden="true" />
          {copy.common.back}
        </button>
        <h1>{copy.signup.detailsTitle}</h1>
        <p className="auth-panel-intro">{copy.signup.detailsDescription}</p>
        <p className="auth-selected-email">
          {email}
          <button type="button" onClick={() => setStep('email')}>
            {copy.signup.changeEmail}
          </button>
        </p>
        <form className="auth-form" noValidate onSubmit={submitDetails}>
          <AuthField
            id="signup-name"
            label={copy.signup.fullName}
            type="text"
            autoComplete="name"
            maxLength={120}
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            error={errors.fullName}
            placeholder={copy.signup.fullNamePlaceholder}
          />
          <PasswordField
            id="signup-password"
            label={copy.common.password}
            value={password}
            onChange={setPassword}
            error={errors.password}
            hint={copy.signup.passwordHint}
          />
          <PasswordField
            id="signup-confirm-password"
            label={copy.signup.confirmPassword}
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={errors.confirmPassword}
          />
          <PasswordChecklist
            copy={copy}
            password={password}
            confirmation={confirmPassword}
          />
          <HumanVerification
            copy={copy}
            locale={locale}
            token={verificationToken}
            onTokenChange={setVerificationToken}
            error={errors.humanVerification}
          />
          {errors.humanVerification && (
            <p
              className="auth-field-error"
              id="signup-human-verification-error"
            >
              {errors.humanVerification}
            </p>
          )}
          <SignupConsent
            checked={termsAccepted}
            copy={copy}
            error={errors.termsAccepted}
            onChange={setTermsAccepted}
          />
          <StatusNotice notice={notice} />
          <Button
            className="auth-submit"
            type="submit"
            disabled={
              pending || !passwordReady || !verificationToken || !termsAccepted
            }
          >
            {pending ? copy.common.submitPending : copy.signup.createAccount}
          </Button>
        </form>
      </>
    );
  }

  return (
    <>
      <Link className="auth-back" href="/aurinova-reference/login">
        <ArrowLeft aria-hidden="true" />
        {copy.common.back}
      </Link>
      <h1>{copy.signup.title}</h1>
      <form className="auth-form" noValidate onSubmit={submitEmail}>
        <AuthField
          id="signup-email"
          label={copy.common.email}
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
        />
        <StatusNotice notice={notice} />
        <Button className="auth-submit" type="submit" disabled={pending}>
          {pending ? copy.common.submitPending : copy.common.next}
        </Button>
      </form>
      <Divider label={copy.common.or} />
      <SocialButtons copy={copy} intent="signup" onNotice={setNotice} />
      <p className="auth-switch-path">
        {copy.signup.existingAccount}{' '}
        <Link href="/aurinova-reference/login">{copy.signup.login}</Link>
      </p>
    </>
  );
}

function LoginPanel({ copy }: { copy: AuthContent }) {
  const [notice, setNotice] = useState<Notice>(null);
  return (
    <>
      <h1>{copy.login.title}</h1>
      <StatusNotice notice={notice} />
      <SocialButtons copy={copy} intent="login" onNotice={setNotice} />
      <Divider label={copy.common.or} />
      <div className="auth-login-options">
        <Link href="/aurinova-reference/login/email">
          {copy.login.emailLogin}
        </Link>
        <Link href="/aurinova-reference/login/sso">{copy.login.ssoLogin}</Link>
      </div>
      <p className="auth-switch-path">
        {copy.login.noAccount}{' '}
        <Link href="/aurinova-reference/signup">{copy.login.signup}</Link>
      </p>
    </>
  );
}

function EmailLoginPanel({ copy }: { copy: AuthContent }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState<Notice>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const nextErrors: FieldErrors = {};
    if (!trimmedEmail) nextErrors.email = copy.validation.requiredEmail;
    else if (!emailPattern.test(trimmedEmail))
      nextErrors.email = copy.validation.invalidEmail;
    if (!password) nextErrors.password = copy.validation.requiredPassword;
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      focusField(nextErrors.email ? 'login-email' : 'login-password');
      return;
    }

    setPending(true);
    setErrors({});
    setNotice(null);
    try {
      const result = await authApi.login({
        email: trimmedEmail,
        password,
        returnTo: currentReturnTo(),
      });
      if (!safeRedirect(result.redirectTo)) setSuccess(true);
    } catch (error) {
      const failure = apiFailure(error, copy);
      setErrors(failure.fieldErrors);
      setNotice({ tone: 'error', text: failure.message });
    } finally {
      setPending(false);
    }
  };

  if (success) {
    return (
      <SuccessState
        title={
          isAuthApiConfigured
            ? copy.login.successTitle
            : copy.preview.loginTitle
        }
        description={
          isAuthApiConfigured
            ? copy.login.successDescription
            : copy.preview.loginDescription
        }
        actionHref="/aurinova-reference"
        actionLabel={copy.shell.homeLabel}
      />
    );
  }

  return (
    <>
      <Link className="auth-back" href="/aurinova-reference/login">
        <ArrowLeft aria-hidden="true" />
        {copy.common.back}
      </Link>
      <h1>{copy.login.emailTitle}</h1>
      <form className="auth-form" noValidate onSubmit={submit}>
        <AuthField
          id="login-email"
          label={copy.common.email}
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
        />
        <div className="auth-password-heading">
          <span>{copy.common.password}</span>
          <Link href="/aurinova-reference/forgot-password">
            {copy.login.forgotPassword}
          </Link>
        </div>
        <PasswordField
          id="login-password"
          label={copy.common.password}
          value={password}
          onChange={setPassword}
          error={errors.password}
        />
        <StatusNotice notice={notice} />
        <Button className="auth-submit" type="submit" disabled={pending}>
          {pending ? copy.common.submitPending : copy.login.loginAction}
        </Button>
      </form>
      <p className="auth-switch-path">
        {copy.login.noAccount}{' '}
        <Link href="/aurinova-reference/signup">{copy.login.signup}</Link>
      </p>
    </>
  );
}

function SsoPanel({ copy }: { copy: AuthContent }) {
  const [workEmail, setWorkEmail] = useState('');
  const [accountId, setAccountId] = useState('');
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState<Notice>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = workEmail.trim();
    const trimmedAccountId = accountId.trim();
    if (!trimmedEmail && !trimmedAccountId) {
      setErrors({ workEmail: copy.validation.ssoIdentifier });
      focusField('sso-email');
      return;
    }
    if (trimmedEmail && !emailPattern.test(trimmedEmail)) {
      setErrors({ workEmail: copy.validation.invalidEmail });
      focusField('sso-email');
      return;
    }
    if (trimmedAccountId && !accountIdPattern.test(trimmedAccountId)) {
      setErrors({ accountId: copy.validation.invalidAccountId });
      focusField('sso-account-id');
      return;
    }

    setPending(true);
    setErrors({});
    setNotice(null);
    try {
      const result = await authApi.resolveSso({
        ...(trimmedEmail ? { workEmail: trimmedEmail } : {}),
        ...(trimmedAccountId ? { accountId: trimmedAccountId } : {}),
        returnTo: currentReturnTo(),
      });
      if (!safeRedirect(result.redirectTo)) setSuccess(true);
    } catch (error) {
      const failure = apiFailure(error, copy);
      setErrors(failure.fieldErrors);
      setNotice({ tone: 'error', text: failure.message });
    } finally {
      setPending(false);
    }
  };

  if (success) {
    return (
      <SuccessState
        title={
          isAuthApiConfigured ? copy.sso.successTitle : copy.preview.ssoTitle
        }
        description={
          isAuthApiConfigured
            ? copy.sso.successDescription
            : copy.preview.ssoDescription
        }
        actionHref="/aurinova-reference/login"
        actionLabel={copy.signup.goToLogin}
      />
    );
  }

  return (
    <>
      <Link className="auth-back" href="/aurinova-reference/login">
        <ArrowLeft aria-hidden="true" />
        {copy.common.back}
      </Link>
      <h1>{copy.sso.title}</h1>
      <p className="auth-panel-intro">{copy.sso.description}</p>
      <form className="auth-form" noValidate onSubmit={submit}>
        <AuthField
          id="sso-email"
          label={copy.sso.workEmail}
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          placeholder={copy.sso.workEmailPlaceholder}
          value={workEmail}
          onChange={(event) => setWorkEmail(event.target.value)}
          error={errors.workEmail}
        />
        <Divider label={copy.common.or} />
        <AuthField
          id="sso-account-id"
          label={copy.sso.accountId}
          type="text"
          autoComplete="organization"
          maxLength={128}
          placeholder={copy.sso.accountIdPlaceholder}
          value={accountId}
          onChange={(event) => setAccountId(event.target.value)}
          error={errors.accountId}
        />
        <StatusNotice notice={notice} />
        <Button className="auth-submit" type="submit" disabled={pending}>
          {pending ? copy.common.submitPending : copy.common.continue}
        </Button>
      </form>
    </>
  );
}

function ResetPasswordPanel({ copy }: { copy: AuthContent }) {
  const [email, setEmail] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState<Notice>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !emailPattern.test(trimmedEmail)) {
      setError(
        trimmedEmail
          ? copy.validation.invalidEmail
          : copy.validation.requiredEmail,
      );
      focusField('reset-email');
      return;
    }

    setPending(true);
    setError('');
    setNotice(null);
    try {
      await authApi.requestPasswordReset(trimmedEmail);
      setEmail(trimmedEmail);
      setSuccess(true);
    } catch (requestError) {
      setNotice({
        tone: 'error',
        text: apiFailure(requestError, copy).message,
      });
    } finally {
      setPending(false);
    }
  };

  if (success) {
    return (
      <SuccessState
        title={
          isAuthApiConfigured
            ? copy.reset.successTitle
            : copy.preview.resetTitle
        }
        description={format(
          isAuthApiConfigured
            ? copy.reset.successDescription
            : copy.preview.resetDescription,
          { email },
        )}
        actionHref="/aurinova-reference/login/email"
        actionLabel={copy.reset.backToLogin}
      />
    );
  }

  return (
    <>
      <Link className="auth-back" href="/aurinova-reference/login/email">
        <ArrowLeft aria-hidden="true" />
        {copy.common.back}
      </Link>
      <h1>{copy.reset.title}</h1>
      <p className="auth-panel-intro">{copy.reset.description}</p>
      <form className="auth-form" noValidate onSubmit={submit}>
        <AuthField
          id="reset-email"
          label={copy.common.email}
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={error}
        />
        <StatusNotice notice={notice} />
        <Button className="auth-submit" type="submit" disabled={pending}>
          {pending ? copy.common.submitPending : copy.reset.send}
        </Button>
      </form>
    </>
  );
}

function AuthPanel({
  copy,
  screen,
}: {
  copy: AuthContent;
  screen: AuthScreen;
}) {
  if (screen === 'signup') return <SignupPanel copy={copy} />;
  if (screen === 'email-login') return <EmailLoginPanel copy={copy} />;
  if (screen === 'sso') return <SsoPanel copy={copy} />;
  if (screen === 'forgot-password') return <ResetPasswordPanel copy={copy} />;
  return <LoginPanel copy={copy} />;
}

function BrandPanel({ copy }: { copy: AuthContent }) {
  const [testimonial, setTestimonial] = useState(0);
  const item = copy.shell.testimonials[testimonial];
  const signalCells = useMemo(
    () => Array.from({ length: 80 }, (_, i) => i),
    [],
  );

  return (
    <section className="auth-brand-panel" aria-labelledby="auth-brand-title">
      <div className="auth-brand-content">
        <h2 id="auth-brand-title">{copy.shell.statement}</h2>
        <p className="auth-brand-description">{copy.shell.description}</p>
        <ul className="auth-benefits">
          {copy.shell.benefits.map((benefit) => (
            <li key={benefit.title}>
              <Link href={benefit.href}>
                <span>
                  <strong>{benefit.title}</strong> {benefit.body}
                </span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="auth-customer-lead">{copy.shell.customerLead}</p>
        <article className="auth-testimonial" aria-live="polite">
          <blockquote>“{item.quote}”</blockquote>
          <footer>
            <div>
              <strong>{item.person}</strong>
              <span>{item.company}</span>
            </div>
            <div className="auth-testimonial-controls">
              <button
                type="button"
                aria-label={copy.shell.previousTestimonial}
                disabled={testimonial === 0}
                onClick={() =>
                  setTestimonial((current) => Math.max(0, current - 1))
                }
              >
                <ArrowLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label={copy.shell.nextTestimonial}
                disabled={testimonial === copy.shell.testimonials.length - 1}
                onClick={() =>
                  setTestimonial((current) =>
                    Math.min(copy.shell.testimonials.length - 1, current + 1),
                  )
                }
              >
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </footer>
        </article>
        <nav className="auth-brand-links" aria-label="AURINOVA resources">
          <Link href="/aurinova-reference#updates">{copy.shell.blog}</Link>
          <span aria-hidden="true">•</span>
          <Link href="/aurinova-reference#updates">{copy.shell.docs}</Link>
        </nav>
      </div>
      <div className="auth-signal-grid" aria-hidden="true">
        {signalCells.map((cell) => (
          <span key={cell} style={{ '--cell': cell } as React.CSSProperties} />
        ))}
      </div>
    </section>
  );
}

export function AurinovaAuthPage({ screen }: { screen: AuthScreen }) {
  const { locale } = useI18n();
  const copy = authDictionaries[locale];
  const isLiveScreen =
    screen === 'signup' ? isSignupApiConfigured : isAuthApiConfigured;

  useEffect(() => {
    const meta = copy.meta[screen];
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', meta.description);
  }, [copy, screen]);

  return (
    <main className="auth-page">
      <a className="skip-link" href="#auth-main">
        {copy.shell.authenticationSection}
      </a>
      <header className="auth-header">
        <Link href="/aurinova-reference" aria-label={copy.shell.homeLabel}>
          <Image
            src="/aurinova-logo.svg"
            alt="AURINOVA"
            width={228}
            height={39}
            priority
          />
        </Link>
        <LanguageSwitcher labels={copy.shell} />
      </header>
      <div className="auth-layout">
        <BrandPanel copy={copy} />
        <section
          className="auth-main-panel"
          id="auth-main"
          aria-labelledby="auth-panel-heading"
        >
          <h2 className="auth-sr-only" id="auth-panel-heading">
            {copy.shell.authenticationSection}
          </h2>
          <div className="auth-panel-content">
            {!isLiveScreen && (
              <output className="auth-preview-mode">
                {copy.preview.banner}
              </output>
            )}
            <AuthPanel copy={copy} screen={screen} />
          </div>
          <Terms copy={copy} />
        </section>
      </div>
    </main>
  );
}
