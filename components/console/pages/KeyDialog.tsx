import {
  Button,
  Checkbox,
  Input,
  Select,
} from '@/components/console/primitives';
import { models, type Funding } from '@/lib/console/domain';
import { useState, type SyntheticEvent } from 'react';

import { Field, type PageProps } from '@/components/console/content';
export function KeyDialog({ t, act, setModal }: PageProps) {
  const [name, setName] = useState(''),
    [funding, setFunding] = useState<Funding>('plan'),
    [allowed, setAllowed] = useState([models[0].id]),
    [days, setDays] = useState(30);
  const [budget, setBudget] = useState('');
  const submit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = act({
      type: 'key',
      name,
      funding,
      models: allowed,
      days,
      budget:
        budget === ''
          ? null
          : Math.round(Number(budget) * (funding === 'api' ? 100 : 1)),
    });
    if (next)
      setModal({
        kind: 'secret',
        secret: `sk-formsy-${next.keys[0].tail}`,
      });
  };
  return (
    <form onSubmit={submit}>
      <p className="cs-muted">
        {t(
          '标识仅在此处显示，无法用于任何真实服务。',
          'This identifier is shown here once and cannot access any real service.',
        )}
      </p>
      <Field label={t('名称', 'Name')}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={48}
          required
          placeholder={t('例如：我的编程工具', 'e.g. My coding tool')}
        />
      </Field>
      <Field label={t('计费来源', 'Billing source')}>
        <Select
          value={funding}
          onValueChange={(value) => setFunding(value as Funding)}
        >
          <option value="plan">Coding Plan</option>
          <option value="api">{t('API 余额', 'API balance')}</option>
        </Select>
      </Field>
      <p className="cs-callout">
        {funding === 'plan'
          ? t(
              '只扣套餐点数，额度不足即停止。',
              'Uses plan credits only; stops at quota.',
            )
          : t(
              '按量扣 API 余额，即使已有套餐也单独结算。',
              'Uses API balance, even if you also have a plan.',
            )}
      </p>
      <fieldset>
        <legend>{t('允许的模型', 'Allowed models')}</legend>
        {models.map((m) => (
          <label className="cs-checkbox" key={m.id}>
            <Checkbox
              className="cs-checkbox-control"
              checked={allowed.includes(m.id)}
              onCheckedChange={(checked) =>
                setAllowed(
                  checked
                    ? [...allowed, m.id]
                    : allowed.filter((id) => id !== m.id),
                )
              }
            />
            {m.name}
          </label>
        ))}
      </fieldset>
      <Field
        label={
          funding === 'plan'
            ? t('子预算（点数，可留空）', 'Credit budget (optional)')
            : t('子预算（CNY，可留空）', 'Budget in CNY (optional)')
        }
      >
        <Input
          type="number"
          min="1"
          step="1"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder={t(
            '仍受工作空间总额度限制',
            'Workspace limits still apply',
          )}
        />
      </Field>
      <Field label={t('有效期', 'Expiry')}>
        <Select value={days} onValueChange={(value) => setDays(Number(value))}>
          {[7, 30, 90].map((d) => (
            <option key={d} value={d}>
              {d} {t('天', 'days')}
            </option>
          ))}
        </Select>
      </Field>
      <Button className="cs-button primary" type="submit">
        {t('创建 API Key', 'Create API key')}
      </Button>
    </form>
  );
}
