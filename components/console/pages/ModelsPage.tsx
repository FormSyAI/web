import { Input } from '@/components/console/primitives';
import Image from '@/components/runtime/app-image';
import { AppLink as Link } from '@/components/runtime/app-link';
import { models } from '@/lib/console/domain';
import { ArrowRight, FlaskConical } from 'lucide-react';
import { useState } from 'react';

import {
  Badge,
  demoRoot,
  Empty,
  Field,
  number,
  type PageProps,
} from '@/components/console/content';
export function ModelsPage({ state, t }: PageProps) {
  const [search, setSearch] = useState('');
  return (
    <>
      <div className="cs-callout">
        <FlaskConical size={18} />
        {t(
          '模型兼容工具、服务状态与价格将在验证后陆续开放。',
          'Tool compatibility, service status and pricing will be published after validation.',
        )}
      </div>
      <Field label={t('搜索模型', 'Search models')}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('名称或能力', 'Name or capability')}
        />
      </Field>
      <div className="cs-plan-grid">
        {models
          .filter(
            (m) =>
              m.name.toLowerCase().includes(search.toLowerCase()) ||
              m.kind.includes(search.toLowerCase()),
          )
          .map((m) => (
            <section className="cs-card" key={m.id}>
              <div className="cs-card-heading">
                <Image
                  src={m.logo}
                  alt=""
                  width={32}
                  height={32}
                  className="model-logo"
                />
                <Badge>
                  {!m.pro || state.subscription?.plan === 'pro'
                    ? t('可用', 'Available')
                    : t('Pro 权益', 'Pro benefit')}
                </Badge>
              </div>
              <h2>{m.name}</h2>
              <a
                href={m.source}
                target="_blank"
                rel="noreferrer"
                className="cs-text-button"
              >
                {t('模型官方仓库', 'Official model repository')} ↗
              </a>
              <p className="cs-muted">
                {m.kind === 'code'
                  ? t(
                      '适用于日常代码编辑、补全与工具调用。',
                      'For everyday editing, completion and tool calls.',
                    )
                  : t(
                      '适用于复杂问题分析与多步执行。',
                      'For complex analysis and multi-step execution.',
                    )}
              </p>
              <dl className="cs-details">
                <div>
                  <dt>{t('上下文长度', 'Context length')}</dt>
                  <dd>{number(m.context)} Tokens</dd>
                </div>
                <div>
                  <dt>
                    {t(
                      '输入 / 缓存 / 输出倍率',
                      'Input / cache / output multipliers',
                    )}
                  </dt>
                  <dd>
                    {m.input} / {m.cached} / {m.output}
                  </dd>
                </div>
                <div>
                  <dt>{t('API 计量', 'API cost')}</dt>
                  <dd>
                    {t(
                      '每 10 点折算 ¥0.01，向上取分',
                      '¥0.01 per 10 credits, rounded up to cents',
                    )}
                  </dd>
                </div>
                <div>
                  <dt>{t('真实协议兼容', 'Live protocol compatibility')}</dt>
                  <dd>{t('待验证', 'Unverified')}</dd>
                </div>
              </dl>
              <Link
                className="cs-button"
                href={`${demoRoot}/integrations?model=${m.id}`}
              >
                {t('查看配置示例', 'View configuration example')}
                <ArrowRight size={15} />
              </Link>
            </section>
          ))}
      </div>
      {!models.some(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.kind.includes(search.toLowerCase()),
      ) && (
        <Empty
          title={t('没有匹配模型', 'No models found')}
          detail={t('尝试其他搜索词。', 'Try another search term.')}
        />
      )}
    </>
  );
}
