# Fireworks.ai 首页内容参考稿

调研时间：2026-09-04  
官方来源：[fireworks.ai](https://fireworks.ai/)  
参考路由：`/fireworks-reference`

## 使用说明

本文档只依据 Fireworks 官方公开网站整理，没有引用 AURINOVA 工作区的业务内容。它覆盖官网首页当前可见的信息结构、产品主题、模型展示、客户案例、更新与页脚分类。

为尊重原站版权，长篇文案与客户评价采用原创概述。产品名、公司名、公开指标、模型名和链接保留事实性表达。参考页面带有醒目的非官方标识，不用于冒充 Fireworks 官网。

## 1. 首页结构

1. Training API 公告
2. Fireworks Nexus 成本控制主视觉
3. 双行客户标识带
4. NVIDIA GTC 2026 观点内容
5. Specialized Intelligence 总述
6. Training 与 Inference 双平台能力
7. 模型库
8. 客户案例
9. 最新更新
10. 开始构建 CTA
11. 全量页脚导航

## 2. Fireworks Nexus

来源：[Fireworks Nexus](https://fireworks.ai/nexus)

核心主题：在工程师原有编码工具中引入开放模型和智能路由，以降低 AI 编码成本，同时保留速度、质量与预算控制。

当前首页首屏使用“Take back control of your AI coding spend”为标题，说明 Nexus 可作为闭源模型 API 的替代入口，按任务路由开放或闭源模型，并展示 50–75% 的成本降低范围。右侧 token / spend 像素柱图由页面代码绘制，没有使用官网页面截图。

## 3. 客户标识带

首页首屏后使用双行横向滚动标识带，当前可见品牌包含 Cursor、Vercel、Lovable、Cognition、Factory、Genspark、Uber、DoorDash、HubSpot、Notion、Cresta、Heidi Health、Upwork、Quora、Samsung、GitLab、micro1、Trilogy、Juicebox、Lightfern、NinjaTech AI、UiPath 与 StackBlitz。

## 4. NVIDIA GTC 2026

来源：[Fireworks 首页](https://fireworks.ai/)

首页展示 Jensen Huang 与 Fireworks CEO Lin Qiao 的对话，将 Fireworks 描述为 AI Factory 体系中的模型制造和基础设施层。参考稿采用概述形式呈现该市场定位。

## 5. Specialized Intelligence

来源：[Fireworks 首页](https://fireworks.ai/)

核心主题：使用领先的开放模型、企业数据、训练和推理基础设施建立可持续积累的专用智能。

内容重点：

- 模型所有权
- 数据与评测信号的持续反馈
- 训练和生产推理的一体化链路
- 开放模型的领域适配
- 每轮训练带来的能力复利

## 6. Training

来源：[Fireworks Training](https://fireworks.ai/training)

### 首页概览的三个层级

1. Guided path：由团队共同定义任务、计划、预算和训练交付。
2. Configuration-led：客户明确模型、数据和方法，平台负责调度、训练与生产交接。
3. Custom training logic：客户编写损失函数、训练器和 RL 循环，平台提供 GPU、rollout serving 与 weight sync。

### Training 页面补充能力

- Training API：从本地环境控制训练循环
- Managed Training：使用内置训练任务
- Fireworks Lab：研究人员和 FDE 参与共建
- SFT、DPO、ORPO、RL 与蒸馏
- LoRA 和全参数训练
- Serverless 与 Dedicated 计算模式
- Checkpoint、恢复、采样、评测和权重同步

## 7. Inference

来源：[Fireworks Inference](https://fireworks.ai/inference)

### 三种部署模式

1. Serverless：按 Token 计费，支持服务等级，兼容 OpenAI 和 Anthropic 接口。
2. On-Demand：独占部署、多区域和训练后模型支持。
3. Reserved Capacity：保证容量、更高配额以及新区域和硬件的优先使用权。

### 基础设施主题

- 从 Kernel、GPU Memory 到 Runtime 的全栈优化
- Prefill 与 Decode 解耦
- 长上下文、Agent Loop 和高并发场景
- 新开放模型快速上线
- 多区域弹性和生产级可靠性
- SOC 2 Type II、HIPAA-ready、GDPR 等安全与合规主题

## 8. 模型库

来源：[Fireworks Model Library](https://fireworks.ai/models)

首页当前模型带包括：

| 模型                 | 类型   |    上下文 | 首页公开价格（Input / Output，每百万 Token） |
| -------------------- | ------ | --------: | -------------------------------------------: |
| DeepSeek v3.2        | LLM    |   163,840 |                                            — |
| GLM 5.2              | LLM    | 1,048,576 |                                  $1.4 / $4.4 |
| Kimi K3              | Vision | 1,048,576 |                                     $3 / $15 |
| Kimi K2.7 Code       | Vision |   262,144 |                                   $0.95 / $4 |
| MiniMax M3           | LLM    |   512,000 |                                  $0.3 / $1.2 |
| Qwen3.7 Plus         | Vision |   262,144 |                                  $0.4 / $1.6 |
| DeepSeek V4 Pro      | LLM    | 1,048,576 |                                            — |
| DeepSeek V4 Flash    | LLM    | 1,048,576 |                                            — |
| Kimi K2.6            | Vision |   262,144 |                                   $0.95 / $4 |
| GLM 5.1              | LLM    |   202,752 |                                            — |
| Gemma 4 31B IT NVFP4 | Vision |   262,144 |                                            — |
| Gemma 4 26B A4B IT   | Vision |   262,144 |                                            — |
| Qwen3.6 Plus         | Vision |         — |                                            — |
| MiniMax M2.7         | LLM    |   196,608 |                                  $0.3 / $1.2 |
| OpenAI gpt-oss-20b   | LLM    |   131,072 |                                            — |
| FLUX.1 Kontext Pro   | Image  |         — |                                            — |
| Whisper V3 Large     | Audio  |         — |                                            — |
| DeepSeek R1 05/28    | LLM    |   163,840 |                                            — |
| Kimi K2.5            | Vision |   262,144 |                                            — |

价格和模型目录变化频繁，正式使用前需要查看实时模型库。

## 9. 客户案例

来源：[Fireworks 首页](https://fireworks.ai/)

### Motif

通过单个 Azure 端点进行可重复的大规模评测，帮助团队更快形成模型决策。

### Gumloop

将公司广泛使用的内部 Agent 从闭源模型迁移到 GLM，并报告最终用户体验保持稳定。

### Cursor

使用 Fireworks 承载生产推理和强化学习负载，根据真实流量动态分配容量。

### Vercel

通过复合模型与训练后模型应对快速变化的代码生成前沿表现。

### Notion

报告将相关 AI 能力的延迟从约两秒降低到约 350 毫秒。

### Genspark

报告在四周内获得更强的模型控制能力和质量改善。

### Quora

迁移开放模型工作负载后，报告响应速度获得约三倍提升。

### Sourcegraph

依靠高性能推理，把团队注意力集中在微调、代码搜索和深层代码上下文。

### UiPath

通过 Azure Foundry 运行开放模型，为 Computer Use 产品优化速度、成本与质量。

### Cursor（第二条首页案例）

首页轮播另列出 Sualeh Asif 的 Cursor 案例，用于补充生产级编码体验的规模化使用场景。

### rLLM

通过 Training SDK 专注自治 Agent 研究，由平台负责集群和训练基础设施。

### Cresta

使用 Multi-LoRA 支持基于企业私有数据的定制 AI 策略。

## 10. 最新更新

来源：[Fireworks Blog](https://fireworks.ai/blog)

首页当前展示：

- 2026-08-31：Training API 正式进入 GA
- 2026-08-26：DeepSeek V4 Pro 的 SWE-Bench 与成功任务成本表现
- 2026-08-26：DeepSeek V4 Pro 在安全 Agent 经济性方面的分析

## 11. 行动区

首页以“开始构建”为最终动作，分别引导用户进入模型库和销售咨询。

- [注册](https://fireworks.ai/signup)
- [联系团队](https://fireworks.ai/contact)

## 12. 页脚信息架构

### Platform

- [AI Native](https://fireworks.ai/ai-native)
- [Enterprise](https://fireworks.ai/enterprise)
- [Customers](https://fireworks.ai/customers)

### Use Cases

- [Code Assistance](https://fireworks.ai/usecases/code-assistance)
- [Conversational AI](https://fireworks.ai/usecases/conversational-ai)
- [Agentic Systems](https://fireworks.ai/usecases/agentic-systems)
- [Search](https://fireworks.ai/usecases/search)
- [Multimodal](https://fireworks.ai/usecases/multimodal)
- [Enterprise RAG](https://fireworks.ai/usecases/enterprise-rag)

### Developers

- [Model Library](https://fireworks.ai/models)
- [Docs](https://docs.fireworks.ai/getting-started/introduction)
- [CLI](https://docs.fireworks.ai/tools-sdks/firectl/firectl)
- [API](https://docs.fireworks.ai/api-reference/introduction)
- [Changelog](https://docs.fireworks.ai/updates/changelog)

### Pricing

- [Serverless、Training 与 On-Demand](https://fireworks.ai/pricing)
- [Enterprise](https://fireworks.ai/contact-reserved)

### Partners

- [Cloud、Consulting 与 Technology Partners](https://fireworks.ai/partners)

### Resources

- [Blog](https://fireworks.ai/blog)
- [Demos](https://demos.fireworks.ai/)
- [Cookbooks](https://docs.fireworks.ai/examples/introduction)

### Company

- [Leadership 与 Investors](https://fireworks.ai/team)
- [Careers](https://fireworks.ai/careers)
- [Trust Center](https://trust.fireworks.ai/)

## 13. 参考版本与官方站点的边界

- 参考版本用于内容和页面结构研究。
- 所有外部操作都跳转至 Fireworks 官方域名。
- 参考版本没有登录、付费、模型调用或销售表单。
- 模型价格、上下文长度、客户数据和发布日期需要以官方实时页面为准。
- 页面使用 CSS/React 绘制首屏数据图和品牌标记；GTC 模块引用官方公开活动图片。页面不复制官网页面截图或长篇客户原文。
