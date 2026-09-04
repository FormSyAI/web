# AURINOVA 完整品牌版本内容清单

维护日期：2026-09-04  
页面路由：`/aurinova-reference`

## 使用说明

本文档记录 AURINOVA 完整品牌版本当前使用的信息结构、产品主题、模型展示、客户案例、更新与页脚分类，供后续内容维护使用。

品牌名称、产品叙事、元数据、界面标签和操作链接均已统一为 AURINOVA。模型名与客户公司名作为产品数据保留原有事实性表达。

## 1. 首页结构

1. Training API 公告
2. AURINOVA Nexus 与 Specialized Intelligence 双主视觉
3. 双行客户标识带
4. NVIDIA GTC 2026 观点内容
5. Specialized Intelligence 总述
6. Training 与 Inference 双平台能力
7. 模型库
8. 客户案例
9. 最新更新
10. 开始构建 CTA
11. 全量页脚导航

## 导航与交互

桌面导航依据当前官网整理了四组 hover / click 菜单：

- Product：Inference、Training、RL Rollouts、Nexus，并包含客户案例入口。
- Solutions：AI Native、Enterprise 与六类 Use Cases。
- Models：完整模型库入口与当前重点模型。
- Resources：资源、公司信息与两项精选内容。

菜单支持鼠标悬停、点击、键盘聚焦与 Escape 关闭；窄屏切换为独立移动导航。Hero 的两项指示器、模型横向列表和客户案例列表均可实际操作。

## 2. AURINOVA Nexus

页面入口：[AURINOVA Nexus](/nexus)

核心主题：在工程师原有编码工具中引入开放模型和智能路由，以降低 AI 编码成本，同时保留速度、质量与预算控制。

当前首页首屏使用“Take back control of your AI coding spend”为标题，说明 Nexus 可作为闭源模型 API 的替代入口，按任务路由开放或闭源模型，并展示 50–75% 的成本降低范围。右侧 token / spend 像素柱图由页面代码绘制。

第二张 Hero 使用“Own your model. Own your future.”主题，呈现训练与推理的一体化产品叙事。

## 3. 客户标识带

首页首屏后使用双行横向滚动标识带，当前可见品牌包含 Cursor、Vercel、Lovable、Cognition、Factory、Genspark、Uber、DoorDash、HubSpot、Notion、Cresta、Heidi Health、Upwork、Quora、Samsung、GitLab、micro1、Trilogy、Juicebox、Lightfern、NinjaTech AI、UiPath 与 StackBlitz。

## 4. AURINOVA AI 基础设施

页面入口：[AURINOVA 首页](/)

该区块说明 AURINOVA 将模型训练、生产推理和持续反馈连接为统一平台，定位为下一代 AI 产品的专用智能基础设施。

## 5. Specialized Intelligence

页面入口：[AURINOVA 首页](/)

核心主题：使用领先的开放模型、企业数据、训练和推理基础设施建立可持续积累的专用智能。

内容重点：

- 模型所有权
- 数据与评测信号的持续反馈
- 训练和生产推理的一体化链路
- 开放模型的领域适配
- 每轮训练带来的能力复利

## 6. Training

页面入口：[AURINOVA Training](/training)

### 首页概览的三个层级

1. Guided path：由团队共同定义任务、计划、预算和训练交付。
2. Configuration-led：客户明确模型、数据和方法，平台负责调度、训练与生产交接。
3. Custom training logic：客户编写损失函数、训练器和 RL 循环，平台提供 GPU、rollout serving 与 weight sync。

### Training 页面补充能力

- Training API：从本地环境控制训练循环
- Managed Training：使用内置训练任务
- AURINOVA 专家支持：研究人员和 FDE 参与共建
- SFT、DPO、ORPO、RL 与蒸馏
- LoRA 和全参数训练
- Serverless 与 Dedicated 计算模式
- Checkpoint、恢复、采样、评测和权重同步

## 7. Inference

页面入口：[AURINOVA Inference](/inference)

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

页面入口：[AURINOVA Model Library](/models)

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

页面入口：[AURINOVA 首页](/)

### Motif

通过单个 Azure 端点进行可重复的大规模评测，帮助团队更快形成模型决策。

### Gumloop

将公司广泛使用的内部 Agent 从闭源模型迁移到 GLM，并报告最终用户体验保持稳定。

### Cursor

使用 AURINOVA 承载生产推理和强化学习负载，根据真实流量动态分配容量。

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

页面入口：[AURINOVA Blog](/blog)

首页当前展示：

- 2026-08-31：Training API 正式进入 GA
- 2026-08-26：DeepSeek V4 Pro 的 SWE-Bench 与成功任务成本表现
- 2026-08-26：DeepSeek V4 Pro 在安全 Agent 经济性方面的分析

## 11. 行动区

首页以“开始构建”为最终动作，分别引导用户进入模型库和销售咨询。

- [注册](/signup)
- [联系团队](/contact)

## 12. 页脚信息架构

### Platform

- [AI Native](/ai-native)
- [Enterprise](/enterprise)
- [Customers](/customers)

### Use Cases

- [Code Assistance](/usecases/code-assistance)
- [Conversational AI](/usecases/conversational-ai)
- [Agentic Systems](/usecases/agentic-systems)
- [Search](/usecases/search)
- [Multimodal](/usecases/multimodal)
- [Enterprise RAG](/usecases/enterprise-rag)

### Developers

- [Model Library](/models)
- [Docs](/docs/getting-started/introduction)
- [CLI](/docs/tools-sdks/firectl/firectl)
- [API](/docs/api-reference/introduction)
- [Changelog](/docs/updates/changelog)

### Pricing

- [Serverless、Training 与 On-Demand](/pricing)
- [Enterprise](/contact-reserved)

### Partners

- [Cloud、Consulting 与 Technology Partners](/partners)

### Resources

- [Blog](/blog)
- [Demos](/demos)
- [Cookbooks](/docs/examples/introduction)

### Company

- [Leadership 与 Investors](/team)
- [Careers](/careers)
- [Trust Center](/trust)

## 13. 当前功能边界

- 所有操作均使用 AURINOVA 站内路径，方便后续接入真实页面。
- 当前版本尚未接入登录、付费、模型调用或销售表单。
- 模型价格、上下文长度、客户数据和发布日期应在正式发布前再次核对。
- 页面使用 CSS/React 绘制首屏数据图；Logo 使用 AURINOVA 品牌资源，其余内容图片来自现有公开静态资源。
- 页面没有使用整页截图，客户说明采用简洁概述。
