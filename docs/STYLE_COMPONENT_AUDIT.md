# UI/UX 规范化补充（Impeccable，2026-09-07）

本轮保留既定页面视觉，修复同级标题与交互规范。

- 官网六个同级区块共用响应式标题 token：1440px 视口为 48px / 60px；390px 为 32px / 40px。移除模型区 36px 局部覆盖与重复手机样式。
- 控制台辅助文字颜色提高对比；触控目标统一至少 44px，指标使用等宽数字。
- 设计预览新增生产 Select 与 console Button，标题示例直接绑定公共 token，收敛过紧字距。
- 下拉禁用时不响应 hover，提供明确标签与选中反馈。设计预览短路由加入兼容。
- 检查：中英文内容沿用原字典；桌面标题计算值一致，手机官网无横向溢出，实际下拉选项可选择。

机械检查共 151 条 advisory：108 条历史字号、40 条历史色值、2 条既定蓝图网格、1 条圆角建议；没有非 advisory 结果。保留既定插图、品牌及旧版预览局部样式，未将检测器建议视为重新设计授权。此处不宣称全项目零硬编码。

---

# 样式与组件复用整改记录

更新：2026-09-07。已按原审计实施整改，保留现有蓝金配色、直角控件与中英文内容层级。

## 本次整改

| 项目 | 结果 |
| --- | --- |
| 字体变量 | 补齐可用的无衬线、中文与等宽回退字体栈；产品页面统一引用 font-body / font-code，消除缺失变量 |
| 色彩体系 | 常用品牌色、文本、边框、背景、成功与错误色集中到 globals.css；fw/auth/cs 局部语义别名引用公共 token |
| 基础控件 | 官网、认证、备份页按钮接入共享 Button；协议与本地验证勾选框接入 Checkbox；控制台使用明确的 console variant，移除业务层 unstyled |
| 按钮状态 | 公共样式集中管理控制台按钮尺寸、hover、主动作、选中状态及焦点/禁用状态；保留图标按钮的独立尺寸 |
| 移动菜单 | ConsoleSidebar 复用 Base UI Sheet，提供焦点圈定、Escape 关闭及关闭后焦点恢复；桌面仍使用 aside |
| 业务组件 | 提取 ConsoleLayout / ConsolePageHeader、共享 Badge / Field / Metric / Empty；八个页面与 KeyDialog 拆到 components/console/pages |
| 字号 | 9–11px 辅助文字提升到 caption token；操作按钮采用 label token，保留标题与指标层级 |
| 布局变量 | 容器、侧栏宽度、锚点偏移、图表高度集中为变量；静态 object-fit 改为公共 class |
| 备份样式 | 原首页主要布局移到 app/original-home.css，由备份页面导入；品牌、语言切换及其相关响应式规则保留在全局，保障共享组件 |
| 开发加载 | 显式预构建 Badge 使用的 Base UI 依赖，修复增量接入时发现的 Outdated Optimize Dep 加载失败 |

控制台入口约 390 行；全局 CSS 从约 2409 行缩减至约 880 行。业务层扫描未发现直接使用原生 button、checkbox 或 unstyled。

## 保留规则

- SVG 坐标、第三方品牌色、数据比例和动画计算保留在原位置。
- 1px 细线、局部间距、特有插图配色可由组件管理；本次未将所有数字或色值机械转换成 token。
- 原生 select、textarea 以及按钮/输入元素允许存在于共享 UI 的实现内部。
- 少量包含品牌或语言切换的旧版响应式组合规则仍全局加载；后续修改需同时检查备份页和当前官网。
- 认证、定价、官网仍保留各自的页面布局 CSS，共享行为和设计值统一，不强行合并不同页面结构。

## 验证

- TypeScript、lint、控制台业务回归测试、生产构建通过。
- 浏览器验证控制台用量页与 Coding Plan 路由切换；390px 下无横向溢出。
- 移动菜单打开后焦点进入菜单；Escape 关闭后焦点恢复到打开按钮。
- 注册页正常渲染共享按钮；未创建账户、调用支付或真实模型服务。
- 当前官网与控制台进行了代表性页面检查；全站所有内容组合和所有屏幕尺寸未逐项穷举。

## 原审计（整改前快照）

以下数据与行号记录整改前状态，用于追溯，不代表当前缺陷清单。

# 样式与组件复用审计

日期：2026-09-07。范围：app、components 下 52 个源文件入口及相关样式、src 路由/入口、Banner 生成脚本。静态审查覆盖当前官网、认证、定价、控制台，另外单列原首页备份与设计预览。此次只新增审计记录，未修改产品样式或交互；未进行全站逐页视觉验收。

## 结论

共享组件和设计 token 已存在，执行尚未统一。控制台复用了 Base UI 行为，但通过 unstyled 适配层自行定义视觉；官网、认证和控制台仍有独立颜色、字体和尺寸体系。上轮“统一组件”覆盖的是控制台主要基础控件，不等于全站组件化或全站 token 化完成。

## 优先问题

| 优先级 | 发现与证据 | 影响与处理方向 |
| --- | --- | --- |
| P1 | globals.css:34、82 引用 --font-geist-sans / --font-geist-mono；在项目 CSS/TSX/TS/HTML 中未找到定义或字体加载。auth.css:15 等也直接引用 | var 缺失且未提供 var 内部 fallback，会导致相关 font-family 在计算阶段失效。先定义完整可用字体栈，统一到 --font-body / --font-code；需要品牌字体时再明确加载 |
| P1 | app/console/page.tsx:1924 附近移动侧栏为 aside + 遮罩按钮，只有状态开关；components/ui/sheet.tsx 已有 Base UI Dialog 封装 | 移动导航未获得焦点圈定、Escape 关闭及背景隔离。接入共享 Sheet，保持桌面 aside |
| P2 | console.css:1、auth.css:1、aurinova-reference.css:1 分别声明 cs/auth/fw 色值；coding-plan-offerings.css 没有 var 引用 | 品牌色和状态色更新无法统一传播。将局部别名映射到公共语义 token，允许确有用途的局部语义层 |
| P2 | components/console/primitives.tsx:47、50 强制 unstyled；console.css:421 等重做按钮/输入视觉 | 行为已复用，样式 variant 尚未统一。提供品牌/控制台 variant，汇总 hover、disabled、focus、尺寸规则，避免多套视觉实现 |
| P2 | 当前官网首页/导航、LanguageSwitcher、认证辅助按钮仍有原生 button；协议勾选和验证码演示仍用原生 checkbox | 优先复用 Button 与 Checkbox；保留每个控件的 type、无障碍属性、验证事件。基础组件内部的原生元素无需替换 |
| P2 | console.css 有多处 9–11px 字号；菜单、Badge、按钮/元信息使用不同尺寸 | 需按主内容/操作标签/辅助文字建立字号层级，不能统一机械放大。用真实中英文和手机宽度验收 |
| P2 | 控制台 page.tsx 共 2293 行，Badge/Field/Metric/Empty、八页面、模态流程集中；components/ui/badge.tsx 仅设计预览使用 | 缺少共享业务组件边界。拆出 ConsoleLayout、PageHeader、StatusBadge、MetricCard、EmptyState，再按页面划分；避免把每个 div 封装成组件 |
| P3 | --shell=1392px，但 fw-shell 写 1392px、pr-shell 写 1320px；控制台侧栏宽度与内容 margin-left 在多断点重复 | 将确需同步的数值收敛到布局变量；官网和后台允许不同容器，不强制同宽 |
| P3 | models/page.tsx:53 固定 scrollMarginTop:130；三处模型图片 objectFit:inline；图表 JS 中固定最大高 140px | 静态视觉提取 class/token；数据比例保留动态 style。图表像素高度可用 CSS 自定义属性传入 |
| P3 | globals.css 同时承载全局 token 与原首页布局，main.tsx 全局加载多套路由 CSS | 建议分离备份首页样式与全局基础样式，降低层叠和维护负担；保持现有页面不变 |

P1 为优先修复的功能/基础样式问题，P2 为一致性问题，P3 为维护改进。优先级不代表所有列项都已在浏览器复现。

## 样式扫描数据

统计口径：扫描 CSS 中十六进制及 rgb/hsl/oklch 颜色字面量；包含 token 定义、阴影、透明色和重复规则，因此数量不能直接视为缺陷数。颜色关键字（white 等）未计入。

| 文件 | 行数 | 颜色字面量次数 | 不同字面量 | var 引用次数 |
| --- | ---: | ---: | ---: | ---: |
| app/aurinova-reference/aurinova-reference.css | 2411 | 63 | 42 | 154 |
| app/aurinova-reference/auth.css | 1232 | 71 | 34 | 81 |
| app/aurinova-reference/pricing/pricing.css | 668 | 32 | 16 | 58 |
| app/console/console.css | 1150 | 84 | 71 | 65 |
| components/site/coding-plan-offerings.css | 126 | 14 | 5 | 0 |
| app/globals.css（含 token 定义、备份首页样式） | 2409 | 139 | 79 | 195 |
| app/dev/design-system/design-system.css（开发预览） | 1111 | 44 | 31 | 91 |

五个当前产品局部样式文件共 264 次颜色字面量。主要问题是相同品牌值反复写入以及相近色缺少语义解释。

## 组件实际使用

| 模块 | 已复用 | 尚未统一 |
| --- | --- | --- |
| 控制台 | Base UI Button/Input/Checkbox/Dialog；NativeSelect；AppLink/React Router；Lucide | 自定义 Badge、按钮式计费筛选、移动抽屉、页面头/卡片/表格/空态；视觉通过 unstyled 独立实现 |
| 认证 | 共享 Button/Input、AuthField、LanguageSwitcher、认证页面壳 | 5 处原生 button、1 处协议 checkbox；HumanVerification 另有 1 button 和 1 checkbox（本地演示） |
| 当前官网 | 共享 Header/Footer、AppLink/AppImage、Lucide、局部 RailControls | 首页 3 个原生 button 源位置，Header 2 个；导航的开闭交互自行维护 |
| 语言切换 | LanguageSwitcher 本身是复用组件 | 内部仍使用原生 button；控制台另外维护一套语言按钮 |
| 原首页备份 | Carousel、Sheet、共享导航等 | HeroShowcase 和 SiteHeader 各一个原生 button，优先级低于当前官网 |
| 组件目录 | Badge/Switch/Tabs/Textarea 已存在 | 当前主要只被设计预览引用，不能以“已安装”推断实际页面已复用 |

原生控件源位置统计：当前产品及备份页面合计 14 个 button、2 个 input（均为勾选），不包含 components/ui 内部原生实现。一个源码位置可在循环中渲染多个控件；这不是最终 DOM 节点数。

## 合理保留的固定值

- 1px 边框、0 重置、100% 尺寸、媒体断点和 SVG 坐标，结合用途判断。
- 图表数据计算出的 height/width、动画索引等动态 style。
- NativeSelect 的原生 select、共享 Textarea 的原生 textarea，属于组件实现。
- 第三方品牌 Logo / OAuth 色彩，不应替换为 AURINOVA 品牌色。
- Banner SVG 由 scripts/generate-banner-art.py 生成，主配色已集中为 BLUE/NAVY/GOLD 常量；独立 SVG 不直接继承页面 CSS。可共享生成源配色，避免逐个改产物。
- 表格、fieldset、label、语义 HTML 无需仅为“组件化”做无行为包装。
- 计费来源当前是 aria-pressed 按钮组，其用途是筛选数据；不必强行改成 Tabs，可评估共享 ToggleGroup。

## 建议实施顺序与验收

1. 修复缺失字体变量；为颜色、排版和布局同步值建立公共 token/局部别名映射。
2. 增加品牌组件 variant，并迁移官网/认证遗漏的 Button、Checkbox；优先修复移动 Sheet。
3. 拆分控制台共享业务组件，整理 SVG/静态 inline style、备份样式边界。
4. 对官网、登录、注册、套餐、模型、Key 弹窗进行中英/桌面/移动端视觉回归；验证键盘焦点、Escape、禁用态、错误态和表单提交。

此次结果为代码审计，未声称上述整改完成。
