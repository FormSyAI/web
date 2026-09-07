import { Button } from '@/components/console/primitives';
import { KeyRound, Plus } from 'lucide-react';

import {
  Badge,
  date,
  Empty,
  modelName,
  money,
  sourceName,
  type PageProps,
} from '@/components/console/content';
export function KeysPage({ state, t, act, setModal }: PageProps) {
  return (
    <>
      <div className="cs-callout">
        <KeyRound size={18} />
        {t(
          '每个 Key 固定使用套餐或 API 余额，并可限制模型权限与预算。',
          'Each key uses a fixed billing source and can restrict model access and budgets.',
        )}
      </div>
      <div className="cs-section-actions">
        <span>
          {state.keys.filter((k) => k.status !== 'revoked').length} / 10{' '}
          {t('个可用 Key', 'non-revoked keys')}
        </span>
        <Button
          className="cs-button primary"
          onClick={() => setModal({ kind: 'key' })}
        >
          <Plus size={16} />
          {t('创建 API Key', 'Create API key')}
        </Button>
      </div>
      <section className="cs-card cs-table-card">
        <div className="cs-table-scroll">
          <table>
            <thead>
              <tr>
                {[
                  t('名称', 'Name'),
                  t('计费来源', 'Billing source'),
                  t('状态', 'Status'),
                  t('最近使用 / 到期', 'Last used / expiry'),
                  t('操作', 'Actions'),
                ].map((v) => (
                  <th key={v}>{v}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.keys.map((k) => (
                <tr key={k.id}>
                  <td>
                    <strong>{k.name}</strong>
                    <small>sk-••••{k.tail}</small>
                  </td>
                  <td>
                    {sourceName(k.funding, t)}
                    {k.budget != null && (
                      <small>
                        {t('预算', 'Budget')}:{' '}
                        {k.funding === 'plan'
                          ? `${k.budgetUsed ?? 0} / ${k.budget}`
                          : `${money(k.budgetUsed ?? 0)} / ${money(k.budget)}`}
                      </small>
                    )}
                    <small>
                      {k.models.map((id) => modelName(id)).join(', ')}
                    </small>
                  </td>
                  <td>
                    <Badge
                      tone={
                        k.status === 'active'
                          ? 'success'
                          : k.status === 'revoked'
                            ? 'danger'
                            : ''
                      }
                    >
                      {k.status === 'active'
                        ? t('可用', 'Active')
                        : k.status === 'paused'
                          ? t('已停用', 'Paused')
                          : t('已撤销', 'Revoked')}
                    </Badge>
                  </td>
                  <td>
                    {date(k.lastUsed, state.profile.timezone)}
                    <small>{date(k.expiresAt, state.profile.timezone)}</small>
                  </td>
                  <td aria-label={t('Key 操作', 'Key actions')}>
                    <div className="cs-inline-actions">
                      <Button
                        className="cs-text-button"
                        disabled={k.status === 'revoked'}
                        onClick={() =>
                          act({
                            type: 'key-status',
                            id: k.id,
                            status: k.status === 'active' ? 'paused' : 'active',
                          })
                        }
                      >
                        {k.status === 'active'
                          ? t('停用', 'Pause')
                          : t('恢复', 'Resume')}
                      </Button>
                      <Button
                        className="cs-text-button danger"
                        disabled={k.status === 'revoked'}
                        onClick={() =>
                          setModal({
                            kind: 'confirm',
                            title: t('撤销 API Key', 'Revoke API key'),
                            body: t(
                              `撤销「${k.name}」后，该标识将立即失效，已有记录仍会保留。`,
                              `Revoking “${k.name}” disables it immediately. Existing usage records remain.`,
                            ),
                            run: () => {
                              act({
                                type: 'key-status',
                                id: k.id,
                                status: 'revoked',
                              });
                              setModal(null);
                            },
                          })
                        }
                      >
                        {t('撤销', 'Revoke')}
                      </Button>
                      <Button
                        className="cs-text-button"
                        disabled={k.status === 'revoked'}
                        onClick={() =>
                          setModal({
                            kind: 'confirm',
                            title: t('轮换 API Key', 'Rotate API key'),
                            body: t(
                              '生成新标识并撤销旧标识；保留模型权限、到期时间和已用子预算。',
                              'Creates a replacement and revokes the old key, preserving models, expiry and budget usage.',
                            ),
                            run: () => {
                              const next = act({ type: 'rotate', id: k.id });
                              if (next)
                                setModal({
                                  kind: 'secret',
                                  secret: `sk-formsy-${next.keys[0].tail}`,
                                });
                            },
                          })
                        }
                      >
                        {t('轮换', 'Rotate')}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!state.keys.length && (
          <Empty
            title={t('还没有 API Key', 'No API keys yet')}
            detail={t(
              '先选择服务，再创建对应计费类型的 Key。',
              'Choose a service, then create a key for that billing source.',
            )}
          />
        )}
      </section>
    </>
  );
}
