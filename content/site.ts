export type LinkItem = {
  label: string;
  href: string;
};

export type PlatformItem = {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: readonly string[];
  href: string;
  tone: 'dark' | 'light';
};

export const siteContentZh = {
  ui: {
    pageTitle: 'FormSy · 任务上下文与可归因证据平台',
    pageDescription:
      '连接任务、上下文、决策、行动与结果，为归因验证和可复用工程知识提供数据基础。',
    localeName: '中文',
    alternateLocaleName: 'EN',
    switchLanguage: 'Switch to English',
    skipToContent: '跳到主要内容',
    homeLabel: 'AURINOVA 首页',
    navigationLabel: '主导航',
    mobileNavigationLabel: '移动端导航',
    openMenu: '打开导航菜单',
    docs: '文档',
    startBuilding: '开始构建',
    viewArchitecture: '查看架构',
    viewProductArchitecture: '查看产品架构',
    ecosystemLabel: '兼容生态',
    productClaimLabel: 'FormSy 产品主张',
    heroPaginationLabel: '切换主视觉',
    showSlide: '显示第 {index} 张',
    signalLabel: '任务完成率提升与成功任务成本优化示意图',
    signalSuccess: '任务完成率',
    signalCost: '成功任务成本',
    flywheelLabel: 'Context to Weights 企业学习闭环',
    controlPanelLabel: 'FormSy 任务控制面板示意',
    controlRows: [
      ['TASK', 'issue + repository'],
      ['EVIDENCE', 'source + relation'],
      ['CONTRACT', 'pytest + review'],
      ['OUTCOME', 'verified + traceable'],
    ],
    live: 'TRACE',
    evidenceComplete: 'SOURCE-BOUND CONTEXT',
    validatedResult: 'CHECKABLE RESULT',
    manifestoQuote:
      '“先理解任务与代码，再行动；用证据说明结果，而不是只给出答案。”',
    manifestoSignature: 'TASK CONTEXT · EVIDENCE · KNOWLEDGE',
    architectureFootnotes: [
      'FORMSY · TASK / CONTEXT / EVIDENCE / KNOWLEDGE',
      'AURINOVA · MODEL / GATEWAY / WORKLOAD / COMPUTE',
    ],
    governancePath: '查看治理路径',
    exploreCapabilities: '探索全部能力',
    assetCarouselLabel: '企业主权上下文资产',
    footerTagline: 'TASK CONTEXT AND EVIDENCE FOR CODING AGENTS',
  },
  brand: {
    name: 'AURINOVA',
    company: '锦曜新宸科技',
    product: 'FormSy',
    description: 'Task Context & Evidence Platform',
  },
  announcement: {
    label: '让 Coding Agent 的工作有上下文，也有证据',
    href: '#platform',
  },
  navigation: [
    { label: '产品', href: '#platform' },
    { label: '工作方式', href: '#solutions' },
    { label: '架构', href: '#architecture' },
    { label: '能力', href: '#assets' },
  ] satisfies readonly LinkItem[],
  heroSlides: [
    {
      id: 'sovereign-intelligence',
      eyebrow: 'FROM TRACE TO ATTRIBUTABLE EVIDENCE',
      title: '让每一次工程决策有据可查\n让真实结果沉淀为知识',
      description:
        '把任务、上下文、决策、行动、验证与结果连成可追溯的证据链，为归因、复用和持续学习提供基础。',
      primaryCta: { label: '了解 FormSy', href: '#platform' },
      secondaryCta: { label: '查看工作方式', href: '#solutions' },
      visual: 'signal',
    },
    {
      id: 'context-to-weights',
      eyebrow: 'ASSOCIATION · ATTRIBUTION · EFFECT',
      title: '从过程关联，\n走向经过验证的效果',
      description:
        '区分证据、反馈、结果与效果，让归因候选经过对照后再成为可复用知识。',
      primaryCta: { label: '查看证据闭环', href: '#solutions' },
      secondaryCta: { label: '探索核心能力', href: '#assets' },
      visual: 'flywheel',
    },
  ] as const,
  ecosystem: [
    'Claude Code',
    'Codex',
    'Cursor',
    'TRAE',
    'OpenCode',
    'Git',
    'CI / CD',
    'Jira',
    'Pytest',
    'GitHub',
  ],
  manifesto: {
    eyebrow: 'FROM SOURCE TO VERIFIED RESULT',
    title: '把任务、代码与验证连成一条可检查的工程链路',
    description:
      'FormSy 不替代 Coding Agent。它负责组织任务上下文、源码证据、验收约束与执行回执，让 Agent 在原来的工作入口中更可靠地完成任务。',
  },
  platforms: [
    {
      index: '01',
      eyebrow: 'UNDERSTAND THE TASK',
      title: 'Context Compute',
      description:
        '围绕当前任务计算最相关的源码、关系、要求与未知项，让 Agent 从可核对的上下文开始。',
      bullets: [
        '任务定向的 CodeGraph 与源码探索',
        '任务来源、上下文与代码版本绑定',
        '上下文投影、分页读取与交付回执',
      ],
      href: '#architecture',
      tone: 'dark',
    },
    {
      index: '02',
      eyebrow: 'VERIFY THE RESULT',
      title: 'Causal Evidence & Learning',
      description:
        '把决定、行动、证据与结果组织为可归因结构，再从经过验证的效果中提炼可复用经验。',
      bullets: [
        'Evidence、Feedback、Outcome 与 Effect 分开记录',
        '过程关联、归因候选与对照支持分级表达',
        '因果证据图、经验候选与知识召回',
      ],
      href: '#architecture',
      tone: 'light',
    },
  ] satisfies readonly PlatformItem[],
  operatingLoop: {
    eyebrow: 'FROM TASK TO VERIFIED RESULT',
    title: '一条任务链，贯穿理解、实现与验证',
    description:
      '开放判断仍由 Agent 完成；FormSy 提供确定性的来源、版本、检查与证据边界。',
    steps: [
      { index: '01', label: '绑定任务', detail: 'Source · Revision' },
      { index: '02', label: '调查证据', detail: 'Code · Relation' },
      { index: '03', label: '编译检查', detail: 'Pytest · Review' },
      { index: '04', label: '实现验证', detail: 'Patch · Receipt' },
      { index: '05', label: '沉淀经验', detail: 'Episode · Recall' },
    ],
  },
  architecture: {
    eyebrow: 'SYSTEM ARCHITECTURE',
    title: 'FormSy 专注任务与证据，基础设施保持开放',
    description:
      'Agent 继续负责开放式调查与实现；FormSy Core 负责来源、版本、关系、验证与知识规则。模型、Gateway 与算力属于外层基础设施。',
    columns: [
      {
        index: '01',
        label: 'WORK ENTRY',
        title: 'Agent / IDE',
        items: ['Codex · Hermes', 'Claude Code · Cursor', 'Issue · Repo · CI'],
      },
      {
        index: '02',
        label: 'FORMSY CORE',
        title: 'Task Context',
        items: ['Task · Grounding', 'Context Publication', 'Source · Relation'],
      },
      {
        index: '03',
        label: 'FORMSY CORE',
        title: 'Evidence & Knowledge',
        items: [
          'Review · Verification',
          'Task Evidence Graph',
          'Guidance · Risk Recall',
        ],
      },
      {
        index: '04',
        label: 'AURINOVA HORIZON',
        title: 'AI Infrastructure',
        items: [
          'Workload Intelligence',
          'AI Gateway · BYOM',
          'BYOC · Inference Runtime',
        ],
      },
    ],
  },
  assets: {
    eyebrow: 'CAPABILITY MAP',
    title: '从源码探索，到可复用的任务知识',
    description:
      '这些能力共享同一条原则：结论必须能回到任务、源码、检查与实际执行。',
    items: [
      {
        code: 'EXPLORE',
        title: 'Task-aware Source Exploration',
        summary: '理解相关代码',
        description: '用任务中的线索定位符号、结构关系与经过核对的源码。',
        tags: ['CODEGRAPH', 'SOURCE'],
      },
      {
        code: 'CONTRACT',
        title: 'Task Compilation',
        summary: '把要求变成检查',
        description:
          '绑定任务来源、调查证据、编写 pytest、独立审查并冻结验收合同。',
        tags: ['PYTEST', 'REVIEW'],
      },
      {
        code: 'RELATION',
        title: 'Symbolic & Runtime Inquiry',
        summary: '检查关系与反例',
        description: '把关系、前提、局部观察与运行期探测组织成可复核的问题。',
        tags: ['RELATION', 'PROBE'],
      },
      {
        code: 'EPISODE',
        title: 'Task Evidence Graph',
        summary: '保留完整任务证据',
        description:
          '连接 Session、FormSy 产物、Git、测试与结果，不把相关性冒充因果。',
        tags: ['EVIDENCE', 'OUTCOME'],
      },
      {
        code: 'RECALL',
        title: 'Knowledge Pattern',
        summary: '把经验带回下一次任务',
        description:
          '只召回有适用范围与来源的指导；待复验内容作为风险单独呈现。',
        tags: ['GUIDANCE', 'RISK'],
      },
    ],
  },
  evidence: {
    eyebrow: 'EARLY VALIDATION',
    title: '同一模型与算力，完成更多经过验证的任务',
    description:
      '内部 SWE-bench Lite 实验观察到 Context Compute 对成本与任务完成表现的双向改善。结果用于产品验证，正式部署应按客户环境复测。',
    metrics: [
      {
        value: '−60%',
        label: '平均 Token 消耗',
        detail: 'GLM-5.1 · Indexed baseline 100 → 40',
      },
      {
        value: '+60%',
        label: '可通过 Case 数',
        detail: 'Qwen-class · Indexed baseline 100 → 160',
      },
      {
        value: '1×',
        label: '统一北极星指标',
        detail: 'Validated Engineering Tasks / GPU Dollar',
      },
    ],
  },
  solutions: {
    eyebrow: 'DESIGNED FOR ENTERPRISE CONTROL',
    title: '从一次交付，到持续复利的主权智能',
    items: [
      {
        index: '01',
        title: '更高任务完成率',
        description: '让上下文、完成标准和证据要求随任务一起进入执行闭环。',
      },
      {
        index: '02',
        title: '更低成功任务成本',
        description: '减少重复扫描、无效长上下文、错误循环与过早结束。',
      },
      {
        index: '03',
        title: '企业私有智能资产',
        description: 'Context、Eval、轨迹、策略与选择性模型增量均由企业掌握。',
      },
      {
        index: '04',
        title: '跨模型持续演进',
        description: '保留模型选择权，让学习闭环跨 Agent、跨模型长期积累。',
      },
    ],
  },
  resources: {
    eyebrow: 'PRODUCT NOTES',
    title: '深入了解 FormSy',
    items: [
      {
        meta: 'PRODUCT ARCHITECTURE · 10 CHAPTERS',
        title: '企业 Agent Context Platform 技术架构',
        description: '从 Runtime、Context Builder 到 AI Gateway 与推理运行层。',
        href: '#architecture',
        accent: 'blue',
      },
      {
        meta: 'CONTEXT COMPUTE · RESEARCH NOTE',
        title: '如何把任务反馈转化为可学习的因果切片',
        description: '理解 TOCS、ACF、ARCS 与 Policy 的演进关系。',
        href: '#assets',
        accent: 'gold',
      },
      {
        meta: 'ENTERPRISE AI · OPERATING MODEL',
        title: '从租用通用智能到拥有企业智能',
        description: '保留模型灵活性，同时建立企业自己的 Context 与 Eval。',
        href: '#solutions',
        accent: 'ink',
      },
    ],
  },
  cta: {
    eyebrow: 'BUILD WITH FORMSY',
    title: '从一个真实工程任务开始',
    description:
      '带上任务、代码库和验收要求，让 FormSy 组织上下文、验证与证据。',
    primary: { label: '了解工作方式', href: '#solutions' },
    secondary: { label: '查看核心能力', href: '#assets' },
  },
  footer: {
    groups: [
      {
        title: '产品',
        links: [
          { label: 'Context Compute', href: '#platform' },
          { label: 'Causal Evidence & Learning', href: '#platform' },
          { label: 'Capability Map', href: '#assets' },
        ],
      },
      {
        title: '架构',
        links: [
          { label: 'Agent / IDE', href: '#architecture' },
          { label: 'FormSy Core', href: '#architecture' },
          { label: 'AURINOVA Horizon', href: '#architecture' },
        ],
      },
      {
        title: '解决方案',
        links: [
          { label: '任务理解', href: '#solutions' },
          { label: '验证闭环', href: '#solutions' },
          { label: '经验复用', href: '#assets' },
        ],
      },
      {
        title: '资源',
        links: [
          { label: '产品说明', href: '#resources' },
          { label: '技术架构', href: '#resources' },
          { label: '能力地图', href: '#assets' },
        ],
      },
      {
        title: '公司',
        links: [
          { label: '锦曜新宸科技', href: '#top' },
          { label: 'AURINOVA', href: '#top' },
          { label: 'FormSy', href: '#platform' },
        ],
      },
    ],
  },
} as const;

export type SiteContentZh = typeof siteContentZh;
