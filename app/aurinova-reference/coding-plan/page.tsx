import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/components/i18n/i18n-provider';
import { AurinovaReferenceHeader } from '@/components/site/aurinova-reference-header';
import { AurinovaReferenceFooter } from '@/components/site/aurinova-reference-footer';
import { CodingPlanOfferings } from '@/components/site/coding-plan-offerings';
import { AppLink as Link } from '@/components/runtime/app-link';
export default function CodingPlanPage() {
  const { locale } = useI18n();
  const t = (zh: string, en: string) => (locale === 'zh-CN' ? zh : en);
  useEffect(() => {
    document.title = 'Coding Plan | AURINOVA · FormSy';
  }, []);
  return (
    <main className="pr-page">
      <AurinovaReferenceHeader />
      <section className="pr-hero pr-shell">
        <p>FORMSY / CODING PLAN</p>
        <h1>
          {t(
            '为每一次构建，准备好模型与额度',
            'Models and capacity for every build',
          )}
        </h1>
        <p>
          {t(
            '选择模型、配置编程工具，持续查看调用与成本。正式套餐将在模型和服务验证后开放。',
            'Choose models, configure your coding tools, and track usage and cost. Plans will open after model and service validation.',
          )}
        </p>
        <div className="cp-hero-actions">
          <Link
            className="pr-button pr-button-solid"
            href="/demo/console/coding-plan"
          >
            {t('查看 Coding Plan', 'Explore Coding Plan')}
            <ArrowRight size={17} />
          </Link>
          <Link
            className="pr-button pr-button-outline"
            href="/aurinova-reference/signup?return_to=%2Fconsole%2Fcoding-plan"
          >
            {t('注册账号', 'Create an account')}
          </Link>
        </div>
      </section>
      <section className="cp-steps pr-shell">
        {[
          t('选择套餐', 'Choose a plan'),
          t('创建 Key', 'Create a key'),
          t('配置工具', 'Connect your tools'),
          t('查看用量', 'Track usage'),
        ].map((v, i) => (
          <div key={v}>
            <strong>0{i + 1}</strong>
            <h3>{v}</h3>
            <p>
              {
                [
                  t(
                    '了解模型范围、额度和重置规则。',
                    'Understand models, quotas and reset rules.',
                  ),
                  t(
                    '为套餐或按量服务指定独立计费来源。',
                    'Set an explicit billing source for your key.',
                  ),
                  t(
                    '按已验证的协议接入，检查调用状态。',
                    'Connect through validated protocols and check requests.',
                  ),
                  t(
                    '追踪点数、Token 与账单明细。',
                    'Inspect credits, tokens and billing details.',
                  ),
                ][i]
              }
            </p>
          </div>
        ))}
      </section>
      <CodingPlanOfferings />
      <AurinovaReferenceFooter />
    </main>
  );
}
