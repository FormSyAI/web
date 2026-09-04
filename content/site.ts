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

export const siteContent = {
  brand: {
    name: 'AURINOVA',
    company: '锦曜新宸科技',
    product: 'FormSy',
    description: 'Enterprise Agent Context Platform',
  },
  announcement: {
    label: 'FormSy 企业主权 AI 基础设施',
    href: '#platform',
  },
  navigation: [
    { label: '产品', href: '#platform' },
    { label: '解决方案', href: '#solutions' },
    { label: '架构', href: '#architecture' },
    { label: '资源', href: '#resources' },
  ] satisfies readonly LinkItem[],
  heroSlides: [
    {
      id: 'sovereign-intelligence',
      eyebrow: 'OWN YOUR ENTERPRISE INTELLIGENCE',
      title: '使用最强通用模型，\n拥有自己的企业智能',
      description:
        '把代码、文档、测试、工具输出与执行反馈，编译成 Agent 可使用、可验证、可审计的任务上下文。',
      primaryCta: { label: '探索产品能力', href: '#platform' },
      secondaryCta: { label: '查看技术架构', href: '#architecture' },
      visual: 'signal',
    },
    {
      id: 'context-to-weights',
      eyebrow: 'CONTEXT TO WEIGHTS',
      title: '让每一次真实工作，\n成为企业自己的智能',
      description:
        '动态知识留在 Context，稳定规则进入 Policy，可重复、可评测的专业能力持续沉淀为企业私有资产。',
      primaryCta: { label: '了解学习闭环', href: '#solutions' },
      secondaryCta: { label: '查看验证结果', href: '#evidence' },
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
    'SGLang',
    'Kubernetes',
  ],
  manifesto: {
    eyebrow: 'BUILD YOUR INTELLIGENCE FRONTIER',
    title: '面向可信结果的企业 AI 软件工厂运行层',
    description:
      'FormSy 位于通用模型、Agent 与企业系统之间，以 Context Compute 提升模型的有效智能，以 Workload Intelligence 提升每单位算力的有效工程产出。',
  },
  platforms: [
    {
      index: '01',
      eyebrow: 'ENTERPRISE EDGE',
      title: 'Context Compute',
      description:
        '在企业边界内计算任务状态、证据、完成标准与恢复路径，让 Agent 每一步都基于最小充分上下文行动。',
      bullets: [
        'Runtime：构建 TOCS，返回 Context Packet 与风险提示',
        'Builder：接入 Repo、Docs、CI 与 Trace，生成学习样本',
        'Warehouse：治理 Evidence、Memory、Contract、Skill 与 Policy',
      ],
      href: '#architecture',
      tone: 'dark',
    },
    {
      index: '02',
      eyebrow: 'INFERENCE SOFTWARE LAYER',
      title: 'Workload Intelligence',
      description:
        '从模型 API 代理升级为任务级 Agent API Plane，把模型、缓存、验证与算力调度统一到成功任务成本。',
      bullets: [
        '任务级路由：依据工作负载选择模型、容量与上下文策略',
        'AI Gateway：统一鉴权、配额、计费与可观测性',
        'Runtime：Kubernetes + SGLang 弹性推理与生命周期管理',
      ],
      href: '#architecture',
      tone: 'light',
    },
  ] satisfies readonly PlatformItem[],
  operatingLoop: {
    eyebrow: 'FROM TASK TO COMPOUNDING INTELLIGENCE',
    title: '真实任务形成企业私有学习闭环',
    description:
      '以 Eval Contract 定义完成标准，按任务计算上下文与证据，执行中持续验证，完成后把有效经验沉淀为可治理资产。',
    steps: [
      { index: '01', label: '定义目标', detail: 'Eval Contract' },
      { index: '02', label: '计算上下文', detail: 'Context Packet' },
      { index: '03', label: 'Agent 执行', detail: 'Plan · Tool · Patch' },
      { index: '04', label: '验证结果', detail: 'Evidence · Finish Gate' },
      { index: '05', label: '沉淀学习', detail: 'Policy · Skill · Weights' },
    ],
  },
  architecture: {
    eyebrow: 'SYSTEM ARCHITECTURE',
    title: '企业 Edge 控制任务，智算中心运行模型',
    description:
      '外部 Agent 与企业系统保持原有入口。FormSy 连接任务状态、模型路由与算力调度，形成清晰、可部署的服务边界。',
    columns: [
      {
        index: '01',
        label: 'EXTERNAL AGENTS',
        title: 'Agent / IDE',
        items: ['Claude Code', 'Codex · Cursor', 'TRAE · OpenCode'],
      },
      {
        index: '02',
        label: 'ENTERPRISE EDGE',
        title: 'Context Platform',
        items: [
          'FormSy Runtime',
          'Context Builder',
          'Warehouse · Evolving Model',
        ],
      },
      {
        index: '03',
        label: 'INFERENCE LAYER',
        title: 'AI Runtime',
        items: ['AI Gateway', 'Workload Scheduler', 'Kubernetes + SGLang'],
      },
      {
        index: '04',
        label: 'COMPUTE SUPPLY',
        title: 'Models & GPUs',
        items: ['Open · Hosted Models', 'GPU / NPU', 'Network · Data Center'],
      },
    ],
  },
  assets: {
    eyebrow: 'SOVEREIGN ASSET LIBRARY',
    title: '让上下文从一次性输入，演进为可复用资产',
    description:
      '每类资产都有来源、权限、版本与审计信息，并沿 Candidate、Accepted、Promoted 流程持续治理。',
    items: [
      {
        code: 'TOCS',
        title: 'Task-Oriented Context State',
        summary: '控制当前任务',
        description: '跟踪目标、假设、证据、风险、验证意图与下一步动作。',
        tags: ['ONLINE', 'TASK STATE'],
      },
      {
        code: 'ACF',
        title: 'Agent Context Feedback',
        summary: '收集任务反馈',
        description: '保留正向、纠错、负向和对比反馈，形成完整任务观测。',
        tags: ['FEEDBACK', 'EVIDENCE'],
      },
      {
        code: 'ARCS',
        title: 'Agent-Run Causal Slice',
        summary: '学习历史任务',
        description: '从历史 Run 重建关键上下文选择、决策、结果与因果关系。',
        tags: ['CAUSAL', 'LEARNING'],
      },
      {
        code: 'POLICY',
        title: 'Policy / Skill / Verifier',
        summary: '复用有效经验',
        description: '把稳定流程、验证规则与恢复策略沉淀为下一次任务的能力。',
        tags: ['GOVERNED', 'REUSABLE'],
      },
      {
        code: 'TRACE',
        title: 'Evidence & Trace',
        summary: '保留证据链',
        description: '记录每个结论的来源、工具输出、测试结果与审批状态。',
        tags: ['AUDIT', 'PROVENANCE'],
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
    title: '开始构建企业自己的智能闭环',
    description:
      '从一个可验证的软件工程工作负载开始，连接现有 Agent、模型与企业系统。',
    primary: { label: '查看产品架构', href: '#architecture' },
    secondary: { label: '了解核心能力', href: '#platform' },
  },
  footer: {
    groups: [
      {
        title: '产品',
        links: [
          { label: 'Context Compute', href: '#platform' },
          { label: 'Workload Intelligence', href: '#platform' },
          { label: 'Sovereign Warehouse', href: '#assets' },
        ],
      },
      {
        title: '架构',
        links: [
          { label: 'Enterprise Edge', href: '#architecture' },
          { label: 'AI Gateway', href: '#architecture' },
          { label: 'Inference Runtime', href: '#architecture' },
        ],
      },
      {
        title: '解决方案',
        links: [
          { label: 'AI Software Factory', href: '#solutions' },
          { label: 'Developer Productivity', href: '#solutions' },
          { label: 'Sovereign AI', href: '#solutions' },
        ],
      },
      {
        title: '资源',
        links: [
          { label: '产品说明', href: '#resources' },
          { label: '技术架构', href: '#resources' },
          { label: '验证结果', href: '#evidence' },
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

export type SiteContent = typeof siteContent;
