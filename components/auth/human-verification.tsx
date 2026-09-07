import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

import { useEffect, useRef, useState } from 'react';

import type { AuthContent } from '@/content/auth.i18n';
import type { Locale } from '@/content/i18n';
import { isSignupApiConfigured, turnstileSiteKey } from '@/lib/auth/api';

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      theme: 'light';
      language: string;
      callback: (token: string) => void;
      'error-callback': () => void;
      'expired-callback': () => void;
    },
  ) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const scriptId = 'aurinova-turnstile-script';
const scriptSource =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let scriptPromise: Promise<TurnstileApi> | null = null;

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<TurnstileApi>((resolve, reject) => {
    const finish = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error('Turnstile did not initialize.'));
    };
    const existing = document.getElementById(
      scriptId,
    ) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', finish, { once: true });
      existing.addEventListener(
        'error',
        () => {
          existing.remove();
          reject(new Error('Turnstile failed to load.'));
        },
        { once: true },
      );
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = scriptSource;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', finish, { once: true });
    script.addEventListener(
      'error',
      () => {
        script.remove();
        reject(new Error('Turnstile failed to load.'));
      },
      { once: true },
    );
    document.head.appendChild(script);
  });
  const pending = scriptPromise;
  return pending.catch((error: unknown) => {
    if (scriptPromise === pending) scriptPromise = null;
    throw error;
  });
}

export function HumanVerification({
  copy,
  error,
  locale,
  onTokenChange,
  token,
}: {
  copy: AuthContent;
  error?: string;
  locale: Locale;
  onTokenChange: (token: string) => void;
  token: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!isSignupApiConfigured || !turnstileSiteKey || !containerRef.current) {
      return;
    }

    let active = true;
    let widgetId = '';
    const container = containerRef.current;
    setLoadFailed(false);
    onTokenChange('');

    void loadTurnstile()
      .then((turnstile) => {
        if (!active) return;
        widgetId = turnstile.render(container, {
          sitekey: turnstileSiteKey,
          theme: 'light',
          language: locale === 'zh-CN' ? 'zh-CN' : 'en',
          callback: (nextToken) => {
            if (active) onTokenChange(nextToken);
          },
          'error-callback': () => {
            if (active) {
              onTokenChange('');
              setLoadFailed(true);
            }
          },
          'expired-callback': () => {
            if (active) onTokenChange('');
          },
        });
      })
      .catch(() => {
        if (active) {
          onTokenChange('');
          setLoadFailed(true);
        }
      });

    return () => {
      active = false;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
      container.replaceChildren();
    };
  }, [locale, onTokenChange, retryKey]);

  if (!isSignupApiConfigured) {
    return (
      <label
        className="auth-human-verification"
        htmlFor="signup-human-verification"
        aria-label={copy.signup.humanVerification}
      >
        <Checkbox
          className="ui-auth-checkbox"
          id="signup-human-verification"
          checked={Boolean(token)}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? 'signup-human-verification-error'
              : 'signup-human-verification-help'
          }
          onCheckedChange={(checked) =>
            onTokenChange(checked ? 'preview-human-verification' : '')
          }
        />
        <span>
          <strong>{copy.signup.humanVerification}</strong>
          <small id="signup-human-verification-help">
            {copy.preview.verificationHelp}
          </small>
        </span>
      </label>
    );
  }

  if (!turnstileSiteKey) {
    return (
      <div
        className="auth-verification-unavailable"
        id="signup-human-verification"
        role="alert"
        tabIndex={-1}
      >
        {copy.preview.verificationUnavailable}
      </div>
    );
  }

  return (
    <div
      className="auth-turnstile"
      id="signup-human-verification"
      aria-busy={!token && !loadFailed}
      aria-invalid={Boolean(error || loadFailed)}
      tabIndex={-1}
    >
      <div ref={containerRef} />
      {loadFailed && (
        <div className="auth-verification-recovery" role="alert">
          <p className="auth-field-error">
            {copy.preview.verificationLoadError}
          </p>
          <Button
            variant="brand"
            type="button"
            onClick={() => {
              scriptPromise = null;
              document.getElementById(scriptId)?.remove();
              setLoadFailed(false);
              setRetryKey((current) => current + 1);
            }}
          >
            {copy.common.retry}
          </Button>
        </div>
      )}
    </div>
  );
}
