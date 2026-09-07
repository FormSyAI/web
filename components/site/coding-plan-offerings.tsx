import { ArrowRight, Check, Code2, Cpu, Building2 } from 'lucide-react';
import { useI18n } from '@/components/i18n/i18n-provider';
import { AppLink as Link } from '@/components/runtime/app-link';
import './coding-plan-offerings.css';
export function CodingPlanOfferings() {
  const { locale } = useI18n();
  const t = (zh: string, en: string) => (locale === 'zh-CN' ? zh : en);
  return (
    <section className="cp-offerings pr-shell" id="coding-plan">
      <div className="cp-intro">
        <span>CODING PLAN / API / ENTERPRISE</span>
        <h2>
          {t(
            '从个人构建，到企业协作',
            'From individual development to enterprise collaboration',
          )}
        </h2>
        <p>
          {t(
            '套餐、按量服务与企业交付分别选择。正式价格与模型清单将在服务开放前公布。',
            'Choose subscriptions, metered services, or enterprise delivery. Prices and models will be published before launch.',
          )}
        </p>
      </div>
      <div className="cp-cards">
        {[
          {
            name: 'Coding Plan',
            Icon: Code2,
            desc: t(
              '为日常编程提供清晰的模型权益与使用额度。',
              'Clear model benefits and usage allowances for everyday coding.',
            ),
            items: [
              t('Starter / Pro 两档规划', 'Starter / Pro plans'),
              t('独立额度与重置时间', 'Dedicated quotas and reset times'),
              t('Key 与编程工具接入', 'Keys and coding-tool integrations'),
            ],
            href: '/aurinova-reference/coding-plan',
          },
          {
            name: t('API 按量计费', 'Metered API'),
            Icon: Cpu,
            desc: t(
              '按实际模型调用使用，余额与套餐分别管理。',
              'Pay for model requests with a balance managed separately from subscriptions.',
            ),
            items: [
              t(
                '输入、缓存与输出分项计量',
                'Separate input, cache and output metering',
              ),
              t('明确预算与模型授权', 'Explicit budgets and model permissions'),
              t('用量、账单与明细导出', 'Usage, billing and exports'),
            ],
            href: '/demo/console/billing/balance',
          },
          {
            name: t('企业方案', 'Enterprise'),
            Icon: Building2,
            desc: t(
              '围绕工作负载、数据边界与团队需求确定交付。',
              'Agree on delivery around workloads, data boundaries and team requirements.',
            ),
            items: [
              t('试点与验证', 'Pilot evaluation'),
              t(
                '私有部署与专属容量',
                'Private deployment and dedicated capacity',
              ),
              t('团队、SSO 与产业合作', 'Teams, SSO and partnerships'),
            ],
            href: '/aurinova-reference#engagement',
          },
        ].map(({ name, Icon, desc, items, href }) => (
          <article key={name}>
            <Icon size={27} />
            <h3>{name}</h3>
            <p>{desc}</p>
            <ul>
              {items.map((item) => (
                <li key={item}>
                  <Check size={15} />
                  {item}
                </li>
              ))}
            </ul>
            <strong className="cp-availability">
              {name === 'Coding Plan'
                ? t('正式价格待公布', 'Pricing to be announced')
                : name === t('API 按量计费', 'Metered API')
                  ? t('控制台可用', 'Console available')
                  : t('按交付范围确认', 'Scoped engagement')}
            </strong>
            <Link href={href}>
              {t('了解方案', 'Explore')}
              <ArrowRight size={17} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
