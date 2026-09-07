import { modelCatalog } from '@/content/model-catalog';
import Image from '@/components/runtime/app-image';
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
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
            '选择 GLM、Kimi、Qwen、DeepSeek、MiniMax 与 Nemotron 等开放模型。当前提供接入演示，正式服务与价格将在验证后开放。',
            'Explore open models from GLM, Kimi, Qwen, DeepSeek, MiniMax and Nemotron. Integrations are demonstrated locally; live services and pricing await validation.',
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
          {modelCatalog.map((model) => (
            <article
              key={model.id}
              id={model.id}
              style={{ scrollMarginTop: 130 }}
            >
              <Image
                src={model.logo}
                alt=""
                width={36}
                height={36}
                style={{ objectFit: 'contain' }}
              />
              <h3>{model.name}</h3>
              <p>
                {t(
                  '开放模型目录 · 服务接入待验证',
                  'Open model catalog · service integration pending',
                )}
              </p>
              <a href={model.source} target="_blank" rel="noreferrer">
                {t('官方模型仓库', 'Official repository')} ↗
              </a>
              <Link href={`/demo/console/integrations?model=${model.id}`}>
                {t('查看接入演示', 'Explore integration')}
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
