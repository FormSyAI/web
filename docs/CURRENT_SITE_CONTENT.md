# AURINOVA / FormSy 网站内容清单

文档复核：2026-09-07
对应路由：`/`  
内容源：`content/site.ts`

> 本页记录根路由的自有产品素材，保留为内容迁移来源。目标页面 `/aurinova-reference` 已完成本地内容迁移，根首页保留原实现。菜单和区块重组见 [网站内容架构](WEBSITE_CONTENT_ARCHITECTURE.md)。以下按现有字典整理，界面示例与内部实验不等同于交付承诺。

## 1. 品牌信息

- 品牌：AURINOVA
- 公司：锦曜新宸科技
- 产品：FormSy
- 英文描述：Enterprise Agent Context Platform
- 核心定位：企业 Agent Context Platform 与企业主权 AI 基础设施

## 2. 顶部公告与导航

### 公告

- 文案：FormSy 企业主权 AI 基础设施
- 目标：产品能力区 `#platform`

### 主导航

| 名称     | 目标            |
| -------- | --------------- |
| 产品     | `#platform`     |
| 解决方案 | `#solutions`    |
| 架构     | `#architecture` |
| 资源     | `#resources`    |

辅助入口包括“文档”和“开始构建”，分别指向资源区和架构区。

## 3. 首屏轮播

### 主张一：企业智能所有权

- Eyebrow：OWN YOUR ENTERPRISE INTELLIGENCE
- 标题：使用最强通用模型，拥有自己的企业智能
- 描述：把代码、文档、测试、工具输出与执行反馈编译成 Agent 可使用、可验证、可审计的任务上下文。
- 主操作：探索产品能力
- 次操作：查看技术架构
- 视觉：任务完成率与成功任务成本信号图

### 主张二：从上下文到模型能力

- Eyebrow：CONTEXT TO WEIGHTS
- 标题：让每一次真实工作，成为企业自己的智能
- 描述：动态知识保留在 Context，稳定规则进入 Policy，可重复、可评测的专业能力沉淀为企业私有资产。
- 主操作：了解学习闭环
- 次操作：查看验证结果
- 视觉：Context、Eval、Trace、Policy、Weights 学习飞轮

## 4. 兼容生态

页面展示以下工具与基础设施：

- Claude Code
- Codex
- Cursor
- TRAE
- OpenCode
- Git
- CI / CD
- Jira
- SGLang
- Kubernetes

## 5. 产品总述

- Eyebrow：BUILD YOUR INTELLIGENCE FRONTIER
- 标题：面向可信结果的企业 AI 软件工厂运行层
- 描述：FormSy 位于通用模型、Agent 与企业系统之间，以 Context Compute 提升模型有效智能，以 Workload Intelligence 提升每单位算力的有效工程产出。
- 宣言：把每一次 Agent Run 转化为可控制、可验证、可复用的企业 Workflow Episode。

配套任务控制面板展示：

- Task：`fix/payment-timeout`
- Context：24 evidence refs
- Model：routed · qwen-class
- Gate：6 / 6 checks passed
- 状态：Evidence Complete / Validated Result

## 6. 双平台能力

### Context Compute

定位：在企业边界内计算任务状态、证据、完成标准与恢复路径，让 Agent 根据最小充分上下文行动。

能力：

- Runtime：构建 TOCS，返回 Context Packet 与风险提示
- Builder：接入 Repo、Docs、CI 与 Trace，生成学习样本
- Warehouse：治理 Evidence、Memory、Contract、Skill 与 Policy

### Workload Intelligence

定位：把模型、缓存、验证与算力调度统一到成功任务成本。

能力：

- 任务级路由：依据工作负载选择模型、容量与上下文策略
- AI Gateway：统一鉴权、配额、计费与可观测性
- Runtime：Kubernetes + SGLang 弹性推理与生命周期管理

## 7. 企业私有学习闭环

- 标题：真实任务形成企业私有学习闭环
- 说明：以 Eval Contract 定义完成标准，按任务计算上下文与证据，执行中持续验证，完成后把经验沉淀为可治理资产。

流程：

1. 定义目标：Eval Contract
2. 计算上下文：Context Packet
3. Agent 执行：Plan · Tool · Patch
4. 验证结果：Evidence · Finish Gate
5. 沉淀学习：Policy · Skill · Weights

## 8. 技术架构

- Eyebrow：SYSTEM ARCHITECTURE
- 标题：企业 Edge 控制任务，智算中心运行模型
- 描述：FormSy 连接任务状态、模型路由与算力调度，形成清晰、可部署的服务边界。

### 四层结构

| 层级 | 名称             | 组成                                                       |
| ---- | ---------------- | ---------------------------------------------------------- |
| 01   | Agent / IDE      | Claude Code、Codex、Cursor、TRAE、OpenCode                 |
| 02   | Context Platform | FormSy Runtime、Context Builder、Warehouse、Evolving Model |
| 03   | AI Runtime       | AI Gateway、Workload Scheduler、Kubernetes + SGLang        |
| 04   | Models & GPUs    | Open/Hosted Models、GPU/NPU、Network/Data Center           |

反馈方向包括 Trace、Evidence、Feedback；请求方向包括 Model Request 与 Scheduling Signal。

## 9. 主权资产库

- 标题：让上下文从一次性输入，演进为可复用资产
- 治理流程：Candidate → Accepted → Promoted

### TOCS

- 全称：Task-Oriented Context State
- 作用：控制当前任务
- 内容：目标、假设、证据、风险、验证意图与下一步动作
- 标签：ONLINE、TASK STATE

### ACF

- 全称：Agent Context Feedback
- 作用：收集任务反馈
- 内容：正向、纠错、负向和对比反馈
- 标签：FEEDBACK、EVIDENCE

### ARCS

- 全称：Agent-Run Causal Slice
- 作用：学习历史任务
- 内容：关键上下文选择、决策、结果与因果关系
- 标签：CAUSAL、LEARNING

### Policy / Skill / Verifier

- 作用：复用有效经验
- 内容：稳定流程、验证规则与恢复策略
- 标签：GOVERNED、REUSABLE

### Evidence & Trace

- 作用：保留证据链
- 内容：结论来源、工具输出、测试结果与审批状态
- 标签：AUDIT、PROVENANCE

## 10. 早期验证数据

- 标题：同一模型与算力，完成更多经过验证的任务
- 说明：数据来自内部 SWE-bench Lite 实验，正式部署需要按客户环境复测。

| 指标            | 数值 | 口径                                     |
| --------------- | ---- | ---------------------------------------- |
| 平均 Token 消耗 | −60% | GLM-5.1，Indexed baseline 100 → 40       |
| 可通过 Case 数  | +60% | Qwen-class，Indexed baseline 100 → 160   |
| 北极星指标      | 1×   | 当前展示占位；迁移时改为已验证任务数 / 算力成本的文字定义 |

## 11. 企业价值

1. 更高任务完成率：上下文、完成标准和证据要求进入执行闭环。
2. 更低成功任务成本：减少重复扫描、无效长上下文、错误循环与过早结束。
3. 企业私有智能资产：Context、Eval、轨迹、策略和模型增量由企业掌握。
4. 跨模型持续演进：学习闭环跨 Agent、跨模型长期积累。

## 12. 产品资料

### 企业 Agent Context Platform 技术架构

- 类型：Product Architecture · 10 Chapters
- 内容：Runtime、Context Builder、AI Gateway 与推理运行层

### 因果切片研究说明

- 类型：Context Compute · Research Note
- 内容：TOCS、ACF、ARCS 与 Policy 的演进关系

### 从租用通用智能到拥有企业智能

- 类型：Enterprise AI · Operating Model
- 内容：保留模型灵活性，同时建立企业自己的 Context 与 Eval。

## 13. 行动区

- Eyebrow：BUILD WITH FORMSY
- 标题：开始构建企业自己的智能闭环
- 主操作：查看产品架构
- 次操作：了解核心能力

## 14. 页脚

页脚按产品、平台、解决方案、资源和公司组织链接，并重复产品名称、品牌定位及公司版权信息。

## 15. 内容维护规则

- 根首页文案维护 `content/site.ts` 与 `content/site.en.ts`；目标骨架文案维护 `content/aurinova-reference.ts` 与 `.zh.ts`。
- 页面组件负责结构和展示，避免嵌入大段业务文案。
- 数据、实验结果和日期发布前需要复核来源。
- 新增栏目时同步更新本清单、页面锚点和页脚入口。
