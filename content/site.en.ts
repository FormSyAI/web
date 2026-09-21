export const siteContentEn = {
  ui: {
    pageTitle: 'FormSy · Task Context and Attributable Evidence',
    pageDescription:
      'Connect tasks, context, decisions, actions, and outcomes to support attribution, validation, and reusable engineering knowledge.',
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
      ['TASK', 'issue + repository'],
      ['EVIDENCE', 'source + relation'],
      ['CONTRACT', 'pytest + review'],
      ['OUTCOME', 'verified + traceable'],
    ],
    live: 'TRACE',
    evidenceComplete: 'SOURCE-BOUND CONTEXT',
    validatedResult: 'CHECKABLE RESULT',
    manifestoQuote:
      '“Understand the task and source before acting. Explain the result with evidence, not confidence.”',
    manifestoSignature: 'TASK CONTEXT · EVIDENCE · KNOWLEDGE',
    architectureFootnotes: [
      'FORMSY · TASK / CONTEXT / EVIDENCE / KNOWLEDGE',
      'AURINOVA · MODEL / GATEWAY / WORKLOAD / COMPUTE',
    ],
    governancePath: 'View governance path',
    exploreCapabilities: 'Explore all capabilities',
    assetCarouselLabel: 'Enterprise sovereign context assets',
    footerTagline: 'TASK CONTEXT AND EVIDENCE FOR CODING AGENTS',
  },
  brand: {
    name: 'AURINOVA',
    company: 'Aurinova Technology',
    product: 'FormSy',
    description: 'Task Context & Evidence Platform',
  },
  announcement: {
    label: 'Give coding agents context before action and evidence after',
    href: '#platform',
  },
  navigation: [
    { label: 'Product', href: '#platform' },
    { label: 'How it works', href: '#solutions' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Capabilities', href: '#assets' },
  ],
  heroSlides: [
    {
      id: 'sovereign-intelligence',
      eyebrow: 'FROM TRACE TO ATTRIBUTABLE EVIDENCE',
      title:
        'Make every engineering decision traceable.\nTurn real outcomes into knowledge.',
      description:
        'Connect tasks, context, decisions, actions, verification, and outcomes in one evidence chain for attribution, reuse, and continuous learning.',
      primaryCta: { label: 'Explore FormSy', href: '#platform' },
      secondaryCta: { label: 'See how it works', href: '#solutions' },
      visual: 'signal',
    },
    {
      id: 'context-to-weights',
      eyebrow: 'ASSOCIATION · ATTRIBUTION · EFFECT',
      title: 'Move from process association\nto validated effects.',
      description:
        'Keep evidence, feedback, outcomes, and effects distinct so attribution candidates become knowledge only after controlled validation.',
      primaryCta: { label: 'View the evidence loop', href: '#solutions' },
      secondaryCta: { label: 'Explore capabilities', href: '#assets' },
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
    'Pytest',
    'GitHub',
  ],
  manifesto: {
    eyebrow: 'FROM SOURCE TO VERIFIED RESULT',
    title: 'Connect the task, source, and verification in one inspectable flow',
    description:
      'FormSy does not replace the coding agent. It organizes task context, source evidence, acceptance constraints, and execution receipts inside the tools teams already use.',
  },
  platforms: [
    {
      index: '01',
      eyebrow: 'UNDERSTAND THE TASK',
      title: 'Context Compute',
      description:
        'Compute the source, relationships, requirements, and unknowns most relevant to the current task.',
      bullets: [
        'Task-aware CodeGraph and source exploration',
        'Bound task source, context, and code revisions',
        'Context projection, paging, and delivery receipts',
      ],
      href: '#architecture',
      tone: 'dark',
    },
    {
      index: '02',
      eyebrow: 'VERIFY THE RESULT',
      title: 'Causal Evidence & Learning',
      description:
        'Organize decisions, actions, evidence, and outcomes for attribution, then refine validated effects into reusable experience.',
      bullets: [
        'Keep evidence, feedback, outcome, and effect distinct',
        'Separate process association, attribution candidates, and controlled support',
        'Causal evidence graphs, experience candidates, and recall',
      ],
      href: '#architecture',
      tone: 'light',
    },
  ],
  operatingLoop: {
    eyebrow: 'FROM TASK TO VERIFIED RESULT',
    title:
      'One task flow from understanding to implementation and verification',
    description:
      'The agent owns open-ended judgment. FormSy provides deterministic source, version, relation, verification, and evidence boundaries.',
    steps: [
      { index: '01', label: 'Bind the task', detail: 'Source · Revision' },
      { index: '02', label: 'Investigate', detail: 'Code · Relation' },
      { index: '03', label: 'Compile checks', detail: 'Pytest · Review' },
      { index: '04', label: 'Implement & verify', detail: 'Patch · Receipt' },
      { index: '05', label: 'Retain experience', detail: 'Episode · Recall' },
    ],
  },
  architecture: {
    eyebrow: 'SYSTEM ARCHITECTURE',
    title: 'FormSy focuses on tasks and evidence. Infrastructure stays open.',
    description:
      'Agents keep ownership of open-ended investigation and implementation. FormSy Core owns source, version, relation, verification, and knowledge rules. Models, gateways, and compute remain an outer infrastructure layer.',
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
    title: 'From source exploration to reusable task knowledge',
    description:
      'One principle connects every capability: each conclusion must lead back to the task, source, check, and actual execution.',
    items: [
      {
        code: 'EXPLORE',
        title: 'Task-aware Source Exploration',
        summary: 'Understand relevant code',
        description:
          'Use task clues to locate symbols, structural relationships, and verified source.',
        tags: ['CODEGRAPH', 'SOURCE'],
      },
      {
        code: 'CONTRACT',
        title: 'Task Compilation',
        summary: 'Turn requirements into checks',
        description:
          'Bind the task source, investigate evidence, author pytest, run independent review, and freeze the contract.',
        tags: ['PYTEST', 'REVIEW'],
      },
      {
        code: 'RELATION',
        title: 'Symbolic & Runtime Inquiry',
        summary: 'Inspect relations and counterexamples',
        description:
          'Frame relations, premises, scoped observations, and runtime probes as reviewable questions.',
        tags: ['RELATION', 'PROBE'],
      },
      {
        code: 'EPISODE',
        title: 'Task Evidence Graph',
        summary: 'Preserve complete task evidence',
        description:
          'Connect sessions, FormSy artifacts, Git, tests, and outcomes without turning correlation into causation.',
        tags: ['EVIDENCE', 'OUTCOME'],
      },
      {
        code: 'RECALL',
        title: 'Knowledge Pattern',
        summary: 'Bring experience into the next task',
        description:
          'Recall guidance only with explicit scope and sources; surface stale knowledge separately as risk.',
        tags: ['GUIDANCE', 'RISK'],
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
    title: 'Start with one real engineering task',
    description:
      'Bring the task, repository, and acceptance requirements. Let FormSy organize context, verification, and evidence.',
    primary: { label: 'See how it works', href: '#solutions' },
    secondary: { label: 'Explore capabilities', href: '#assets' },
  },
  footer: {
    groups: [
      {
        title: 'Product',
        links: [
          { label: 'Context Compute', href: '#platform' },
          { label: 'Causal Evidence & Learning', href: '#platform' },
          { label: 'Capability Map', href: '#assets' },
        ],
      },
      {
        title: 'Architecture',
        links: [
          { label: 'Agent / IDE', href: '#architecture' },
          { label: 'FormSy Core', href: '#architecture' },
          { label: 'AURINOVA Horizon', href: '#architecture' },
        ],
      },
      {
        title: 'Solutions',
        links: [
          { label: 'Task understanding', href: '#solutions' },
          { label: 'Verification loop', href: '#solutions' },
          { label: 'Experience reuse', href: '#assets' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Product overview', href: '#resources' },
          { label: 'Technical architecture', href: '#resources' },
          { label: 'Capability map', href: '#assets' },
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
