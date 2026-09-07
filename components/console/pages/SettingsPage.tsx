import {
  Button,
  Checkbox,
  Input,
  Select,
} from '@/components/console/primitives';
import { useI18n } from '@/components/i18n/i18n-provider';
import { AppLink as Link } from '@/components/runtime/app-link';
import {
  LogOut,
  MessageCircleMore,
  ShieldCheck,
  Smartphone,
  UserRound,
} from 'lucide-react';
import { useState } from 'react';

import { Field, type PageProps } from '@/components/console/content';

export function SettingsPage({ state, t, act, setModal, notice }: PageProps) {
  const { locale, toggleLocale } = useI18n();
  const [name, setName] = useState(state.profile.name);
  const [timezone, setTimezone] = useState(state.profile.timezone);
  const [notifications, setNotifications] = useState(
    state.profile.notifications,
  );

  const bindingNotice = (kind: string) =>
    notice(
      t(
        `${kind}绑定流程将在身份服务接入后开放。`,
        `${kind} binding will be available with the identity service.`,
      ),
    );

  return (
    <section className="cs-account-page" aria-labelledby="account-title">
      <header className="cs-account-heading">
        <h2 id="account-title">{t('个人信息', 'Personal information')}</h2>
        <span className="cs-account-avatar" aria-hidden="true">
          <UserRound />
        </span>
      </header>

      <form
        className="cs-account-form"
        onSubmit={(event) => {
          event.preventDefault();
          act({ type: 'profile', name, timezone, notifications });
        }}
      >
        <Field label={t('用户名', 'Display name')}>
          <Input
            value={name}
            maxLength={48}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </Field>

        <div className="cs-account-row">
          <div>
            <span>{t('邮箱', 'Email')}</span>
            <strong>{t('未绑定', 'Not connected')}</strong>
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={() => bindingNotice(t('邮箱', 'Email'))}
          >
            {t('绑定', 'Connect')}
          </Button>
        </div>

        <div className="cs-account-row">
          <div>
            <span>{t('微信', 'WeChat')}</span>
            <strong>
              <MessageCircleMore aria-hidden="true" />
              {t('未绑定', 'Not connected')}
            </strong>
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={() => bindingNotice(t('微信', 'WeChat'))}
          >
            {t('绑定', 'Connect')}
          </Button>
        </div>

        <div className="cs-account-row">
          <div>
            <span>{t('手机号码', 'Phone number')}</span>
            <strong>
              <Smartphone aria-hidden="true" />
              {t('未绑定', 'Not connected')}
            </strong>
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={() => bindingNotice(t('手机号码', 'Phone number'))}
          >
            {t('绑定', 'Connect')}
          </Button>
        </div>

        <div className="cs-account-row">
          <div>
            <span>{t('实名认证', 'Identity verification')}</span>
            <strong>
              <ShieldCheck aria-hidden="true" />
              {t('未认证', 'Not verified')}
            </strong>
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={() =>
              notice(
                t(
                  '实名认证将在账户服务接入后开放。',
                  'Identity verification will be available with the account service.',
                ),
              )
            }
          >
            {t('查看详情', 'View details')}
          </Button>
        </div>

        <Field label={t('语言', 'Language')}>
          <Select
            value={locale}
            onValueChange={(value) => {
              if (value !== locale) toggleLocale();
            }}
          >
            <option value="zh-CN">简体中文</option>
            <option value="en">English</option>
          </Select>
        </Field>

        <Field label={t('时区', 'Timezone')}>
          <Select value={timezone} onValueChange={setTimezone}>
            {[
              'Asia/Shanghai',
              'UTC',
              'America/Los_Angeles',
              'Europe/London',
            ].map((zone) => (
              <option key={zone}>{zone}</option>
            ))}
          </Select>
        </Field>

        <label className="cs-checkbox cs-account-notifications">
          <Checkbox
            className="cs-checkbox-control"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
          {t('接收额度与账户提醒', 'Receive quota and account alerts')}
        </label>

        <Button className="cs-button primary cs-account-save" type="submit">
          {t('保存设置', 'Save settings')}
        </Button>
      </form>

      <div className="cs-account-actions">
        <Link className="cs-button" href="/aurinova-reference/login">
          <LogOut size={16} />
          {t('退出登录', 'Log out')}
        </Link>
        <Button
          className="cs-button danger"
          type="button"
          onClick={() =>
            setModal({
              kind: 'confirm',
              title: t('注销账户', 'Close account'),
              body: t(
                '账户注销需要完成身份验证，并确认数据与账单处理状态。',
                'Account closure requires identity verification and confirmation of data and billing status.',
              ),
              run: () => {
                setModal(null);
                notice(t('注销申请已记录。', 'Closure request recorded.'));
              },
            })
          }
        >
          {t('注销账户', 'Close account')}
        </Button>
      </div>
    </section>
  );
}
