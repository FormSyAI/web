import type { ContentShape } from './i18n';
import { aurinovaReferenceContent as en } from './aurinova-reference';

const customerSummaries = [
  '通过单一 Azure 端点进行可重复的大规模评测，更快完成模型决策。',
  '在保持产品体验的同时，将一款广泛使用的内部智能体迁移到 GLM。',
  '随流量变化灵活调用生产容量和强化学习推理。',
  '结合模型服务与强化学习，持续跟上编程模型的快速发展。',
  '将生产环境 AI 功能的延迟从约两秒降低到约 350 毫秒。',
  '在四周内获得了更强的 AI 路线图控制力，并提升了质量。',
  '迁移开放模型工作负载后，响应速度提升了三倍。',
  '将高速模型推理与自有调优、代码搜索及深度代码上下文结合。',
  '通过 Azure Foundry 运行开放模型，为注重速度、成本和质量的计算机使用产品提供支持。',
  '使用 AURINOVA 基础设施，支撑大规模生产级编程体验。',
  '使用 Training SDK，让研究人员专注于自主智能体研究。',
  '通过 Multi-LoRA 将企业私有数据应用于自定义 AI 训练。',
] as const;

const footerLabels = [
  {
    title: '平台',
    links: ['AI 原生', '企业', '客户'],
  },
  {
    title: '使用场景',
    links: [
      '代码辅助',
      '对话式 AI',
      '智能体系统',
      '搜索',
      '多模态',
      '企业 RAG',
    ],
  },
  {
    title: '开发者',
    links: ['模型库', '文档', 'CLI', 'API', '更新日志'],
  },
  {
    title: '定价',
    links: ['无服务器', '按需服务', '微调', '企业'],
  },
  {
    title: '合作伙伴',
    links: ['云与基础设施', '咨询与服务', '技术'],
  },
  {
    title: '资源',
    links: ['博客', '演示', '实践手册'],
  },
  {
    title: '公司',
    links: ['领导团队', '投资者', '加入我们', '信任中心'],
  },
] as const;

export const aurinovaReferenceContentZh = {
  ...en,
  ui: {
    ...en.ui,
    pageTitle: 'AURINOVA | 专用智能基础设施',
    pageDescription: '面向企业专用智能的训练、推理与模型基础设施。',
    switchLanguage: '切换到英文',
    alternateLocaleName: 'EN',
    skipToContent: '跳转到主要内容',
    announcementLabel: '公告',
    homeLabel: 'AURINOVA 首页',
    navigationLabel: '主导航',
    login: '登录',
    getStarted: '开始使用',
    openNavigation: '打开导航',
    closeNavigation: '关闭导航',
    mobileLinks: [
      { label: '推理', href: '/inference' },
      { label: '训练', href: '/training' },
      { label: 'RL 采样', href: '/training/rl-rollouts' },
      { label: 'Nexus', href: '/nexus' },
      { label: '模型', href: '/models' },
      { label: '定价', href: '/pricing' },
      { label: '资源', href: '/blog' },
    ],
    chartLabel: '令牌用量增长，AI 支出保持在更低水平',
    tokensUsed: '已用令牌',
    aiSpend: 'AI 支出',
    aiSpendAxis: 'AI 支出（美元）',
    totalTokensAxis: '令牌总数',
    useCases: '使用场景',
    resources: '资源',
    company: '公司',
    companyDescription: '了解打造 AURINOVA 的团队，探索开放职位。',
    featuredResources: '精选资源',
    secondHeroImageAlt: 'AURINOVA 前沿训练与推理图形',
    heroSlides: '首屏轮播',
    showNexusSlide: '显示 Nexus 内容',
    showSpecializedSlide: '显示专用智能内容',
    selectedCustomers: '精选客户',
    gtcImageAlt: 'AI 基础设施主题对谈',
    viewAllModels: '查看全部模型',
    context: '上下文',
    previousModels: '上一组模型',
    nextModels: '下一组模型',
    logo: '标志',
    at: '就职于',
    previousTestimonials: '上一组客户评价',
    nextTestimonials: '下一组客户评价',
    seeMore: '查看更多',
    ctaTitle: '今天就开始构建',
    ctaDescription: '立即运行热门模型和专用模型。',
    talkToExpert: '咨询专家',
    copyright: '© 2026 AURINOVA. 保留所有权利。',
    currentSite: 'AURINOVA 首页',
    officialSource: '联系我们 ↗',
  },
  meta: { ...en.meta, label: 'AURINOVA 产品网站' },
  announcement: { ...en.announcement, label: '训练 API 现已正式发布' },
  navigation: [
    { label: '产品', href: '#platform', menu: true, menuKey: 'Product' },
    { label: '解决方案', href: '#customers', menu: true, menuKey: 'Solutions' },
    { label: '模型', href: '#models', menu: true, menuKey: 'Models' },
    { label: '定价', href: '/pricing' },
    { label: '资源', href: '#updates', menu: true, menuKey: 'Resources' },
  ],
  megaMenus: {
    Product: {
      ...en.megaMenus.Product,
      links: [
        {
          ...en.megaMenus.Product.links[0],
          label: '推理',
          description: '部署前沿开放模型，或你自己的后训练版本。',
        },
        {
          ...en.megaMenus.Product.links[1],
          label: '训练',
          description: '以完整的训练能力，将开放模型转化为专用智能。',
        },
        {
          ...en.megaMenus.Product.links[2],
          label: 'RL 采样',
          description: '为自建强化学习的团队提供专用采样推理。',
        },
        {
          ...en.megaMenus.Product.links[3],
          description: '通过开放权重模型层提升令牌用量，同时降低成本。',
        },
      ],
      feature: {
        ...en.megaMenus.Product.feature,
        quote: '为大规模高吞吐编程模型提供训练与生产推理。',
      },
    },
    Solutions: {
      ...en.megaMenus.Solutions,
      audiences: [
        { ...en.megaMenus.Solutions.audiences[0], label: '面向 AI 原生团队' },
        { ...en.megaMenus.Solutions.audiences[1], label: '面向企业' },
      ],
      cases: [
        { ...en.megaMenus.Solutions.cases[0], label: '代码辅助' },
        { ...en.megaMenus.Solutions.cases[1], label: '对话式 AI' },
        { ...en.megaMenus.Solutions.cases[2], label: '智能体' },
        { ...en.megaMenus.Solutions.cases[3], label: '搜索' },
        { ...en.megaMenus.Solutions.cases[4], label: '多模态' },
        { ...en.megaMenus.Solutions.cases[5], label: '开发者效率' },
      ],
    },
    Models: {
      ...en.megaMenus.Models,
      library: { ...en.megaMenus.Models.library, label: '完整模型库' },
    },
    Resources: {
      ...en.megaMenus.Resources,
      intro: '通过指南、工具和洞察，充分发挥 AURINOVA 的价值。',
      resources: [
        { ...en.megaMenus.Resources.resources[0], label: '文档' },
        { ...en.megaMenus.Resources.resources[1], label: '博客' },
        { ...en.megaMenus.Resources.resources[2], label: '活动' },
        { ...en.megaMenus.Resources.resources[3], label: '演示' },
        { ...en.megaMenus.Resources.resources[4], label: '客户' },
      ],
      company: [
        { ...en.megaMenus.Resources.company[0], label: '领导团队' },
        { ...en.megaMenus.Resources.company[1], label: '投资者' },
        { ...en.megaMenus.Resources.company[2], label: '信任中心' },
        { ...en.megaMenus.Resources.company[3], label: '加入我们' },
      ],
      featured: [
        {
          ...en.megaMenus.Resources.featured[0],
          type: '公司新闻',
          title: '训练 API 现已正式发布',
        },
        {
          ...en.megaMenus.Resources.featured[1],
          type: '模型发布',
          title: 'DeepSeek V4 Pro 登录 AURINOVA',
        },
      ],
    },
  },
  hero: {
    ...en.hero,
    eyebrow: 'AURINOVA NEXUS 全新发布',
    title: '重新掌控你的 AI 编程支出',
    description:
      '用一层智能路由替代封闭模型端点，为每个任务选择合适的开放或封闭模型，将编程模型成本降低 50–75%。',
    primary: { ...en.hero.primary, label: '申请演示' },
    secondary: { ...en.hero.secondary, label: '了解更多' },
  },
  secondHero: {
    ...en.secondHero,
    eyebrow: '来自 PYTORCH 核心创造者',
    title: '掌控你的模型。\n掌控你的未来。',
    description:
      'AURINOVA 训练与推理帮助团队将开放模型转化为围绕自身业务打造的专用智能。',
    primary: { ...en.secondHero.primary, label: '开始使用' },
    secondary: { ...en.secondHero.secondary, label: '联系我们' },
  },
  gtc: {
    ...en.gtc,
    eyebrow: 'AURINOVA AI 基础设施',
    title: '为下一代 AI 产品打造基础设施',
    description:
      'AURINOVA 将模型训练、生产推理与持续反馈连接为统一的专用智能平台。',
  },
  platform: {
    ...en.platform,
    eyebrow: '构建你的前沿能力',
    title: '面向专用智能的基础设施',
    description:
      '将领先的开放模型与私有数据、领域经验结合，建立一条从生产反馈中持续改进的自有学习闭环。',
    pillars: [
      {
        ...en.platform.pillars[0],
        name: '训练',
        audience: '从引导式运行到前沿强化学习',
        description:
          '随着工作负载成熟，逐步深入训练栈，通过专为快速进入生产环境设计的检查点推进。',
        modes: [
          '引导路径：定义任务、审阅计划和成本、批准运行，并获得训练完成的模型。',
          '由配置驱动的训练，排期与生产部署由 AURINOVA 处理。',
          '在 AURINOVA GPU 上使用自定义损失、训练器、强化学习闭环、采样服务和权重同步。',
        ],
        primary: { ...en.platform.pillars[0].primary, label: '了解更多' },
        secondary: { ...en.platform.pillars[0].secondary, label: '联系团队' },
      },
      {
        ...en.platform.pillars[1],
        name: '推理',
        audience: '从开发阶段扩展至 CURSOR 级规模',
        description:
          '使用针对吞吐量、延迟和模型质量优化的引擎，部署当前开放模型或你训练的变体。',
        modes: [
          '无服务器：按令牌计费，提供 Priority 与 Fast 层级，并兼容 OpenAI 和 Anthropic API。',
          '按需服务：专属部署、多区域选项，并支持后训练模型。',
          '预留容量：保障容量、更高配额，并可使用最新硬件。',
        ],
        primary: { ...en.platform.pillars[1].primary, label: '了解更多' },
        secondary: { ...en.platform.pillars[1].secondary, label: '联系团队' },
      },
    ],
  },
  models: {
    ...en.models,
    eyebrow: '模型库',
    title: '只需一行代码，即可运行最新开放模型',
    description: '访问针对成本、速度和质量优化的热门开源模型。',
  },
  customers: {
    ...en.customers,
    eyebrow: '客户口碑',
    title: '听听客户怎么说',
    items: en.customers.items.map((item, index) => ({
      ...item,
      summary: customerSummaries[index] ?? item.summary,
    })),
  },
  updates: {
    ...en.updates,
    eyebrow: '最新动态',
    title: 'AURINOVA 最新进展',
    items: [
      {
        ...en.updates.items[0],
        type: '公司新闻',
        title: '超越前沿：训练 API 现已正式发布',
      },
      {
        ...en.updates.items[1],
        type: '模型发布',
        title:
          'DeepSeek V4 Pro：SWE-Bench 领先，单任务成本仅为 Fable 5 的三分之一',
      },
      {
        ...en.updates.items[2],
        type: '使用场景',
        title: 'DeepSeek V4 Pro 正在重塑安全智能体的经济性',
      },
    ],
  },
  footer: en.footer.map((group, groupIndex) => ({
    ...group,
    title: footerLabels[groupIndex]?.title ?? group.title,
    links: group.links.map(
      ([label, href], linkIndex) =>
        [footerLabels[groupIndex]?.links[linkIndex] ?? label, href] as const,
    ),
  })),
} as const satisfies ContentShape<typeof en>;
