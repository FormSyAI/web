export const siteContentEn = {
  ui: {
    pageTitle: 'AURINOVA · FormSy Enterprise Agent Context Platform',
    pageDescription:
      'Turn enterprise knowledge, tool output, execution traces, and verification signals into actionable, verifiable, and auditable task context.',
    localeName: 'EN',
    alternateLocaleName: '中文',
    switchLanguage: '切换到中文',
    skipToContent: 'Skip to main content',
    homeLabel: 'AURINOVA home',
    navigationLabel: 'Primary navigation',
    mobileNavigationLabel: 'Mobile navigation',
    openMenu: 'Open navigation menu',
    docs: 'Docs',
    startBuilding: 'Start building',
    viewArchitecture: 'View architecture',
    viewProductArchitecture: 'View product architecture',
    ecosystemLabel: 'Compatible ecosystem',
    productClaimLabel: 'FormSy product vision',
    heroPaginationLabel: 'Change hero slide',
    showSlide: 'Show slide {index}',
    signalLabel: 'Task success and successful-task cost illustration',
    signalSuccess: 'Task success',
    signalCost: 'Cost per successful task',
    flywheelLabel: 'Context-to-Weights enterprise learning loop',
    controlPanelLabel: 'FormSy task control panel illustration',
    controlRows: [
      ['TASK', 'fix/payment-timeout'],
      ['CONTEXT', '24 evidence refs'],
      ['MODEL', 'routed · qwen-class'],
      ['GATE', '6 / 6 checks passed'],
    ],
    live: 'LIVE',
    evidenceComplete: 'EVIDENCE COMPLETE',
    validatedResult: 'VALIDATED RESULT',
    manifestoQuote:
      '“Turn every Agent Run into a controllable, verifiable, and reusable enterprise Workflow Episode.”',
    manifestoSignature: 'CONTEXT COMPUTE PLATFORM',
    architectureFootnotes: [
      'TRACE / EVIDENCE / FEEDBACK',
      'MODEL REQUEST / SCHEDULING SIGNAL',
    ],
    governancePath: 'View governance path',
    exploreCapabilities: 'Explore all capabilities',
    assetCarouselLabel: 'Enterprise sovereign context assets',
    footerTagline: 'ENTERPRISE SOVEREIGN AI INFRASTRUCTURE',
  },
  brand: {
    name: 'AURINOVA',
    company: 'Aurinova Technology',
    product: 'FormSy',
    description: 'Enterprise Agent Context Platform',
  },
  announcement: {
    label: 'FormSy sovereign AI infrastructure for enterprises',
    href: '#platform',
  },
  navigation: [
    { label: 'Product', href: '#platform' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Resources', href: '#resources' },
  ],
  heroSlides: [
    {
      id: 'sovereign-intelligence',
      eyebrow: 'OWN YOUR ENTERPRISE INTELLIGENCE',
      title:
        'Use the strongest foundation models.\nOwn your enterprise intelligence.',
      description:
        'Compile code, documentation, tests, tool output, and execution feedback into task context that agents can act on, verify, and audit.',
      primaryCta: { label: 'Explore capabilities', href: '#platform' },
      secondaryCta: { label: 'View architecture', href: '#architecture' },
      visual: 'signal',
    },
    {
      id: 'context-to-weights',
      eyebrow: 'CONTEXT TO WEIGHTS',
      title: 'Turn every real task\ninto intelligence you own.',
      description:
        'Keep dynamic knowledge in Context, promote stable rules into Policy, and compound repeatable, measurable expertise into private enterprise assets.',
      primaryCta: { label: 'Explore the learning loop', href: '#solutions' },
      secondaryCta: { label: 'View validation results', href: '#evidence' },
      visual: 'flywheel',
    },
  ],
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
    title: 'The enterprise AI software-factory runtime for trusted outcomes',
    description:
      'FormSy sits between foundation models, agents, and enterprise systems. Context Compute increases effective model intelligence, while Workload Intelligence increases verified engineering output per unit of compute.',
  },
  platforms: [
    {
      index: '01',
      eyebrow: 'ENTERPRISE EDGE',
      title: 'Context Compute',
      description:
        'Compute task state, evidence, completion criteria, and recovery paths inside the enterprise boundary, so every agent action uses the smallest sufficient context.',
      bullets: [
        'Runtime: builds TOCS and returns Context Packets with risk signals',
        'Builder: connects repos, docs, CI, and traces to generate learning samples',
        'Warehouse: governs Evidence, Memory, Contracts, Skills, and Policies',
      ],
      href: '#architecture',
      tone: 'dark',
    },
    {
      index: '02',
      eyebrow: 'INFERENCE SOFTWARE LAYER',
      title: 'Workload Intelligence',
      description:
        'Move beyond model API proxying to a task-level Agent API Plane that unifies models, caching, verification, and compute scheduling around cost per successful task.',
      bullets: [
        'Task routing: selects models, capacity, and context strategies by workload',
        'AI Gateway: unifies authentication, quotas, billing, and observability',
        'Runtime: elastic inference and lifecycle management with Kubernetes + SGLang',
      ],
      href: '#architecture',
      tone: 'light',
    },
  ],
  operatingLoop: {
    eyebrow: 'FROM TASK TO COMPOUNDING INTELLIGENCE',
    title: 'Real tasks create a private enterprise learning loop',
    description:
      'Define completion with Eval Contracts, compute context and evidence per task, verify continuously during execution, and promote proven experience into governed assets.',
    steps: [
      { index: '01', label: 'Define the goal', detail: 'Eval Contract' },
      { index: '02', label: 'Compute context', detail: 'Context Packet' },
      { index: '03', label: 'Agent execution', detail: 'Plan · Tool · Patch' },
      {
        index: '04',
        label: 'Verify results',
        detail: 'Evidence · Finish Gate',
      },
      {
        index: '05',
        label: 'Capture learning',
        detail: 'Policy · Skill · Weights',
      },
    ],
  },
  architecture: {
    eyebrow: 'SYSTEM ARCHITECTURE',
    title: 'Enterprise Edge controls tasks. AI infrastructure runs models.',
    description:
      'External agents and enterprise systems keep their existing entry points. FormSy connects task state, model routing, and compute scheduling through clear, deployable service boundaries.',
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
    title: 'Evolve context from one-time input into reusable assets',
    description:
      'Every asset carries source, permission, version, and audit data, then advances through Candidate, Accepted, and Promoted governance stages.',
    items: [
      {
        code: 'TOCS',
        title: 'Task-Oriented Context State',
        summary: 'Control the current task',
        description:
          'Track goals, assumptions, evidence, risks, verification intent, and next actions.',
        tags: ['ONLINE', 'TASK STATE'],
      },
      {
        code: 'ACF',
        title: 'Agent Context Feedback',
        summary: 'Capture task feedback',
        description:
          'Retain positive, corrective, negative, and comparative feedback for complete task observations.',
        tags: ['FEEDBACK', 'EVIDENCE'],
      },
      {
        code: 'ARCS',
        title: 'Agent-Run Causal Slice',
        summary: 'Learn from past tasks',
        description:
          'Reconstruct key context choices, decisions, outcomes, and causal relationships from historical runs.',
        tags: ['CAUSAL', 'LEARNING'],
      },
      {
        code: 'POLICY',
        title: 'Policy / Skill / Verifier',
        summary: 'Reuse proven experience',
        description:
          'Promote stable workflows, verification rules, and recovery strategies into capabilities for the next task.',
        tags: ['GOVERNED', 'REUSABLE'],
      },
      {
        code: 'TRACE',
        title: 'Evidence & Trace',
        summary: 'Preserve evidence chains',
        description:
          'Record the source, tool output, test result, and approval status behind every conclusion.',
        tags: ['AUDIT', 'PROVENANCE'],
      },
    ],
  },
  evidence: {
    eyebrow: 'EARLY VALIDATION',
    title: 'Complete more verified tasks with the same models and compute',
    description:
      'Internal SWE-bench Lite experiments indicate that Context Compute can improve both cost and task completion. These results support product validation and should be retested in each customer environment.',
    metrics: [
      {
        value: '−60%',
        label: 'Average token use',
        detail: 'GLM-5.1 · Indexed baseline 100 → 40',
      },
      {
        value: '+60%',
        label: 'Passing cases',
        detail: 'Qwen-class · Indexed baseline 100 → 160',
      },
      {
        value: '1×',
        label: 'Unified north-star metric',
        detail: 'Validated Engineering Tasks / GPU Dollar',
      },
    ],
  },
  solutions: {
    eyebrow: 'DESIGNED FOR ENTERPRISE CONTROL',
    title: 'Move from one-time delivery to compounding sovereign intelligence',
    items: [
      {
        index: '01',
        title: 'Higher task completion',
        description:
          'Bring context, completion criteria, and evidence requirements into the execution loop with every task.',
      },
      {
        index: '02',
        title: 'Lower cost per successful task',
        description:
          'Reduce repeated scanning, ineffective long context, error loops, and premature completion.',
      },
      {
        index: '03',
        title: 'Private enterprise intelligence',
        description:
          'Keep Context, Evals, traces, policies, and selective model increments under enterprise control.',
      },
      {
        index: '04',
        title: 'Continuous cross-model evolution',
        description:
          'Preserve model choice while the learning loop compounds across agents and models.',
      },
    ],
  },
  resources: {
    eyebrow: 'PRODUCT NOTES',
    title: 'Go deeper with FormSy',
    items: [
      {
        meta: 'PRODUCT ARCHITECTURE · 10 CHAPTERS',
        title: 'Enterprise Agent Context Platform architecture',
        description:
          'From Runtime and Context Builder to the AI Gateway and inference layer.',
        href: '#architecture',
        accent: 'blue',
      },
      {
        meta: 'CONTEXT COMPUTE · RESEARCH NOTE',
        title: 'Turn task feedback into learnable causal slices',
        description:
          'Understand how TOCS, ACF, ARCS, and Policy evolve together.',
        href: '#assets',
        accent: 'gold',
      },
      {
        meta: 'ENTERPRISE AI · OPERATING MODEL',
        title: 'Move from renting intelligence to owning it',
        description:
          'Preserve model flexibility while building proprietary Context and Evals.',
        href: '#solutions',
        accent: 'ink',
      },
    ],
  },
  cta: {
    eyebrow: 'BUILD WITH FORMSY',
    title: 'Start building your enterprise intelligence loop',
    description:
      'Begin with one verifiable software-engineering workload and connect your existing agents, models, and enterprise systems.',
    primary: { label: 'View product architecture', href: '#architecture' },
    secondary: { label: 'Explore core capabilities', href: '#platform' },
  },
  footer: {
    groups: [
      {
        title: 'Product',
        links: [
          { label: 'Context Compute', href: '#platform' },
          { label: 'Workload Intelligence', href: '#platform' },
          { label: 'Sovereign Warehouse', href: '#assets' },
        ],
      },
      {
        title: 'Architecture',
        links: [
          { label: 'Enterprise Edge', href: '#architecture' },
          { label: 'AI Gateway', href: '#architecture' },
          { label: 'Inference Runtime', href: '#architecture' },
        ],
      },
      {
        title: 'Solutions',
        links: [
          { label: 'AI Software Factory', href: '#solutions' },
          { label: 'Developer Productivity', href: '#solutions' },
          { label: 'Sovereign AI', href: '#solutions' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Product overview', href: '#resources' },
          { label: 'Technical architecture', href: '#resources' },
          { label: 'Validation results', href: '#evidence' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'Aurinova Technology', href: '#top' },
          { label: 'AURINOVA', href: '#top' },
          { label: 'FormSy', href: '#platform' },
        ],
      },
    ],
  },
} as const;
