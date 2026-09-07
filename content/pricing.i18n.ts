import { createAurinovaContent } from './aurinova-reference';
import type { Locale } from './i18n';
function createPricing(locale: Locale) {
  const t = (zh: string, en: string) => (locale === 'zh-CN' ? zh : en);
  const { engagement } = createAurinovaContent(locale);
  return {
    meta: {
      title: t(
        '方案与定价 | AURINOVA · FormSy',
        'Plans & pricing | AURINOVA · FormSy',
      ),
      description: t(
        '从试点验证到企业部署，围绕工作负载、部署环境与验收目标选择合作方式。',
        'Choose an engagement around workloads, deployment requirements and acceptance criteria, from pilot to enterprise deployment.',
      ),
    },
    hero: {
      title: t(
        '从试点验证，到企业规模化部署',
        'From pilot evaluation to enterprise deployment',
      ),
      description: t(
        '围绕工作负载、部署环境与验收目标，选择合适的合作方式。',
        'Choose an engagement around your workloads, deployment environment and acceptance criteria.',
      ),
    },
    ui: {
      skip: t('跳转到方案内容', 'Skip to engagement plans'),
      pricingSections: t('合作方案', 'Engagement plans'),
      seeDetails: t('查看方案', 'Explore plan'),
      scope: t('共同确定交付范围', 'Define the scope together'),
      compare: t('比较合作方式', 'Compare engagement options'),
      faq: t('常见问题', 'Frequently asked questions'),
    },
    primary: {
      label: t('了解试点流程', 'Explore the pilot process'),
      href: '/aurinova-reference#pilot-process',
    },
    secondary: {
      label: t('了解 FormSy', 'Explore FormSy'),
      href: '/aurinova-reference#overview',
    },
    plans: engagement.plans,
    comparison: {
      headers: [
        t('比较维度', 'Dimension'),
        ...engagement.plans.map((x) => x.title),
      ],
      rows: [
        [
          t('部署方式', 'Deployment'),
          t('围绕试点环境确认', 'Agreed for the pilot'),
          t('按需规划 Edge / VPC', 'Plan Edge / VPC as needed'),
          t('按集成与交付范围确认', 'Agreed for integration and delivery'),
        ],
        [
          t('模型来源', 'Models'),
          t('按代表任务评估', 'Evaluate against representative tasks'),
          t(
            '自带或选定模型，确认适配',
            'Existing or selected models; validate fit',
          ),
          t(
            '明确合作方与平台责任',
            'Define partner and platform responsibilities',
          ),
        ],
        [
          t('数据边界', 'Data boundaries'),
          t('约定试点数据与访问范围', 'Agree on pilot data and access'),
          t(
            '按企业权限与网络要求规划',
            'Plan around enterprise access and networks',
          ),
          t('约定数据权属与使用边界', 'Agree on ownership and permitted use'),
        ],
        [
          t('评测支持', 'Evaluation'),
          t('确定基线与验收标准', 'Define baseline and acceptance criteria'),
          t('按持续工作负载确定评估机制', 'Define ongoing workload evaluation'),
          t('按阶段目标约定验收', 'Agree on milestone acceptance'),
        ],
        [
          t('容量规划', 'Capacity'),
          t('按试点任务量评估', 'Assess pilot task volume'),
          t(
            '按并发、时延与成本目标评估',
            'Assess concurrency, latency and cost',
          ),
          t('按联合交付规模评估', 'Assess joint delivery scale'),
        ],
        [
          t('服务支持', 'Support'),
          t('按试点范围确认', 'Agreed for the pilot scope'),
          t('按服务范围确认', 'Agreed for the service scope'),
          t('按合作分工确认', 'Agreed across partner roles'),
        ],
        [
          t('交付责任', 'Delivery responsibilities'),
          t('共同确定任务和验证范围', 'Agree on tasks and evaluation scope'),
          t(
            '明确平台、部署与运维边界',
            'Define platform, deployment and operations',
          ),
          t(
            '明确授权、集成与升级机制',
            'Define licensing, integration and upgrades',
          ),
        ],
      ],
      note: t(
        '具体能力、周期、容量和费用按项目确认。',
        'Capabilities, timelines, capacity and fees are agreed for each project.',
      ),
    },
    faq: [
      [
        t('能否沿用现有 Agent？', 'Can we keep our existing agents?'),
        t(
          'FormSy 的架构围绕现有 Agent 和工程系统接入设计。试点阶段需确认使用工具、版本、接入方式与验证范围。',
          'FormSy is designed around existing agents and engineering systems. Confirm tools, versions, integration methods and validation scope during the pilot.',
        ),
      ],
      [
        t('能否自带模型和算力？', 'Can we bring our own models and compute?'),
        t(
          'BYOM 与 BYOC 是部署规划选项。需要结合模型接口、硬件、网络和运行要求评估适配方案。',
          'BYOM and BYOC are deployment options. Evaluate compatibility against model interfaces, hardware, network and runtime requirements.',
        ),
      ],
      [
        t('如何定义任务完成？', 'How is task completion defined?'),
        t(
          '开始前约定完成标准和所需证据，将测试、检查与证据报告纳入验收。',
          'Agree on acceptance criteria and required evidence before execution, including tests, checks and evidence reports.',
        ),
      ],
      [
        t('试点需要什么资料？', 'What do we need for a pilot?'),
        t(
          '准备代表性任务、相关代码或文档范围、现有测试与验收方法，以及部署和权限要求。具体资料范围在试点前共同确定。',
          'Prepare representative tasks, relevant code or documentation scope, existing tests and acceptance methods, plus deployment and access requirements. Agree on the exact scope before the pilot.',
        ),
      ],
      [
        t(
          '如何计算成功任务成本？',
          'How is cost per verified task calculated?',
        ),
        t(
          '将模型、算力、验证和重试开销纳入总成本，再除以通过验收的任务数，同时对照完成率和时延。',
          'Include models, compute, verification and retries in total cost, then divide by accepted tasks. Report completion rate and latency alongside cost.',
        ),
      ],
      [
        t('数据与证据部署在哪里？', 'Where do data and evidence live?'),
        t(
          '根据企业数据边界与网络要求，确定上下文、证据和推理各层的部署位置。Edge / VPC 与外部模型服务的边界需在方案中明确。',
          'Place context, evidence and inference according to enterprise data and network requirements. Define the boundaries between Edge / VPC and external model services in the deployment plan.',
        ),
      ],
    ],
  };
}
export const pricingDictionaries = {
  'zh-CN': createPricing('zh-CN'),
  'en-US': createPricing('en-US'),
};
export type PricingContent = (typeof pricingDictionaries)[Locale];
