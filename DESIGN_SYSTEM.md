# AURINOVA 设计系统维护

视觉基准为 `/aurinova-reference` 当前样式。精简约束见 [AGENT.md](AGENT.md)，详细规范见 [DESIGN.md](DESIGN.md)。开发预览路由为 `/dev/design-system`，其展示范围不替代目标页面本身。

## 视觉原则

- 白色阅读区配合深色分区，蓝色承担主动作，金色少量强调。
- 统一容器、1px 结构线、大标题和等宽标签形成层级。
- 卡片和按钮默认直角，静态内容保持平面感。
- 内容迁移保留已确认的区块节奏与交互。

## 样式入口

| 文件 | 职责 |
| --- | --- |
| `app/globals.css` | 全局语义色、蓝金色阶、字体和基础尺寸 |
| `app/aurinova-reference/aurinova-reference.css` | 目标首页、导航、卡片与区块布局 |
| `app/aurinova-reference/pricing/pricing.css` | 定价页面局部规则 |
| `app/aurinova-reference/auth.css` | 认证页面布局与状态 |
| `app/dev/design-system/design-system.css` | 开发预览专属样式 |

主要变量：`--brand-blue-*`、`--brand-gold-*`、`--primary`、`--accent`、`--border`、`--shell`、`--gutter`、`--section-space`、`--font-body`、`--font-code`、`--radius-*`。目标页面通过 `--fw-*` 别名引用品牌色并管理局部样式。

## 组件复用

- 目标页面使用 `AurinovaReferenceHeader`、`AurinovaReferenceFooter` 和现有轮播交互。
- 根首页的 `SiteHeader`、`HeroShowcase`、`AssetCarousel` 属于内容来源页面，迁移时避免整套覆盖目标布局。
- `components/ui/` 提供基础组件；`AppLink` 和 `AppImage` 处理运行时链接与图像。
- 调整模型卡和场景卡的数据字段时同步修改标签、图标及可访问性描述。

## 验证

沿用各路由已有断点，检查桌面和手机宽度、中英文换行、菜单、轮播与表格溢出。保留键盘焦点、语义标签和 `prefers-reduced-motion` 行为。新增视觉值先检查现有 token，避免重复定义。
