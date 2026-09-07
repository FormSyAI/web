# 网站内容维护

内容迁移目标见 [网站内容架构](../docs/WEBSITE_CONTENT_ARCHITECTURE.md)。根首页提供自有产品素材，`/aurinova-reference` 已承载新版 FormSy 内容。

## 字典入口

| 页面 | 内容文件 |
| --- | --- |
| 根首页 `/` | `site.ts`（中文）、`site.en.ts`（英文）、`i18n.ts`（注册与类型） |
| 新版首页 `/aurinova-reference` | `aurinova-reference.ts`（中英文配对文案与共享结构）、`aurinova-reference.zh.ts`（中文导出）、`aurinova-reference.i18n.ts`（注册与类型） |
| 方案与定价 | `pricing.i18n.ts` |
| 认证与辅助说明 | `auth.i18n.ts` |

`createAurinovaContent(locale)` 使用配对文案生成两种语言，共享结构和路由；修改 `t(中文, English)` 时同步维护两种表达。语言偏好保存在 `aurinova-locale`；未设置时参考浏览器语言，默认语言为中文。

## 修改流程

1. 按架构文档确定区块用途、文案和目标链接。
2. 同步更新中英文字典及类型；涉及卡片结构时再调整组件字段。
3. 检查导航、页脚、元数据、可访问性标签和硬编码链接。
4. 同步对应内容清单，标明已实施部分与待实施部分。

根首页的 `platforms`、`operatingLoop`、`architecture`、`assets`、`evidence` 等是迁移素材。新版字段包括 `hero`、`secondHero`、`overview`、`platform`、`learning`、`models`、`scenarios`、`evaluation`、`resources`、`engagement` 和 `about`。模型卡与场景卡已改成实际内容字段，菜单统一使用有效目标。

客户、价格、模型版本、合规资质和服务开放状态应有自有依据。图表示意与内部实验分别标明；外部参考内容不直接变成 AURINOVA 的产品事实。
