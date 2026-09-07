import { Checkbox } from '@/components/ui/checkbox';

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  MessageCircleMore,
  QrCode,
  Smartphone,
  X,
} from 'lucide-react';
import Image from '@/components/runtime/app-image';
import {
  AppLink as RuntimeLink,
  withBasePath,
} from '@/components/runtime/app-link';
import {
  type ComponentProps,
  type InputHTMLAttributes,
  type SyntheticEvent,
  useEffect,
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
  window.location.assign(withBasePath(normalized));
  return true;
}

function currentReturnTo() {
  const params = new URLSearchParams(window.location.search);
  return normalizeAuthReturnTo(
    params.get('return_to') ?? params.get('redirectURI'),
    DEFAULT_AUTH_RETURN_TO,
  );
}

function Link({ href, ...props }: ComponentProps<typeof RuntimeLink>) {
  const authPath =
    /^\/aurinova-reference\/(login(?:\/|$)|signup$|forgot-password$)/.test(
      href,
    );
  const destination =
    authPath && !href.includes('?') && typeof window !== 'undefined'
      ? `${href}?return_to=${encodeURIComponent(currentReturnTo())}`
      : href;
  return <RuntimeLink {...props} href={destination} />;
}

const termsHref = authTermsUrl;
const dataAgreementHref = authDataAgreementUrl;

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
      <Button
        variant="brand"
        className="auth-password-toggle"
        type="button"
        aria-label={
          visible ? copy.common.hidePassword : copy.common.showPassword
        }
        title={visible ? copy.common.hidePassword : copy.common.showPassword}
        onClick={() => setVisible((current) => !current)}
      >
        {visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
      </Button>
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
      <Checkbox
        className="ui-auth-checkbox"
        id="signup-terms"
        checked={checked}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'signup-terms-error' : undefined}
        onCheckedChange={onChange}
      />
      <label htmlFor="signup-terms">
        {copy.signup.acceptTerms}{' '}
        <a
          href={termsHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`${copy.common.terms} (${copy.common.opensInNewTab})`}
        >
          {copy.common.terms}
        </a>{' '}
        {copy.common.termsJoin}{' '}
        <a
          href={dataAgreementHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`${copy.common.dataAgreement} (${copy.common.opensInNewTab})`}
        >
          {copy.common.dataAgreement}
        </a>
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
  const completed = Object.values(checks).filter(Boolean).length;
  return (
    <>
      <p className="auth-sr-only" aria-live="polite" aria-atomic="true">
        {format(copy.signup.passwordProgress, {
          completed: String(completed),
          total: String(Object.keys(checks).length),
        })}
      </p>
      <ul className="auth-password-checks">
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
    </>
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

function PhoneAccessPanel({
  copy,
  intent,
  onEmail,
}: {
  copy: AuthContent;
  intent: 'login' | 'signup';
  onEmail?: () => void;
}) {
  const { locale } = useI18n();
  const zh = locale === 'zh-CN';
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [pending, setPending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState<Notice>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = window.setInterval(
      () => setCountdown((current) => Math.max(0, current - 1)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [countdown]);

  const normalizedPhone = phone.replace(/[\s-]/g, '');
  const phoneValid = /^1\d{10}$/.test(normalizedPhone);

  const sendCode = async () => {
    if (!phoneValid) {
      setError(
        zh ? '请输入有效的 11 位手机号。' : 'Enter a valid phone number.',
      );
      focusField('phone-number');
      return;
    }
    setPending(true);
    setError('');
    setNotice(null);
    try {
      await authApi.requestPhoneCode(`+86${normalizedPhone}`, intent);
      setCountdown(60);
      setNotice({
        tone: 'success',
        text: zh
          ? '验证码已发送，请输入 4–6 位数字继续。'
          : 'Verification code sent. Enter 4–6 digits to continue.',
      });
      focusField('phone-code');
    } catch (requestError) {
      setNotice({
        tone: 'error',
        text: apiFailure(requestError, copy).message,
      });
    } finally {
      setPending(false);
    }
  };

  const submit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!phoneValid) {
      setError(
        zh ? '请输入有效的 11 位手机号。' : 'Enter a valid phone number.',
      );
      focusField('phone-number');
      return;
    }
    if (!/^\d{4,6}$/.test(code)) {
      setError(zh ? '请输入 4–6 位验证码。' : 'Enter the 4–6 digit code.');
      focusField('phone-code');
      return;
    }
    setPending(true);
    setError('');
    setNotice(null);
    try {
      const result = await authApi.verifyPhone({
        phone: `+86${normalizedPhone}`,
        code,
        intent,
        returnTo: currentReturnTo(),
      });
      if (!safeRedirect(result.redirectTo)) setSuccess(true);
    } catch (requestError) {
      setNotice({
        tone: 'error',
        text: apiFailure(requestError, copy).message,
      });
    } finally {
      setPending(false);
    }
  };

  const refreshWechat = async () => {
    setPending(true);
    setNotice(null);
    try {
      await authApi.createWechatSession(intent, currentReturnTo());
      setNotice({
        tone: 'info',
        text: zh
          ? '微信扫码会话已刷新。'
          : 'The WeChat QR session was refreshed.',
      });
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
        title={zh ? '验证完成' : 'Verification complete'}
        description={
          zh
            ? `已完成 +86 ${normalizedPhone} 的${intent === 'signup' ? '注册' : '登录'}验证。`
            : `The ${intent} verification for +86 ${normalizedPhone} is complete.`
        }
        actionHref="/demo/console/usage"
        actionLabel={zh ? '进入控制台' : 'Open console'}
      />
    );
  }

  return (
    <>
      <h1>{intent === 'signup' ? copy.signup.title : copy.login.title}</h1>
      <div className="auth-access-grid">
        <form className="auth-phone-form" noValidate onSubmit={submit}>
          <div className="auth-phone-input">
            <span aria-hidden="true">+86</span>
            <label className="auth-sr-only" htmlFor="phone-number">
              {zh ? '手机号' : 'Phone number'}
            </label>
            <Input
              id="phone-number"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              maxLength={13}
              placeholder={zh ? '请输入手机号' : 'Phone number'}
              value={phone}
              aria-invalid={Boolean(error && !phoneValid)}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div className="auth-code-input">
            <label className="auth-sr-only" htmlFor="phone-code">
              {zh ? '验证码' : 'Verification code'}
            </label>
            <Input
              id="phone-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder={zh ? '请输入验证码' : 'Verification code'}
              value={code}
              onChange={(event) =>
                setCode(event.target.value.replace(/\D/g, ''))
              }
            />
            <Button
              variant="ghost"
              type="button"
              disabled={pending || countdown > 0}
              onClick={sendCode}
            >
              {countdown > 0
                ? `${countdown}s`
                : zh
                  ? '发送验证码'
                  : 'Send code'}
            </Button>
          </div>
          {error && <p className="auth-field-error">{error}</p>}
          <StatusNotice notice={notice} />
          <Button className="auth-submit" type="submit" disabled={pending}>
            <Smartphone aria-hidden="true" />
            {pending
              ? copy.common.submitPending
              : intent === 'signup'
                ? zh
                  ? '注册并登录'
                  : 'Sign up and log in'
                : zh
                  ? '登录'
                  : 'Log in'}
          </Button>
          <div className="auth-secondary-options">
            {onEmail ? (
              <Button variant="ghost" type="button" onClick={onEmail}>
                {zh ? '邮箱注册' : 'Sign up with email'}
              </Button>
            ) : (
              <Link href="/aurinova-reference/login/email">
                {zh ? '密码登录' : 'Password login'}
              </Link>
            )}
            <Link href="/aurinova-reference/login/sso">
              {copy.login.ssoLogin}
            </Link>
          </div>
        </form>
        <section
          className="auth-wechat-panel"
          aria-label={zh ? '微信登录' : 'WeChat login'}
        >
          <Button
            className="auth-qr-button"
            variant="ghost"
            type="button"
            disabled={pending}
            onClick={refreshWechat}
            aria-label={
              zh ? '刷新微信登录二维码' : 'Refresh WeChat login QR code'
            }
          >
            <QrCode aria-hidden="true" />
          </Button>
          <p>
            <MessageCircleMore aria-hidden="true" />
            {zh ? '微信扫码登录' : 'Scan with WeChat'}
          </p>
          <small>
            {zh ? '点击二维码刷新会话' : 'Select the code to refresh'}
          </small>
        </section>
      </div>
      <p className="auth-switch-path">
        {intent === 'signup'
          ? copy.signup.existingAccount
          : copy.login.noAccount}{' '}
        <Link
          href={
            intent === 'signup'
              ? '/aurinova-reference/login'
              : '/aurinova-reference/signup'
          }
        >
          {intent === 'signup' ? copy.signup.login : copy.login.signup}
        </Link>
      </p>
      {intent === 'login' && (
        <p className="auth-console-entry">
          <Link href="/demo/console/usage">
            {zh ? '进入控制台' : 'Open console'}
            <ArrowRight aria-hidden="true" />
          </Link>
        </p>
      )}
    </>
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
  const [entryMode, setEntryMode] = useState<'phone' | 'email'>('phone');
  const passwordChecks = getPasswordChecks(password, confirmPassword);
  const passwordReady = Object.values(passwordChecks).every(Boolean);

  if (entryMode === 'phone') {
    return (
      <PhoneAccessPanel
        copy={copy}
        intent="signup"
        onEmail={() => setEntryMode('email')}
      />
    );
  }

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
        <Button
          variant="brand"
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
        </Button>
        <h1>{copy.signup.detailsTitle}</h1>
        <p className="auth-panel-intro">{copy.signup.detailsDescription}</p>
        <p className="auth-selected-email">
          {email}
          <Button
            variant="brand"
            type="button"
            onClick={() => setStep('email')}
          >
            {copy.signup.changeEmail}
          </Button>
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
      <Button
        className="auth-back"
        variant="ghost"
        type="button"
        onClick={() => setEntryMode('phone')}
      >
        <ArrowLeft aria-hidden="true" />
        {copy.common.back}
      </Button>
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
      <p className="auth-switch-path">
        {copy.signup.existingAccount}{' '}
        <Link href="/aurinova-reference/login">{copy.signup.login}</Link>
      </p>
    </>
  );
}

function LoginPanel({ copy }: { copy: AuthContent }) {
  return <PhoneAccessPanel copy={copy} intent="login" />;
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
  const hasWorkEmail = Boolean(workEmail.trim());
  const hasAccountId = Boolean(accountId.trim());

  const updateWorkEmail = (value: string) => {
    setWorkEmail(value);
    if (value.trim()) {
      setAccountId('');
      setErrors((current) => ({ ...current, accountId: '' }));
    }
  };

  const updateAccountId = (value: string) => {
    setAccountId(value);
    if (value.trim()) {
      setWorkEmail('');
      setErrors((current) => ({ ...current, workEmail: '' }));
    }
  };

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
          onChange={(event) => updateWorkEmail(event.target.value)}
          error={errors.workEmail}
          hint={
            hasAccountId ? copy.sso.accountIdSelected : copy.sso.exclusiveHint
          }
          disabled={hasAccountId}
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
          onChange={(event) => updateAccountId(event.target.value)}
          error={errors.accountId}
          hint={
            hasWorkEmail ? copy.sso.workEmailSelected : copy.sso.exclusiveHint
          }
          disabled={hasWorkEmail}
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
              <Button
                variant="brand"
                type="button"
                aria-label={copy.shell.previousTestimonial}
                disabled={testimonial === 0}
                onClick={() =>
                  setTestimonial((current) => Math.max(0, current - 1))
                }
              >
                <ArrowLeft aria-hidden="true" />
              </Button>
              <Button
                variant="brand"
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
              </Button>
            </div>
          </footer>
        </article>
        <nav
          className="auth-brand-links"
          aria-label={copy.shell.resourcesLabel}
        >
          <Link href="/aurinova-reference#updates">{copy.shell.blog}</Link>
          <span aria-hidden="true">•</span>
          <Link href="/aurinova-reference/docs">{copy.shell.docs}</Link>
        </nav>
      </div>
      <svg
        className="auth-signal-grid"
        viewBox="0 0 600 600"
        aria-hidden="true"
        focusable="false"
        shapeRendering="crispEdges"
      >
        {Array.from({ length: 100 }, (_, index) => {
          const col = index % 10;
          const row = Math.floor(index / 10);
          const depth = row + col - 9;
          if (depth < 0) return null;
          return (
            <rect
              key={index}
              x={col * 60}
              y={row * 60}
              width={60}
              height={60}
              fill="currentColor"
              opacity={0.035 + 0.865 * (depth / 9) ** 1.65}
            />
          );
        })}
      </svg>
    </section>
  );
}

export function AurinovaAuthPage({ screen }: { screen: AuthScreen }) {
  const { locale } = useI18n();
  const copy = authDictionaries[locale];
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
          <div
            className={`auth-panel-content${
              screen === 'login' || screen === 'signup' ? ' is-access' : ''
            }`}
          >
            <AuthPanel copy={copy} screen={screen} />
          </div>
          <Terms copy={copy} />
        </section>
      </div>
    </main>
  );
}
