# AURINOVA Design System

开发预览路由：`/dev/design-system`

路由专属样式位于 `app/dev/design-system/design-system.css`，全站 token 和基础规则保留在 `app/globals.css`。

## 视觉原则

- **Precision Grid**：核心内容沿 1392px 容器和 1px 结构线对齐。
- **High Contrast**：白色叙事区与近黑技术区交替，紫色承担品牌和关键动作，橙色只强调成本与验证信号。
- **Technical Editorial**：大号低字重标题配合等宽眉题、编号和元数据。
- **Square by Default**：按钮、卡片和标签使用直角轮廓，保持基础设施产品的精确感。

## Token

设计变量位于 `app/globals.css` 的 `:root`：

- 语义色：`--background`、`--foreground`、`--primary`、`--accent`、`--muted-foreground`、`--border`
- 品牌色阶：`--violet-*`、`--orange-*`
- 尺寸：`--shell`、`--gutter`、`--section-space`
- 字体：`--font-body`、`--font-code`
- 圆角：`--radius-*`，当前品牌规范统一为直角

颜色和间距调整应从 token 开始。组件内仅保留与单一视觉效果强相关的数值。

## 组件层级

- `Brand`：统一品牌标识。
- `SiteHeader`：桌面导航与移动端 Sheet。
- `HeroShowcase`：可键盘操作、自动轮播的主视觉。
- `AssetCarousel`：主权资产卡片轮播，复用 Shadcn Carousel。
- `SectionHeading`、`ArrowLink`：首页内部的轻量展示模式。

通用交互优先复用 `components/ui/` 中的 Shadcn 原语。品牌表达与数据图形由站点组件组合完成。

## 响应式与无障碍

- 主要断点：1180px、900px、680px。
- 正文字号以 16px 为基线，常用标签不低于 14px，元数据保留在 12px 左右。
- 所有主要链接与按钮具备可见键盘焦点。
- 动画响应 `prefers-reduced-motion`。
- 复杂图形提供 `aria-label`，纯装饰节点从辅助技术中隐藏。
