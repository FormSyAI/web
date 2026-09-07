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


## 控制台组件与导航

- 按钮、输入框使用 `components/ui` 的 Base UI 封装；控制台适配层启用 `unstyled`，由品牌 CSS 定义外观，交互行为交给基础组件。
- 复选框使用共享 Checkbox；弹窗由 Base UI Dialog 管理焦点、Escape、背景隔离和关闭。选择框集中于 NativeSelect，保留系统选择器的键盘与移动端体验。
- 图标继续使用 Lucide；表格与布局保持语义 HTML 和现有样式。
- 内部导航使用 AppLink（封装 React Router Link），操作后的跳转使用 useNavigate，路由状态使用 useLocation。禁止自行调用 pushState 或派发 popstate 模拟导航。
- 路由入口使用 BrowserRouter / Routes，保留站点 base path、别名和静态入口。动态页面状态按 pathname + search 隔离；锚点滚动由统一组件处理。


### 样式与组件维护（2026-09-07）

公共字体、语义颜色、容器与侧栏布局变量在 `app/globals.css`。品牌页面按钮使用 `Button variant="brand"` 并沿用页面布局类；控制台按钮和输入使用 `console` variant。业务组件不再使用 `unstyled`。勾选框复用 `components/ui/checkbox.tsx`。

控制台布局和移动菜单位于 `components/console/layout.tsx`、`sidebar.tsx`，页面位于 `components/console/pages/`。移动菜单使用共享 Sheet，保持焦点恢复与 Escape 行为。备份首页布局在 `app/original-home.css`，由备份页面加载。详见 `docs/STYLE_COMPONENT_AUDIT.md` 的整改与保留规则。


### 标题与操作规范

- HTML 标题级别用于内容结构；视觉规格按用途命名。官网同级区块统一引用 `--type-section-*`，桌面上限 48px / 1.25，手机下限 32px / 1.25；禁止为单个区块重复覆盖字号、字距与行高。
- 首屏标题、卡片标题、页脚辅助标题保留各自角色，不强制所有 h2 同尺寸。
- 控制台与设计系统均使用 `components/ui/select.tsx` 的 Base UI Select，采用页面内列表、选中标记、键盘操作和可见焦点。不要回退为系统原生下拉。
- 触控设备的控制台操作目标至少 44px；数值使用等宽数字对齐。正文和可读辅助文字保持充分对比。
- `/design-system` 与 `/dev/design-system` 可查看当前公共标题规格及真实控件，规范示例应复用生产组件。


### 对齐规则

完整宽度区块的标题、说明统一居中；左右分栏文字、卡片、表单与控制台保持左对齐。官网 `SectionHeading` 默认居中，分栏场景显式使用 `align="left"`。对齐不随语言或手机断点任意切换，正文卡片不继承区块标题的居中样式。
