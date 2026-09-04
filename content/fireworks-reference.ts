export const fireworksReferenceContent = {
  meta: {
    researchedAt: '2026-09-04',
    source: 'https://fireworks.ai/',
    label: 'Independent reference build',
  },
  announcement: {
    label: 'Training API now generally available',
    href: 'https://fireworks.ai/training',
  },
  navigation: [
    { label: 'Product', href: '#platform', menu: true },
    { label: 'Solutions', href: '#customers', menu: true },
    { label: 'Models', href: '#models', menu: true },
    { label: 'Pricing', href: 'https://fireworks.ai/pricing' },
    { label: 'Resources', href: '#updates', menu: true },
  ],
  hero: {
    eyebrow: 'INTRODUCING FIREWORKS NEXUS',
    title: 'Take back control of your AI coding spend',
    description:
      'Replace closed-model endpoints with one routing layer that selects the right open or closed model for each task and can reduce coding-model costs by 50–75%.',
    primary: { label: 'REQUEST A DEMO', href: 'https://fireworks.ai/demo-request' },
    secondary: { label: 'LEARN MORE', href: 'https://fireworks.ai/nexus' },
  },
  logos: [
    'CURSOR', 'Vercel', 'Lovable', 'Cognition', 'FACTORY', 'Genspark', 'Uber',
    'DOORDASH', 'HubSpot', 'Notion', 'Cresta', 'Heidi', 'upwork', 'Quora',
    'SAMSUNG', 'GitLab', 'micro1', 'TRILOGY', 'Juicebox', 'Lightfern', 'Ninja',
    'UiPath', 'StackBlitz',
  ],
  gtc: {
    eyebrow: 'NVIDIA GTC 2026, JENSEN HUANG',
    title: '“Fireworks is the TSMC of AI Factories...”',
    description:
      'Jensen Huang discusses Fireworks’ position in the AI infrastructure market with CEO Lin Qiao.',
    image:
      'https://cdn.sanity.io/images/pv37i0yn/production/5e10913b6585d6152752d17f0a765c32f454dabb-1703x934.png?auto=format',
  },
  platform: {
    eyebrow: 'BUILD YOUR FRONTIER',
    title: 'Foundational Infrastructure for Specialized Intelligence',
    description:
      'Combine leading open models with proprietary data and domain expertise, then own a learning loop that improves from production feedback.',
    pillars: [
      {
        index: '01',
        name: 'Training',
        audience: 'FROM GUIDED RUNS TO FRONTIER RL',
        description:
          'Move deeper into the training stack as workloads mature, with checkpoints designed to reach production quickly.',
        modes: [
          'Guided path: define the task, review the plan and cost, approve the run, and receive a trained model.',
          'Configuration-led training with scheduling and production deployment handled by Fireworks.',
          'Custom losses, trainers, reinforcement-learning loops, rollout serving, and weight synchronization on Fireworks GPUs.',
        ],
        primary: { label: 'LEARN MORE', href: 'https://fireworks.ai/training' },
        secondary: { label: 'TALK TO OUR TEAM', href: 'https://fireworks.ai/contact-training' },
      },
      {
        index: '02',
        name: 'Inference',
        audience: 'FOR DEVELOPMENT TO CURSOR-SCALE',
        description:
          'Serve current open models or your trained variants with an engine optimized for throughput, latency, and model quality.',
        modes: [
          'Serverless: per-token billing, Priority and Fast tiers, plus OpenAI- and Anthropic-compatible APIs.',
          'On-Demand: dedicated deployments, multi-region options, and support for post-trained models.',
          'Reserved: guaranteed capacity, higher quotas, and access to the newest hardware.',
        ],
        primary: { label: 'LEARN MORE', href: 'https://fireworks.ai/inference' },
        secondary: { label: 'TALK TO OUR TEAM', href: 'https://fireworks.ai/contact' },
      },
    ],
  },
  models: {
    eyebrow: 'MODEL LIBRARY',
    title: 'Run the latest open models with a single line of code',
    description: 'Access popular open-source models optimized for cost, speed, and quality.',
    href: 'https://fireworks.ai/models',
    items: [
      { name: 'Deepseek v3.2', context: '163840', kind: 'LLM', href: 'deepseek-v3p2' },
      { name: 'GLM 5.2', context: '1048576', kind: 'LLM', price: '$1.4/M Input · $4.4/M Output', badge: 'New', href: 'glm-5p2' },
      { name: 'Kimi K3', context: '1048576', kind: 'Vision', price: '$3/M Input · $15/M Output', badge: 'New', href: 'kimi-k3' },
      { name: 'Kimi K2.7 Code', context: '262144', kind: 'Vision', price: '$0.95/M Input · $4/M Output', href: 'kimi-k2p7-code' },
      { name: 'Minimax M3', context: '512000', kind: 'LLM', price: '$0.3/M Input · $1.2/M Output', href: 'minimax-m3' },
      { name: 'Qwen3.7 Plus', context: '262144', kind: 'Vision', price: '$0.4/M Input · $1.6/M Output', href: 'qwen3p7-plus' },
      { name: 'DeepSeek-V4-Pro', context: '1048576', kind: 'LLM', href: 'deepseek-v4-pro' },
      { name: 'DeepSeek-V4-Flash', context: '1048576', kind: 'LLM', href: 'deepseek-v4-flash' },
      { name: 'Kimi K2.6', context: '262144', kind: 'Vision', price: '$0.95/M Input · $4/M Output', href: 'kimi-k2p6' },
      { name: 'GLM 5.1', context: '202752', kind: 'LLM', href: 'glm-5p1' },
      { name: 'Gemma 4 31B IT NVFP4', context: '262144', kind: 'Vision', href: 'gemma-4-31b-it-nvfp4' },
      { name: 'Gemma 4 26B A4B IT', context: '262144', kind: 'Vision', href: 'gemma-4-26b-a4b-it' },
      { name: 'Qwen3.6 Plus', context: '—', kind: 'Vision', href: 'qwen3p6-plus' },
      { name: 'MiniMax M2.7', context: '196608', kind: 'LLM', price: '$0.3/M Input · $1.2/M Output', href: 'minimax-m2p7' },
      { name: 'OpenAI gpt-oss-20b', context: '131072', kind: 'LLM', href: 'gpt-oss-20b' },
      { name: 'FLUX.1 Kontext Pro', context: '—', kind: 'Image', href: 'flux-kontext-pro' },
      { name: 'Whisper V3 Large', context: '—', kind: 'Audio', href: 'whisper-v3' },
      { name: 'Deepseek R1 05/28', context: '163840', kind: 'LLM', href: 'deepseek-r1-0528' },
      { name: 'Kimi K2.5', context: '262144', kind: 'Vision', href: 'kimi-k2p5' },
    ],
  },
  customers: {
    eyebrow: 'CUSTOMER LOVE',
    title: 'What our customers are saying',
    items: [
      { company: 'Motif', person: 'Hanbin Jung · Partnership Lead', summary: 'Uses one Azure endpoint for repeatable, high-volume evaluations and faster model decisions.' },
      { company: 'Gumloop', person: 'Gonzalo Soto Mallqui · CPO', summary: 'Moved a widely used internal agent to GLM while maintaining the product experience.' },
      { company: 'Cursor', person: 'Federico Cassano · AI Researcher', summary: 'Uses elastic production capacity and reinforcement-learning inference as traffic changes.' },
      { company: 'Vercel', person: 'Malte Ubl · CTO', summary: 'Combines model serving and reinforcement learning to keep up with rapid coding-model progress.' },
      { company: 'Notion', person: 'Sarah Sachs · AI Lead', summary: 'Reduced latency for production AI features from roughly two seconds to about 350 milliseconds.' },
      { company: 'Genspark', person: 'Kay Zhu · CTO', summary: 'Gained more control over its AI roadmap and improved quality within four weeks.' },
      { company: 'Quora', person: 'Spencer Chan · Product Lead', summary: 'Reported a threefold response-time improvement after moving an open-model workload.' },
      { company: 'Sourcegraph', person: 'Beyang Liu · CTO', summary: 'Pairs fast model inference with its own tuning, code search, and deep code context.' },
      { company: 'UiPath', person: 'Mircea Neagovici-Negoescu · SVP, Head of AI', summary: 'Runs open models through Azure Foundry for computer-use products focused on speed, cost, and quality.' },
      { company: 'Cursor', person: 'Sualeh Asif · Product', summary: 'Uses Fireworks infrastructure to support production coding experiences at large scale.' },
      { company: 'rLLM', person: 'Kyle Montgomery & Sijun Tan · Core Contributors', summary: 'Uses the Training SDK so researchers can focus on autonomous-agent work.' },
      { company: 'Cresta', person: 'Tim Shi · Co-Founder', summary: 'Applies Multi-LoRA to custom AI trained with private enterprise data.' },
    ],
  },
  updates: {
    eyebrow: 'LATEST UPDATES',
    title: "What's new at Fireworks",
    items: [
      { date: '8/31/2026', type: 'Company News', title: 'Train past the frontier: Training API now generally available', href: 'https://fireworks.ai/blog/train-past-the-frontier-training-api-now-generally-available' },
      { date: '8/26/2026', type: 'Model Release', title: 'DeepSeek V4 Pro: Tops SWE-Bench & Cuts Cost per Task by 3x vs. Fable 5', href: 'https://fireworks.ai/blog/DeepSeekV4Pro-Fable5' },
      { date: '8/26/2026', type: 'Use Case', title: 'DeepSeek V4 Pro is Redefining Security Agent Economics', href: 'https://fireworks.ai/blog/DeepSeek-V4-Pro-Security' },
    ],
  },
  footer: [
    { title: 'Platform', links: [['AI Native', '/ai-native'], ['Enterprise', '/enterprise'], ['Customers', '/customers']] },
    { title: 'Use Cases', links: [['Code Assistance', '/usecases/code-assistance'], ['Conversational AI', '/usecases/conversational-ai'], ['Agentic Systems', '/usecases/agentic-systems'], ['Search', '/usecases/search'], ['Multimodal', '/usecases/multimodal'], ['Enterprise RAG', '/usecases/enterprise-rag']] },
    { title: 'Developers', links: [['Model Library', '/models'], ['Docs', 'https://docs.fireworks.ai/getting-started/introduction'], ['CLI', 'https://docs.fireworks.ai/tools-sdks/firectl/firectl'], ['API', 'https://docs.fireworks.ai/api-reference/introduction'], ['Changelog', 'https://docs.fireworks.ai/updates/changelog']] },
    { title: 'Pricing', links: [['Serverless', '/pricing'], ['On-Demand', '/pricing'], ['Fine Tuning', '/pricing'], ['Enterprise', '/contact-reserved']] },
    { title: 'Partners', links: [['Cloud and Infrastructure', '/partners'], ['Consulting and Services', '/partners'], ['Technology', '/partners']] },
    { title: 'Resources', links: [['Blog', '/blog'], ['Demos', 'https://demos.fireworks.ai'], ['Cookbooks', 'https://docs.fireworks.ai/examples/introduction']] },
    { title: 'Company', links: [['Leadership', '/team'], ['Investors', '/team'], ['Careers', '/careers'], ['Trust Center', 'https://trust.fireworks.ai']] },
  ],
} as const;
