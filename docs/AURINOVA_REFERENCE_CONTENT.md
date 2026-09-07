# FormSy 新版网站内容索引

更新：2026-09-07。首页：`/aurinova-reference`；方案页：`/aurinova-reference/pricing`。

已按 [网站内容架构](WEBSITE_CONTENT_ARCHITECTURE.md) 完成本地内容迁移，尚未发布线上。保留参考骨架的主要布局、蓝金配色、双首屏、黑白双栏、卡片轮播及导航交互。

## 已实施内容

| 区块 | 内容与目标 |
| --- | --- |
| 公告与菜单 | 产品、解决方案、模型与部署、方案与定价、资源 |
| 双首屏 | 可验证的 AI 编程结果；企业学习资产 |
| 生态带 | Agent、工程工具与基础设施接入示例 |
| `#overview` | 任务输入、过程控制、输出与四层架构 |
| `#platform` | Context Compute / Workload Intelligence |
| `#learning-loop` | 完成标准、上下文、执行、验证、资产五步流程 |
| `#models-deployment` | 开放模型、托管 API、BYOM、BYOC、Edge / VPC、专属容量 |
| `#solutions` | 软件工程、私有 Agent 平台、推理优化、产业节点 |
| `#evaluation` | 完成率、成功任务成本、证据完整性 |
| `#resources` | 架构、学习资产、成本评估三张卡与公开摘要 |
| `#engagement` | 三种合作方式；`#pilot-process` 说明试点准备流程 |
| `#about` | AURINOVA 介绍与五列页脚 |
| 方案页 | 三类方案、范围、比较表和六项 FAQ |

## 内容边界

- 原客户证言、新闻、价格、模型销售参数和他方品牌身份已移除。
- 生态名称为架构接入示例，具体适配按项目确认。
- 验证区暂不公开内部实验数字，展示可用于讨论的评估方法。
- 真实联系信息未提供，页面引导了解试点流程，不模拟预约或提交成功。
- 登录入口由身份服务配置控制；认证页面与接口保留，预览状态继续明确标识。
- 根路由继续保留原产品内容，不自动切换主入口。

## 维护与验证

`content/aurinova-reference.ts` 的 `createAurinovaContent` 集中维护配对文案，`.zh.ts` 导出中文版本。方案页读取 `content/pricing.i18n.ts`，共用合作方案信息。

中英文首页与方案页已通过服务端渲染检查：主要区块存在、ID 唯一、各页一个 H1、150 个链接均有目标，未发现所检查的旧品牌与商业承诺残留。浏览器视觉与交互实测尚未执行。
