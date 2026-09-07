import { useEffect } from 'react';
import { Cpu, ArrowRight } from 'lucide-react';
import { useI18n } from '@/components/i18n/i18n-provider';
import { AurinovaReferenceHeader } from '@/components/site/aurinova-reference-header';
import { AurinovaReferenceFooter } from '@/components/site/aurinova-reference-footer';
import { AppLink as Link } from '@/components/runtime/app-link';
import '@/components/site/coding-plan-offerings.css';
export default function ModelsPage() {
  const { locale } = useI18n();
  const t = (zh: string, en: string) => (locale === 'zh-CN' ? zh : en);
  useEffect(() => {
    document.title =
      locale === 'zh-CN' ? '模型库 | AURINOVA' : 'Models | AURINOVA';
  }, [locale]);
  return (
    <main className="pr-page">
      <AurinovaReferenceHeader />
      <section className="pr-hero pr-shell">
        <p>FORMSY / MODELS</p>
        <h1>
          {t('围绕任务，选择合适的模型', 'Choose models around your tasks')}
        </h1>
        <p>
          {t(
            '模型清单、协议兼容与正式价格将在验证后发布。当前可查看模型管理演示，了解权益、计量和接入方式。',
            'The model catalog, protocol compatibility and pricing will be published after validation. Explore the demo to understand access, metering and integration.',
          )}
        </p>
        <div className="cp-hero-actions">
          <Link
            className="pr-button pr-button-solid"
            href="/demo/console/models"
          >
            {t('查看模型管理演示', 'Explore model management')}
            <ArrowRight size={17} />
          </Link>
          <Link
            className="pr-button pr-button-outline"
            href="/aurinova-reference#models-deployment"
          >
            {t('查看部署选择', 'Deployment options')}
          </Link>
        </div>
      </section>
      <section className="cp-offerings pr-shell">
        <div className="cp-cards">
          {[
            t('代码与工具调用', 'Coding & tool calls'),
            t('推理与复杂任务', 'Reasoning & complex tasks'),
            t('企业自带模型', 'Enterprise models'),
          ].map((title, i) => (
            <article key={title}>
              <Cpu size={27} />
              <h3>{title}</h3>
              <p>
                {
                  [
                    t(
                      '关注代码生成、编辑与多轮工具执行的完整体验。',
                      'Evaluate generation, editing and multi-turn tool execution.',
                    ),
                    t(
                      '结合任务难度评估质量、时延与资源开销。',
                      'Evaluate quality, latency and cost against task complexity.',
                    ),
                    t(
                      '将已有模型纳入企业任务与验证流程。',
                      'Bring existing models into enterprise task and verification workflows.',
                    ),
                  ][i]
                }
              </p>
              <strong className="cp-availability">
                {t('服务验证中', 'Service validation pending')}
              </strong>
              <Link
                href={
                  i === 2
                    ? '/aurinova-reference#deployment-byom'
                    : '/demo/console/models'
                }
              >
                {t('了解更多', 'Learn more')}
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <AurinovaReferenceFooter />
    </main>
  );
}
