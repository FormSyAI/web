import type { Locale } from '@/content/i18n';

const stages = [
  {
    code: '01',
    zh: '工程轨迹',
    en: 'Engineering trace',
    detail: 'TASK · CONTEXT',
  },
  {
    code: '02',
    zh: '决策与行动',
    en: 'Decision & action',
    detail: 'DECISION · ACTION',
  },
  {
    code: '03',
    zh: '证据与结果',
    en: 'Evidence & outcome',
    detail: 'EVIDENCE · OUTCOME',
  },
  {
    code: '04',
    zh: '归因与知识',
    en: 'Attribution & knowledge',
    detail: 'EFFECT · KNOWLEDGE',
  },
] as const;

const maturity = [
  {
    zh: '过程关联',
    en: 'Process association',
    detail: 'RECORDED',
  },
  {
    zh: '归因候选',
    en: 'Attribution candidate',
    detail: 'HYPOTHESIS',
  },
  {
    zh: '对照支持',
    en: 'Controlled support',
    detail: 'COMPARED',
  },
] as const;

export function CausalEvidenceArt({ locale }: { locale: Locale }) {
  const isZh = locale === 'zh-CN';

  return (
    <figure className="fw-causal-art">
      <header>
        <span>FORMSY</span>
        <small>ATTRIBUTABLE EVIDENCE SYSTEM</small>
      </header>
      <ol className="fw-causal-flow">
        {stages.map((stage) => (
          <li key={stage.code}>
            <small>{stage.code}</small>
            <strong>{isZh ? stage.zh : stage.en}</strong>
            <span>{stage.detail}</span>
          </li>
        ))}
      </ol>
      <div className="fw-causal-maturity">
        <p>{isZh ? '证据成熟度' : 'Evidence maturity'}</p>
        <ol>
          {maturity.map((level, index) => (
            <li key={level.detail}>
              <span>{index + 1}</span>
              <strong>{isZh ? level.zh : level.en}</strong>
              <small>{level.detail}</small>
            </li>
          ))}
        </ol>
      </div>
      <figcaption>
        <span>
          {isZh
            ? '连接过程、判断与结果，不把相关性自动当作因果。'
            : 'Connect process, judgment, and outcomes without treating correlation as causation.'}
        </span>
        <small>{isZh ? '概念示意' : 'Concept illustration'}</small>
      </figcaption>
    </figure>
  );
}
