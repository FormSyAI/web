import type { ContentShape, Locale } from './i18n';

const shared = {
  serverlessTrainingRows: [
    ['Qwen 3.8 27B', '128K', '$1.86', '$0.372', '$5.595', '$4.103'],
    ['Kimi K3', '192K', '$10.87', '$2.17', '$27.11', '$32.55'],
    ['DeepSeek V4 Flash 0731', '262K', '$1.74', '$0.35', '$4.33', '$5.20'],
    ['Muse Glimmer 30B', '128K', '$1.96', '$0.39', '$4.88', '$5.86'],
  ],
  gpuRows: [
    ['H100 80 GB GPU', '$7.00', '$8.00'],
    ['H200 141 GB GPU', '$7.00', '$8.00'],
    ['B200 180 GB GPU', '$10.00', '$13.00'],
    ['B300 288 GB GPU', '$12.00', '$15.00'],
    ['GB300 288 GB GPU', '$18.00', '$20.00'],
  ],
} as const;

const en = {
  meta: {
    title: 'Pricing | AURINOVA',
    description:
      'Transparent pricing for AURINOVA inference, training, and on-demand deployments.',
  },
  ui: {
    switchLanguage: 'Switch to Chinese',
    alternateLocaleName: '中文',
    skip: 'Skip to pricing',
    navigation: 'Primary navigation',
    openMenu: 'Open navigation',
    closeMenu: 'Close navigation',
    pricingSections: 'Pricing sections',
  },
  announcement: 'Training API now generally available',
  nav: ['Product', 'Solutions', 'Models', 'Pricing', 'Resources'],
  login: 'LOG IN',
  getStarted: 'GET STARTED',
  contact: 'CONTACT US',
  seePricing: 'SEE PRICING',
  hero: {
    title: 'Pricing to seamlessly scale from idea to enterprise',
    description:
      'Start building in seconds, self-serve. Contact us for enterprise deployments with faster speeds, lower costs, and higher rate limits.',
  },
  jumpCards: [
    {
      title: 'Serverless Inference',
      description:
        'Get started in seconds with per token pricing, zero setup and no cold starts',
      href: '#serverless-pricing',
    },
    {
      title: 'Training',
      description:
        'Customize open models with your own data with minimal setup',
      href: '#fine-tuning-pricing',
    },
    {
      title: 'On Demand Deployments',
      description:
        'Pay per GPU second for faster speeds, higher rate limits, and lower costs at scale',
      href: '#on-demand-pricing',
    },
  ],
  serverless: {
    title: 'Serverless Inference',
    description:
      'Pay per token, with high rate limits and postpaid billing. Get started with $1 in free credits. To view current pricing for popular models across Standard, Priority, and Fast serverless tiers, visit our documentation.',
    docs: 'DOCUMENTATION',
  },
  embeddings: 'Embeddings',
  embeddingHeaders: ['Base model parameter count', '$ / 1M input tokens'],
  embeddingRows: [
    ['up to 150M', '$0.008'],
    ['150M - 350M', '$0.016'],
    ['Qwen3 8B', '$0.1'],
  ],
  training: {
    title: 'Training Pricing',
    intro: 'Serve fine-tuned models for the same price as base models.',
    managed: 'Managed Training',
    managedDescription:
      'Supervised and preference fine tuning is priced per 1M training tokens. Reinforcement fine tuning jobs are priced per GPU hour (billed per second), at the same price as AURINOVA on-demand deployments.',
    managedHeaders: [
      'Base Model',
      'LoRA SFT',
      'LoRA DPO',
      'Full Param SFT',
      'Full Param DPO',
    ],
    notes: [
      'SFT and DPO prices are shown in $ per 1M training tokens. Training tokens can be estimated as tokens in the training dataset × number of epochs. For tuning with intermediate thinking traces, multiply the estimate by the average number of conversation turns ÷ 2.',
      'When fine-tuning with reasoning traces, including the reasoning_content field for assistant turns increases the total tuned tokens because multi-turn conversations are unrolled into user, assistant, and thinking traces.',
      'Fine-tuning with images (VLM supervised fine-tuning) is also billed per 1M tokens.',
    ],
    serverlessApi: 'Serverless Training API',
    serverlessDescription:
      "Attach to a shared, always-on trainer pool for LoRA training on launch models. There's no provisioning and no idle cost. You pay only for the tokens you prefill, sample, and train.",
    serverlessHeaders: [
      'Base Model',
      'Context',
      'Prefill / 1M',
      'Cached Prefill / 1M',
      'Sample / 1M',
      'Train / 1M',
    ],
    serverlessNotes: [
      'Checkpoint storage for serverless models is included during private preview.',
      'Other frontier models are coming soon to the Serverless Training API catalog.',
    ],
    dedicated: 'Dedicated Training API',
    dedicatedDescription:
      'Dedicated Training API jobs are priced per GPU hour. See the On-Demand Pricing section below for details.',
  },
  managedRows: [
    ['Models up to 16B parameters', '$0.50', '$1.00', '$1.00', '$2.00'],
    ['Models 16.1B - 80B', '$3.00', '$6.00', '$6.00', '$12.00'],
    [
      'Models 80B - 300B (e.g. Qwen3-235B, gpt-oss-120B)',
      '$6.00',
      '$12.00',
      '$12.00',
      '$24.00',
    ],
    [
      'Models >300B (e.g. DeepSeek V3, Kimi K2)',
      '$10.00',
      '$20.00',
      '$20.00',
      '$40.00',
    ],
  ],
  onDemand: {
    title: 'On-Demand Pricing',
    intro: 'Pay per GPU second, with no extra charges for start-up times',
    subtitle: 'On demand deployments',
    headers: [
      'GPU Type',
      'Price ($) per hour — up to Aug 31',
      'Price ($) per hour — from Sep 1',
    ],
    note: 'Region-restricted deployments are priced at a 1.5× premium.',
  },
  footer: {
    groups: [
      ['Platform', 'AI Native', 'Enterprise', 'Customers'],
      [
        'Use Cases',
        'Code Assistance',
        'Conversational AI',
        'Agentic Systems',
        'Search',
        'Multimodal',
        'Enterprise RAG',
      ],
      ['Developers', 'Model Library', 'Docs', 'CLI', 'API', 'Changelog'],
      ['Pricing', 'Serverless', 'On-Demand', 'Fine Tuning', 'Enterprise'],
      [
        'Partners',
        'Cloud and Infrastructure',
        'Consulting and Services',
        'Technology',
      ],
      ['Resources', 'Blog', 'Demos', 'Cookbooks'],
      ['Company', 'Leadership', 'Investors', 'Careers', 'Trust Center'],
    ],
    copyright: '© 2026 AURINOVA. ALL RIGHTS RESERVED.',
  },
  ...shared,
} as const;

const zh = {
  meta: {
    title: '定价 | AURINOVA',
    description: 'AURINOVA 推理、训练与按需部署的透明定价。',
  },
  ui: {
    switchLanguage: '切换到英文',
    alternateLocaleName: 'EN',
    skip: '跳转到定价内容',
    navigation: '主导航',
    openMenu: '打开导航',
    closeMenu: '关闭导航',
    pricingSections: '定价章节',
  },
  announcement: '训练 API 现已正式开放',
  nav: ['产品', '解决方案', '模型', '定价', '资源'],
  login: '登录',
  getStarted: '开始使用',
  contact: '联系我们',
  seePricing: '查看定价',
  hero: {
    title: '从创意到企业，定价随业务无缝扩展',
    description:
      '数秒内即可自助开始构建。企业部署可联系我们，获得更快速度、更低成本与更高限额。',
  },
  jumpCards: [
    {
      title: '无服务器推理',
      description: '按 Token 计费，零配置、无冷启动，数秒内开始使用',
      href: '#serverless-pricing',
    },
    {
      title: '模型训练',
      description: '用您自己的数据定制开放模型，配置极简',
      href: '#fine-tuning-pricing',
    },
    {
      title: '按需部署',
      description:
        '按 GPU 秒计费，为规模化业务提供更快速度、更高限额与更低成本',
      href: '#on-demand-pricing',
    },
  ],
  serverless: {
    title: '无服务器推理',
    description:
      '按 Token 计费，提供高限额与后付费账单。注册即赠 1 美元额度。有关 Standard、Priority 与 Fast 无服务器层级中热门模型的当前价格，请查阅文档。',
    docs: '查看文档',
  },
  embeddings: '嵌入模型',
  embeddingHeaders: ['基础模型参数量', '每百万输入 Token 价格'],
  embeddingRows: [
    ['不超过 150M', '$0.008'],
    ['150M - 350M', '$0.016'],
    ['Qwen3 8B', '$0.1'],
  ],
  training: {
    title: '训练定价',
    intro: '微调模型与基础模型采用相同的服务价格。',
    managed: '托管训练',
    managedDescription:
      '监督微调与偏好微调按每百万训练 Token 计费。强化微调任务按 GPU 小时计费（精确到秒），价格与 AURINOVA 按需部署一致。',
    managedHeaders: [
      '基础模型',
      'LoRA SFT',
      'LoRA DPO',
      '全参数 SFT',
      '全参数 DPO',
    ],
    notes: [
      'SFT 与 DPO 价格以每百万训练 Token 的美元价格显示。训练 Token 可按训练数据集 Token 数 × 训练轮数估算；包含中间思考轨迹时，还应乘以平均对话轮数 ÷ 2。',
      '使用推理轨迹进行微调时，若在助手轮次中包含 reasoning_content 字段，总训练 Token 会增加，因为多轮对话会展开为用户、助手与思考轨迹。',
      '图像微调（VLM 监督微调）同样按每百万 Token 计费。',
    ],
    serverlessApi: '无服务器训练 API',
    serverlessDescription:
      '接入共享、常驻的训练器池，对首发模型执行 LoRA 训练。无需资源预置，也没有闲置成本；仅为预填充、采样与训练使用的 Token 付费。',
    serverlessHeaders: [
      '基础模型',
      '上下文',
      '预填充 / 1M',
      '缓存预填充 / 1M',
      '采样 / 1M',
      '训练 / 1M',
    ],
    serverlessNotes: [
      '私测期间包含无服务器模型的检查点存储。',
      '更多前沿模型即将加入无服务器训练 API 目录。',
    ],
    dedicated: '专属训练 API',
    dedicatedDescription:
      '专属训练 API 任务按 GPU 小时计费，详情请参阅下方按需定价。',
  },
  managedRows: [
    ['参数量不超过 16B 的模型', '$0.50', '$1.00', '$1.00', '$2.00'],
    ['参数量 16.1B - 80B 的模型', '$3.00', '$6.00', '$6.00', '$12.00'],
    [
      '参数量 80B - 300B 的模型（如 Qwen3-235B、gpt-oss-120B）',
      '$6.00',
      '$12.00',
      '$12.00',
      '$24.00',
    ],
    [
      '参数量超过 300B 的模型（如 DeepSeek V3、Kimi K2）',
      '$10.00',
      '$20.00',
      '$20.00',
      '$40.00',
    ],
  ],
  onDemand: {
    title: '按需定价',
    intro: '按 GPU 秒计费，启动时间不产生额外费用',
    subtitle: '按需部署',
    headers: [
      'GPU 类型',
      '每小时价格（美元）— 8 月 31 日前',
      '每小时价格（美元）— 9 月 1 日起',
    ],
    note: '区域限定部署按 1.5 倍价格计费。',
  },
  footer: {
    groups: [
      ['平台', 'AI 原生', '企业服务', '客户'],
      [
        '使用场景',
        '代码辅助',
        '对话式 AI',
        '智能体系统',
        '搜索',
        '多模态',
        '企业 RAG',
      ],
      ['开发者', '模型库', '文档', 'CLI', 'API', '更新日志'],
      ['定价', '无服务器', '按需部署', '微调', '企业方案'],
      ['合作伙伴', '云与基础设施', '咨询与服务', '技术'],
      ['资源', '博客', '演示', '实践手册'],
      ['公司', '管理团队', '投资者', '职位', '信任中心'],
    ],
    copyright: '© 2026 AURINOVA。保留所有权利。',
  },
  ...shared,
} as const satisfies ContentShape<typeof en>;

export const pricingDictionaries = {
  'zh-CN': zh,
  'en-US': en,
} as const satisfies Record<Locale, ContentShape<typeof en>>;
export type PricingContent = (typeof pricingDictionaries)[Locale];
