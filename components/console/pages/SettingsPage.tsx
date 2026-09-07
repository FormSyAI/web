import {
  Button,
  Checkbox,
  Input,
  Select,
} from '@/components/console/primitives';
import { AppLink as Link } from '@/components/runtime/app-link';
import { resetDemo } from '@/lib/console/demo-store';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
  date,
  demoRoot,
  Field,
  type PageProps,
} from '@/components/console/content';
export function SettingsPage({ state, t, act, setModal }: PageProps) {
  const navigate = useNavigate();
  const [name, setName] = useState(state.profile.name),
    [timezone, setTimezone] = useState(state.profile.timezone),
    [notifications, setNotifications] = useState(state.profile.notifications);
  return (
    <>
      <section className="cs-card">
        <h2>{t('演示工作空间', 'Demo workspace')}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            act({ type: 'profile', name, timezone, notifications });
          }}
        >
          <Field label={t('显示名称', 'Display name')}>
            <Input
              value={name}
              maxLength={48}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Field>
          <Field label={t('显示时区', 'Display timezone')}>
            <Select
              value={timezone}
              onValueChange={(value) => setTimezone(value)}
            >
              {[
                'Asia/Shanghai',
                'UTC',
                'America/Los_Angeles',
                'Europe/London',
              ].map((z) => (
                <option key={z}>{z}</option>
              ))}
            </Select>
          </Field>
          <label className="cs-checkbox">
            <Checkbox
              className="cs-checkbox-control"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
            {t(
              '模拟额度提醒偏好（不会发送消息）',
              'Demo quota reminder preference (no messages sent)',
            )}
          </label>
          <Button className="cs-button primary" type="submit">
            {t('保存偏好', 'Save preferences')}
          </Button>
        </form>
      </section>
      <section className="cs-card">
        <h2>{t('账号与安全', 'Account & security')}</h2>
        <p className="cs-muted">
          {t(
            '当前是独立演示空间，没有真实账号、登录凭据或设备会话。正式登录、邮箱验证、第三方身份与 SSO 使用现有认证入口。',
            'This is an isolated demo workspace with no real account, credentials or sessions. Existing authentication handles production login, email verification, external identities and SSO.',
          )}
        </p>
        <Link
          className="cs-button"
          href="/aurinova-reference/login?return_to=%2Fconsole%2Fusage"
        >
          {t('前往登录', 'Go to login')}
          <ExternalLink size={15} />
        </Link>
      </section>
      <section className="cs-card">
        <h2>{t('演示数据', 'Demo data')}</h2>
        <p className="cs-muted">
          {t(
            '数据仅保存在此浏览器。可切换为空白新用户，或恢复示例用量。',
            'Data stays in this browser. Start with a blank workspace or restore sample usage.',
          )}
        </p>
        <div className="cs-inline-actions">
          {[true, false].map((blank) => (
            <Button
              className="cs-button"
              key={String(blank)}
              onClick={() =>
                setModal({
                  kind: 'confirm',
                  title: blank
                    ? t('切换为空白工作空间', 'Start with a blank workspace')
                    : t('恢复示例数据', 'Restore sample data'),
                  body: t(
                    '将替换此浏览器中的演示订单、Key 和用量，不影响真实账号。',
                    'This replaces local demo orders, keys and usage. Real accounts are unaffected.',
                  ),
                  run: () => {
                    resetDemo(blank);
                    setModal(null);
                    void navigate(`${demoRoot}/usage`);
                  },
                })
              }
            >
              {blank
                ? t('体验新用户流程', 'Try the new-user flow')
                : t('恢复示例数据', 'Restore sample data')}
            </Button>
          ))}
        </div>
      </section>
      <section className="cs-card">
        <h2>{t('最近演示操作', 'Recent demo actions')}</h2>
        {state.events.slice(0, 6).map((e, i) => (
          <div className="cs-audit-row" key={i}>
            <span>{e.action}</span>
            <time>{date(e.time, state.profile.timezone)}</time>
          </div>
        ))}
      </section>
    </>
  );
}
