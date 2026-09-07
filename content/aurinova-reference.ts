import { siteDictionaries } from './i18n';

// Paired copy keeps both locales and every navigation target aligned.
export function createAurinovaContent(locale: 'en-US' | 'zh-CN') {
  const t = (zh: string, en: string) => (locale === 'zh-CN' ? zh : en);
  const originalHero = siteDictionaries[locale].heroSlides;
  const home = '/aurinova-reference';
  const anchor = (id: string) => `${home}#${id}`;
  const link = (zh: string, en: string, id: string) => ({
    label: t(zh, en),
    href: anchor(id),
  });
  const productLinks = [
    {
      label: 'Coding Plan',
      href: '/aurinova-reference/coding-plan',
      description: t('模型、额度与编程工具接入', 'Models, quotas and coding-tool integrations'),
    },
    {
      ...link('FormSy 产品概览', 'FormSy overview', 'overview'),
      description: t(
        '连接上下文、Agent、验证与模型服务',
        'Connect context, agents, verification and model services',
      ),
    },
    {
      ...link('Context Compute', 'Context Compute', 'context-compute'),
      description: t(
        '计算任务所需的上下文、证据与完成标准',
        'Prepare context, evidence and completion criteria for each task',
      ),
    },
    {
      ...link(
        'Workload Intelligence',
        'Workload Intelligence',
        'workload-intelligence',
      ),
      description: t(
        '连接模型路由、推理运行与成功任务成本',
        'Connect routing and inference to cost per verified task',
      ),
    },
    {
      ...link('企业学习闭环', 'Enterprise learning loop', 'learning-loop'),
      description: t(
        '把任务反馈沉淀为可治理的经验资产',
        'Turn task feedback into governed, reusable experience',
      ),
    },
  ];
  const deployments = [
    {
      id: 'deployment-open',
      name: t('开放模型', 'Open models'),
      tag: t('模型选择', 'MODEL CHOICE'),
      description: t(
        '依据具体任务选择模型，通过评测确定适配范围。',
        'Choose models around real tasks and use evaluation to establish their fit.',
      ),
    },
    {
      id: 'deployment-hosted',
      name: t('托管模型 API', 'Hosted model APIs'),
      tag: t('外部服务', 'HOSTED SERVICES'),
      description: t(
        '结合企业的数据与网络要求，评估外部模型服务。',
        'Evaluate external model services against enterprise data and network requirements.',
      ),
    },
    {
      id: 'deployment-byom',
      name: t('自带模型 · BYOM', 'Bring your own model'),
      tag: t('企业资产', 'ENTERPRISE ASSETS'),
      description: t(
        '将企业已有模型纳入任务执行与验证流程。',
        'Bring existing enterprise models into task execution and verification.',
      ),
    },
    {
      id: 'deployment-byoc',
      name: t('自带算力 · BYOC', 'Bring your own compute'),
      tag: t('资源接入', 'YOUR COMPUTE'),
      description: t(
        '围绕已有云或算力资源，规划运行环境与服务边界。',
        'Plan the runtime and service boundaries around existing cloud or compute resources.',
      ),
    },
    {
      id: 'deployment-private',
      name: 'Enterprise Edge / VPC',
      tag: t('私有部署', 'PRIVATE DEPLOYMENT'),
      description: t(
        '在企业侧控制上下文、证据与访问边界。',
        'Control context, evidence and access boundaries on the enterprise side.',
      ),
    },
    {
      id: 'deployment-capacity',
      name: t('专属推理容量', 'Dedicated inference capacity'),
      tag: t('容量规划', 'CAPACITY PLANNING'),
      description: t(
        '根据并发、时延和成本目标，评估模型运行与容量方案。',
        'Assess inference capacity against concurrency, latency and cost targets.',
      ),
    },
  ];
  const scenarios = [
    {
      id: 'solution-coding',
      title: t('AI 软件工程', 'AI software engineering'),
      audience: t('研发团队 · CODE PLAN', 'ENGINEERING TEAMS · CODE PLAN'),
      problem: t(
        '让 AI 编程产出有清晰的验收标准。',
        'Give AI coding work clear acceptance criteria.',
      ),
      delivery: t(
        '连接 Issue、代码库、测试与 CI，形成补丁、完成状态与证据报告。',
        'Connect issues, repositories, tests and CI to produce patches, completion status and evidence reports.',
      ),
      evaluation: t(
        '任务通过率 · 验收耗时 · 成功任务成本',
        'Task pass rate · Review time · Cost per verified task',
      ),
    },
    {
      id: 'solution-private',
      title: t('企业私有 Agent 平台', 'Private enterprise agent platform'),
      audience: t('企业技术与平台团队', 'ENTERPRISE PLATFORM TEAMS'),
      problem: t(
        '掌握私有知识、权限与执行过程。',
        'Keep private knowledge, permissions and execution under control.',
      ),
      delivery: t(
        '规划企业 Edge、上下文治理、任务验证与审计链。',
        'Plan enterprise edge deployment, context governance, task verification and audit trails.',
      ),
      evaluation: t(
        '权限边界 · 证据完整性 · 业务任务验收',
        'Access boundaries · Evidence completeness · Task acceptance',
      ),
    },
    {
      id: 'solution-inference',
      title: t('推理与工作负载优化', 'Inference & workload optimization'),
      audience: t('AI 与基础设施团队', 'AI & INFRASTRUCTURE TEAMS'),
      problem: t(
        '协调模型质量、运行容量和端到端费用。',
        'Balance model quality, capacity and end-to-end cost.',
      ),
      delivery: t(
        '围绕 AI Gateway、任务路由与推理运行层制定方案。',
        'Design a solution around the AI gateway, task routing and inference runtime.',
      ),
      evaluation: t(
        '时延 · 吞吐 · 端到端任务成本',
        'Latency · Throughput · End-to-end task cost',
      ),
    },
    {
      id: 'solution-partners',
      title: t('主权 AI 产业节点', 'Sovereign AI service nodes'),
      audience: t('算力、园区与产业伙伴', 'COMPUTE & INDUSTRY PARTNERS'),
      problem: t(
        '连接产业场景、共研中试与服务交付。',
        'Connect industry use cases, joint pilots and service delivery.',
      ),
      delivery: t(
        '规划服务节点、共研机制与产业协同的阶段交付。',
        'Plan service nodes, joint development and phased industry delivery.',
      ),
      evaluation: t(
        '按合作项目约定阶段目标与验收',
        'Milestones and acceptance agreed for each engagement',
      ),
    },
  ];
  const resources = [
    {
      id: 'resource-architecture',
      type: t('产品架构', 'PRODUCT ARCHITECTURE'),
      title: t('FormSy 产品技术架构', 'The FormSy product architecture'),
      description: t(
        '企业 Edge、上下文平台与推理运行层如何协作。',
        'How the enterprise edge, context platform and inference runtime work together.',
      ),
      body: t(
        'Agent 与企业系统沿用原有工作入口。Context Platform 维护任务状态、证据与完成标准；AI Gateway 和工作负载调度连接模型服务；推理运行层管理模型与算力。部署时按数据、权限和网络条件确定各层边界。',
        'Agents and enterprise systems retain their existing entry points. The context platform maintains task state, evidence and completion criteria. The AI gateway and workload scheduler connect model services, while the inference runtime manages models and compute. Data, access and network requirements determine each deployment boundary.',
      ),
      visual: [
        'AGENT / IDE',
        'CONTEXT PLATFORM',
        'AI RUNTIME',
        'MODELS & COMPUTE',
      ],
    },
    {
      id: 'resource-learning',
      type: t('学习资产', 'LEARNING ASSETS'),
      title: t(
        '从任务反馈到企业学习资产',
        'From task feedback to enterprise assets',
      ),
      description: t(
        '让上下文、评测与有效经验跨任务积累。',
        'Accumulate context, evaluation and useful experience across tasks.',
      ),
      body: t(
        'TOCS 维护当前任务状态，ACF 收集执行反馈，ARCS 从历史任务提炼关键决策与结果关系。经验经过来源、权限、版本和评测治理，再进入 Policy、Skill 或 Verifier。适合训练的专业能力在评测后选择性进入模型适配流程。',
        'TOCS maintains current task state; ACF captures execution feedback; ARCS relates important decisions to outcomes in past runs. Experience is governed through provenance, permissions, versions and evaluation before becoming a policy, skill or verifier. Suitable capabilities may then enter model adaptation after evaluation.',
      ),
      visual: [
        'CONTEXT',
        'EVAL & FEEDBACK',
        'POLICY / SKILL',
        'MODEL ADAPTATION',
      ],
    },
    {
      id: 'resource-evaluation',
      type: t('评估方法', 'EVALUATION METHOD'),
      title: t('如何衡量成功任务成本', 'Measuring cost per verified task'),
      description: t(
        '把验证、重试和算力开销纳入同一评估。',
        'Include verification, retries and compute in the same evaluation.',
      ),
      body: t(
        '先约定任务集、基线和完成标准，再记录模型调用、算力、验证及失败重试的成本。用总成本除以通过验收的任务数，并同时报告完成率、时延和证据完整性。对比实验应保持任务与环境口径一致，记录重复运行的差异。',
        'Agree on a task set, baseline and acceptance criteria. Record model calls, compute, verification and failed retries. Divide total cost by accepted tasks, and report completion rate, latency and evidence completeness alongside it. Comparisons should use consistent tasks and environments and capture variation across repeated runs.',
      ),
      visual: [
        'TASK CONTRACT',
        'EXECUTION + RETRIES',
        'VERIFIED TASKS',
        'COST / RESULT',
      ],
    },
  ];
  const learningSteps = [
    [t('定义完成标准', 'Define acceptance'), 'EVAL CONTRACT'],
    [t('计算任务上下文', 'Prepare context'), 'CONTEXT PACKET'],
    [t('Agent 执行', 'Agent execution'), 'PLAN · TOOL · PATCH'],
    [t('验证与反馈', 'Verify & learn'), 'EVIDENCE · FINISH GATE'],
    [t('沉淀可复用资产', 'Retain useful assets'), 'POLICY · SKILL'],
  ];
  const plans = [
    {
      id: 'pilot',
      title: t('试点验证', 'Pilot evaluation'),
      description: t(
        '从代表性任务开始，共同约定评估与验收范围。',
        'Start with representative tasks and agree on evaluation and acceptance.',
      ),
      items: [
        t('代表任务与数据范围', 'Representative tasks and data scope'),
        t('评测基线与验收标准', 'Evaluation baseline and acceptance criteria'),
        t('环境要求与试点周期', 'Environment requirements and pilot duration'),
      ],
      pricing: t(
        '根据验证范围评估，确认后报价。',
        'Quoted after the evaluation scope is agreed.',
      ),
    },
    {
      id: 'enterprise',
      title: t('企业部署', 'Enterprise deployment'),
      description: t(
        '围绕私有环境、持续工作负载与扩展需求规划交付。',
        'Plan delivery around private environments, ongoing workloads and growth.',
      ),
      items: [
        t(
          'Edge / VPC 与模型、算力边界',
          'Edge / VPC, model and compute boundaries',
        ),
        t('平台能力与容量规划', 'Platform capabilities and capacity planning'),
        t(
          '运维支持与交付责任',
          'Operational support and delivery responsibilities',
        ),
      ],
      pricing: t(
        '按平台、容量、工作负载与服务范围商议。',
        'Discuss platform, capacity, workload and service components.',
      ),
    },
    {
      id: 'partners',
      title: t('OEM 与产业合作', 'OEM & industry partnerships'),
      description: t(
        '通过产品集成、授权与联合交付连接产业场景。',
        'Connect industry use cases through integration, licensing and joint delivery.',
      ),
      items: [
        t('核心版本与产品授权范围', 'Core version and licensing scope'),
        t('合作方分工与联合交付', 'Partner roles and joint delivery'),
        t('升级机制与阶段验收', 'Upgrade process and milestone acceptance'),
      ],
      pricing: t(
        '按授权及合作范围商议。',
        'Discuss terms based on licensing and partnership scope.',
      ),
    },
  ];
  const navigation = [
    {
      label: t('产品', 'Product'),
      href: anchor('platform'),
      menuKey: 'Product' as const,
    },
    {
      label: t('解决方案', 'Solutions'),
      href: anchor('solutions'),
      menuKey: 'Solutions' as const,
    },
    {
      label: t('模型与部署', 'Models & deployment'),
      href: anchor('models-deployment'),
      menuKey: 'Models' as const,
    },
    { label: t('方案与定价', 'Plans & pricing'), href: `${home}/pricing` },
    {
      label: t('资源', 'Resources'),
      href: anchor('resources'),
      menuKey: 'Resources' as const,
    },
  ];
  const footer = [
    {
      title: t('产品', 'Product'),
      links: productLinks.map((x) => [x.label, x.href] as const),
    },
    {
      title: t('模型与部署', 'Models & deployment'),
      links: deployments
        .slice(0, 5)
        .map((x) => [x.name, anchor(x.id)] as const),
    },
    {
      title: t('解决方案', 'Solutions'),
      links: scenarios.map((x) => [x.title, anchor(x.id)] as const),
    },
    {
      title: t('资源', 'Resources'),
      links: resources.map((x) => [x.title, anchor(x.id)] as const),
    },
    {
      title: t('公司与合作', 'Company'),
      links: [
        [t('关于 AURINOVA', 'About AURINOVA'), anchor('about')],
        [t('合作方式', 'Engagement options'), anchor('engagement')],
        [t('试点流程', 'Pilot process'), anchor('pilot-process')],
      ],
    },
  ];
  return {
    meta: {
      headerLogo: '/aurinova-logo.svg',
      footerLogo: '/aurinova-logo.svg',
      contactHref: anchor('engagement'),
    },
    ui: {
      pageTitle: t(
        'AURINOVA · FormSy 企业智能平台',
        'AURINOVA · FormSy enterprise intelligence',
      ),
      pageDescription: t(
        'FormSy 连接企业知识、Agent 与模型服务，让软件工程任务可验证，让执行经验沉淀为企业智能资产。',
        'FormSy connects enterprise knowledge, agents and model services to make engineering tasks verifiable and retain useful experience.',
      ),
      switchLanguage: t('切换到英文', 'Switch to Chinese'),
      alternateLocaleName: t('EN', '中文'),
      homeLabel: t('AURINOVA 首页', 'AURINOVA home'),
      skipToContent: t('跳转到主要内容', 'Skip to main content'),
      announcementLabel: t('产品公告', 'Product announcement'),
      navigationLabel: t('主导航', 'Main navigation'),
      login: t('登录', 'Log in'),
      signup: t('注册', 'Sign up'),
      getStarted: t('查看合作方式', 'Explore engagement'),
      openNavigation: t('打开导航', 'Open navigation'),
      closeNavigation: t('关闭导航', 'Close navigation'),
      mobileLinks: [
        { label: t('控制台演示', 'Console demo'), href: '/demo/console/usage' },
        { label: t('登录', 'Log in'), href: '/aurinova-reference/login' },
        { label: t('注册', 'Sign up'), href: '/aurinova-reference/signup' },
        ...navigation,
        ...productLinks,
        ...scenarios.map((x) => ({ label: x.title, href: anchor(x.id) })),
        ...deployments.map((x) => ({ label: x.name, href: anchor(x.id) })),
        ...resources.map((x) => ({ label: x.title, href: anchor(x.id) })),
      ],
      useCases: t('使用场景', 'USE CASES'),
      resources: t('产品资料', 'Resources'),
      company: t('公司与合作', 'Company & partnerships'),
      companyDescription: t(
        '了解 AURINOVA，探索试点、部署与合作方式。',
        'Explore AURINOVA, pilot evaluation, deployment and partnerships.',
      ),
      featuredResources: t('精选资料', 'Featured resources'),
      copyright: t('© 2026 AURINOVA · 锦曜新宸科技', '© 2026 AURINOVA'),
      currentSite: t('技术架构', 'Technical architecture'),
      officialSource: t('合作方式', 'Engagement options'),
      previous: t('上一组', 'Previous cards'),
      next: t('下一组', 'Next cards'),
      heroSlides: t('首屏轮播', 'Hero slides'),
      showTaskSlide: t('显示任务价值', 'Show task value'),
      showLearningSlide: t('显示学习闭环', 'Show learning loop'),
      concept: t('概念示意', 'CONCEPT ILLUSTRATION'),
      ecosystem: t('工具与基础设施生态', 'Tools and infrastructure ecosystem'),
      evaluation: t('评估方式', 'EVALUATION'),
      delivery: t('交付方向', 'DELIVERY SCOPE'),
      readMore: t('阅读摘要', 'Read summary'),
    },
    announcement: {
      label: t(
        '了解 FormSy：从任务上下文到企业智能资产',
        'Explore FormSy: from task context to enterprise intelligence',
      ),
      href: anchor('overview'),
    },
    navigation,
    megaMenus: {
      Product: {
        kind: 'product' as const,
        links: productLinks,
        feature: {
          label: 'FORMSY',
          title: t(
            '从 Issue 到经过验证的工程结果',
            'From issue to verified engineering result',
          ),
          detail: 'ISSUE → CONTEXT → AGENT → VERIFICATION → ASSETS',
          href: anchor('overview'),
        },
      },
      Solutions: {
        kind: 'solutions' as const,
        audiences: [
          link(
            '研发与 AI 原生团队',
            'Engineering & AI-native teams',
            'solution-coding',
          ),
          link(
            '企业技术与平台团队',
            'Enterprise platform teams',
            'solution-private',
          ),
          link(
            '算力与产业合作伙伴',
            'Compute & industry partners',
            'solution-partners',
          ),
        ],
        cases: scenarios.map((x) => ({ label: x.title, href: anchor(x.id) })),
      },
      Models: {
        kind: 'models' as const,
        library: { label: t('模型库与接入', 'MODEL LIBRARY & ACCESS'), href: '/aurinova-reference/models' },
        items: deployments.map((x) => ({ id: x.id, label: x.name, href: anchor(x.id) })),
      },
      Resources: {
        kind: 'resources' as const,
        intro: t(
          '从架构、学习资产与评估方法深入了解 FormSy。',
          'Explore FormSy through architecture, learning assets and evaluation.',
        ),
        resources: resources.map((x) => ({
          label: x.title,
          href: anchor(x.id),
        })),
        company: [
          link('关于 AURINOVA', 'About AURINOVA', 'about'),
          link('合作方式', 'Engagement options', 'engagement'),
          link('试点流程', 'Pilot process', 'pilot-process'),
        ],
        featured: [resources[0], resources[2]].map((x) => ({
          type: x.type,
          title: x.title,
          href: anchor(x.id),
        })),
      },
    },
    hero: {
      eyebrow: originalHero[0].eyebrow,
      lines: originalHero[0].title.split('\n'),
      title: originalHero[0].title.replace('\n', locale === 'en-US' ? ' ' : ''),
      description: originalHero[0].description,
      primary: {
        label: originalHero[0].primaryCta.label,
        href: anchor('platform'),
      },
      secondary: {
        label: originalHero[0].secondaryCta.label,
        href: anchor('resource-architecture'),
      },
    },
    secondHero: {
      eyebrow: originalHero[1].eyebrow,
      lines: originalHero[1].title.split('\n'),
      title: originalHero[1].title.replace('\n', locale === 'en-US' ? ' ' : ''),
      description: originalHero[1].description,
      primary: {
        label: originalHero[1].primaryCta.label,
        href: anchor('learning-loop'),
      },
      secondary: {
        label: originalHero[1].secondaryCta.label,
        href: anchor('evaluation'),
      },
    },
    banners: {
      outcome: t(
        '更高任务完成率，更低成功任务成本',
        'Higher task success. Lower cost per verified task.',
      ),
      learning: t(
        '每一次真实工作，沉淀为企业智能资产',
        'Turn real work into enterprise intelligence assets.',
      ),
      outcomeAlt: t(
        '同一画布中的蓝金像素柱图：蓝色任务完成率逐步上升，金色成功任务成本逐步下降；下方连接上下文、执行和验证。',
        'One combined pixel chart pairs rising blue task success bars with falling gold cost-per-verified-task bars, supported by context, execution and verification.',
      ),
      learningAlt: t(
        '企业智能资产位于中心，Context、Eval、Trace、Policy 与选择性的 Weights 适配构成五阶段学习闭环。',
        'Enterprise intelligence sits at the center of a five-stage loop: Context, Eval, Trace, Policy and selective Weights adaptation.',
      ),
    },
    chart: {
      caption: t('概念示意 · 非实测数据', 'Illustration · not measured data'),
    },
    ecosystem: {
      title: t(
        '连接现有工具与基础设施',
        'Connect existing tools and infrastructure',
      ),
      note: t(
        '架构接入示例；具体适配范围按项目确认。',
        'Architecture integration examples; compatibility is confirmed for each project.',
      ),
      items: [
        'Claude Code',
        'Codex',
        'Cursor',
        'TRAE',
        'OpenCode',
        'Git',
        'CI / CD',
        'Jira',
        'Kubernetes',
        'SGLang',
      ],
    },
    overview: {
      eyebrow: 'FROM ISSUE TO VERIFIED RESULT',
      title: t(
        '把一个工程任务，组织成可执行、可验证的工作流',
        'Give every engineering task an executable, verifiable workflow',
      ),
      description: t(
        'FormSy 位于 Agent、模型与企业系统之间，把任务目标、上下文和验证要求连接起来，并保留过程证据。',
        'FormSy connects agents, models and enterprise systems with task goals, context and verification requirements, retaining evidence along the way.',
      ),
      steps: [
        t(
          '输入：Issue、Repo、Tests 与工程规范',
          'INPUT: Issues, repositories, tests and engineering standards',
        ),
        t(
          '过程：上下文、执行状态与完成门槛',
          'CONTROL: Context, execution state and completion gates',
        ),
        t(
          '输出：补丁、完成状态与证据报告',
          'OUTPUT: Patches, completion status and evidence reports',
        ),
      ],
      architecture: [
        'AGENT / IDE',
        'CONTEXT PLATFORM',
        'AI RUNTIME',
        'MODELS & COMPUTE',
      ],
      footnote: t(
        '企业 Edge 管理上下文与任务，推理运行层连接模型和算力。',
        'The enterprise edge manages context and tasks; the inference runtime connects models and compute.',
      ),
    },
    platform: {
      eyebrow: 'TWO CONNECTED CAPABILITIES',
      title: t(
        '上下文与算力，共同服务于有效工程产出',
        'Context and compute, aligned with useful engineering work',
      ),
      description: t(
        '以 Context Compute 提升模型的有效智能，以 Workload Intelligence 管理每个成功任务的资源开销。',
        'Improve effective model intelligence through Context Compute and manage resources per verified task through Workload Intelligence.',
      ),
      pillars: [
        {
          id: 'context-compute',
          index: '01',
          audience: 'ENTERPRISE CONTEXT',
          name: 'Context Compute',
          description: t(
            '为任务组织可行动、可验证的上下文。',
            'Organize actionable, verifiable context for each task.',
          ),
          modes: [
            t(
              'Runtime：维护任务状态、证据与下一步动作',
              'Runtime: maintain task state, evidence and next actions',
            ),
            t(
              'Builder：接入代码、文档、CI 与执行轨迹',
              'Builder: connect code, documentation, CI and execution traces',
            ),
            t(
              'Warehouse：治理记忆、规范、技能与策略',
              'Warehouse: govern memory, contracts, skills and policies',
            ),
          ],
          primary: link('查看任务工作流', 'Explore the workflow', 'overview'),
          secondary: link('了解学习闭环', 'Learning loop', 'learning-loop'),
        },
        {
          id: 'workload-intelligence',
          index: '02',
          audience: 'TASK-AWARE INFRASTRUCTURE',
          name: 'Workload Intelligence',
          description: t(
            '将模型与算力调度连接到任务结果。',
            'Connect model and compute scheduling to task outcomes.',
          ),
          modes: [
            t(
              '任务路由：选择模型、容量与上下文策略',
              'Task routing: select models, capacity and context strategies',
            ),
            t(
              'AI Gateway：组织鉴权、配额、计费与可观测性',
              'AI Gateway: organize authentication, quotas, billing and observability',
            ),
            t(
              'Inference Runtime：管理模型生命周期与弹性推理',
              'Inference Runtime: manage model lifecycle and elastic inference',
            ),
          ],
          primary: link(
            '查看部署选择',
            'Explore deployment',
            'models-deployment',
          ),
          secondary: link('查看合作方式', 'Engagement options', 'engagement'),
        },
      ],
    },
    learning: {
      eyebrow: 'THE ENTERPRISE LEARNING LOOP',
      title: t(
        '任务结束，经验继续积累',
        'The task ends. Experience keeps growing.',
      ),
      description: t(
        '动态知识留在上下文，稳定流程进入策略与技能。可重复、可评测的专业能力，再选择性进入模型适配流程。',
        'Keep dynamic knowledge in context and stable workflows in policies and skills. Repeatable, measurable capabilities may then enter model adaptation.',
      ),
      steps: learningSteps,
    },
    models: {
      eyebrow: 'MODEL CHOICE · DEPLOYMENT CONTROL',
      title: t(
        '保留模型选择权，适配企业部署边界',
        'Choose your models. Define your deployment boundaries.',
      ),
      description: t(
        '围绕任务需求、数据边界与已有基础设施，规划模型接入、上下文控制和推理运行方式。',
        'Plan model access, context control and inference around tasks, data boundaries and existing infrastructure.',
      ),
      items: deployments,
    },
    scenarios: {
      eyebrow: 'REAL WORKLOADS, CLEAR OUTCOMES',
      title: t(
        '从真实工作负载开始，建立企业 AI 能力',
        'Build enterprise AI around real workloads',
      ),
      items: scenarios,
    },
    evaluation: {
      eyebrow: 'MEASURE WHAT GETS DONE',
      title: t(
        '用经过验证的任务，衡量 AI 的有效产出',
        'Measure AI by the work that passes verification',
      ),
      description: t(
        '先约定任务、基线与完成标准，再评估结果和成本。',
        'Agree on tasks, a baseline and acceptance criteria, then evaluate outcomes and cost.',
      ),
      items: [
        {
          title: t('任务完成率', 'Task completion rate'),
          body: t(
            '约定任务集中，通过验收的任务比例。',
            'The proportion of agreed tasks that meet acceptance criteria.',
          ),
        },
        {
          title: t('成功任务成本', 'Cost per verified task'),
          body: t(
            '纳入模型、算力、验证与失败重试的总成本。',
            'Account for models, compute, verification and failed retries.',
          ),
        },
        {
          title: t('证据完整性', 'Evidence completeness'),
          body: t(
            '结论、测试与过程记录可以追溯和复核。',
            'Trace and review conclusions, tests and execution records.',
          ),
        },
      ],
      link: link(
        '阅读评估方法',
        'Read the evaluation method',
        'resource-evaluation',
      ),
    },
    resources: {
      eyebrow: 'PRODUCT NOTES',
      title: t('深入了解 FormSy 的工作方式', 'Inside the FormSy workflow'),
      items: resources,
    },
    engagement: {
      title: t(
        '从一个真实任务，开始构建企业智能闭环',
        'Start with one real task. Build an enterprise learning loop.',
      ),
      description: t(
        '围绕代码库、工作负载与部署要求，共同定义验证目标和交付范围。',
        'Define evaluation goals and delivery scope around your repositories, workloads and deployment requirements.',
      ),
      plans,
      primary: link(
        '了解试点流程',
        'Explore the pilot process',
        'pilot-process',
      ),
      secondary: {
        label: t('比较合作方案', 'Compare engagement options'),
        href: `${home}/pricing`,
      },
      processTitle: t('试点如何开始', 'How a pilot starts'),
      process: [
        t('梳理代表任务', 'Select representative tasks'),
        t('约定验收标准', 'Agree on acceptance criteria'),
        t('评估部署环境', 'Assess the deployment environment'),
        t('确定交付范围', 'Define the delivery scope'),
      ],
    },
    about: {
      title: t('关于 AURINOVA', 'About AURINOVA'),
      description: t(
        'AURINOVA 聚焦企业 AI 的上下文、运行与持续学习能力，通过 FormSy 连接真实工作与企业智能资产。',
        'AURINOVA focuses on context, runtime and continuous learning for enterprise AI. FormSy connects real work to enterprise intelligence assets.',
      ),
    },
    footer,
  };
}

export const aurinovaReferenceContent = createAurinovaContent('en-US');
