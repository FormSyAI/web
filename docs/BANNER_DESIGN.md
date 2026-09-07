# FormSy 双 Banner 设计

更新：2026-09-07。已接入 `/aurinova-reference`，根首页保持原设计。

## 设计说明

采用几何重绘，保留原来的两组产品主张、中英文描述与按钮。标题按原始语义分行，图形使用独立 SVG，手机端使用专门构图。

- **当下价值**：白底合并构图，蓝色完成率上升、金色成功任务成本下降；蓝金像素柱在同一画布中成对交错，保留各自图例。底部串联 Context Packet、Agent Run 和 Finish Gate。趋势为概念示意，不代表实测结果。
- **长期价值**：深蓝网格与五阶段环路，中心为企业拥有的智能资产。Context、Eval、Trace、Policy、Weights 保留原语义，Weights 标注选择性适配。五个节点按椭圆对称定位，环线与箭头在卡片边缘留出一致间距；中心资产卡采用品牌蓝底与白色文字，保持居中，统一层叠偏移，并降低网格对比。
- 白底与深蓝底是图形构图的一部分。采用 Arial / Arial Bold 描绘图内英文技术标签，中文图内标签使用华文黑体，所有文字转为路径，无字体或网络依赖；图外说明与无障碍描述由页面字典提供。

## 国际化

两组图形均有桌面与手机的中英文版本，共八份 SVG。英文保留原文件名，中文使用 `-zh.svg` 后缀（手机为 `-mobile-zh.svg`）。组件接收页面 `locale`，随 `zh-CN` / `en-US` 切换图内标签、说明及图片描述；FormSy 品牌名称保留。生成脚本的 `ZH` 映射维护图内中文文案。

新增四份中文版已通过路径验证和渲染一致性检查，预览和报告位于 `outputs/banner-design/*-zh-qa/`。

## 素材与质量记录

| 版本 | SVG | 预览 | 路径数 / 路径命令数 |
| --- | --- | --- | --- |
| 当下价值 · 桌面 | [SVG](../public/banners/verified-work.svg) | [PNG](../outputs/banner-design/verified-work-qa/outlined.png) | 859 / 7065 |
| 长期价值 · 桌面 | [SVG](../public/banners/enterprise-learning.svg) | [PNG](../outputs/banner-design/enterprise-learning-qa/outlined.png) | 77 / 4092 |
| 当下价值 · 手机 | [SVG](../public/banners/verified-work-mobile.svg) | [PNG](../outputs/banner-design/verified-work-mobile-qa/outlined.png) | 483 / 3153 |
| 长期价值 · 手机 | [SVG](../public/banners/enterprise-learning-mobile.svg) | [PNG](../outputs/banner-design/enterprise-learning-mobile-qa/outlined.png) | 57 / 1250 |

已通过四份 SVG 的 path-only 验证；无脚本、图片嵌入、外链及远程字体。已查看桌面与手机图形渲染，内容无裁切或重叠。

对比用于确认生成稿与规范化 SVG 的一致性，不用于宣称复刻旧截图。四组对比的 IoU、边界 F1、白底及黑底 SSIM 均为 1，Delta E 为 0。

| 版本 | 对比报告 | 叠图 | 差异图 |
| --- | --- | --- | --- |
| 当下价值 · 桌面 | [JSON](../outputs/banner-design/verified-work-qa/report.json) | [Overlay](../outputs/banner-design/verified-work-qa/overlay.png) | [Diff](../outputs/banner-design/verified-work-qa/diff.png) |
| 长期价值 · 桌面 | [JSON](../outputs/banner-design/enterprise-learning-qa/report.json) | [Overlay](../outputs/banner-design/enterprise-learning-qa/overlay.png) | [Diff](../outputs/banner-design/enterprise-learning-qa/diff.png) |
| 当下价值 · 手机 | [JSON](../outputs/banner-design/verified-work-mobile-qa/report.json) | [Overlay](../outputs/banner-design/verified-work-mobile-qa/overlay.png) | [Diff](../outputs/banner-design/verified-work-mobile-qa/diff.png) |
| 长期价值 · 手机 | [JSON](../outputs/banner-design/enterprise-learning-mobile-qa/report.json) | [Overlay](../outputs/banner-design/enterprise-learning-mobile-qa/overlay.png) | [Diff](../outputs/banner-design/enterprise-learning-mobile-qa/diff.png) |

手机构图按 400 单位画布设计，对比以 800px 渲染，避开本机无头浏览器极窄视口的裁切限制。质量文件位于本地忽略目录 `outputs/banner-design/`；部署素材仅包含 `public/banners/` 下八份 SVG。

## 维护

- 生成脚本：`scripts/generate-banner-art.py`，通过 `uv run --script` 运行；当前字形源为 macOS 系统 Arial 字体。
- 图形组件：`components/site/formsy-banner-art.tsx`。
- 文案：`content/aurinova-reference.ts` 的 `banners`；标题和描述沿用根首页字典。
- 图形为静态 SVG；页面保留双首屏切换和减少动态效果支持。
- 类型检查、代码检查、构建及 150 个渲染链接检查通过。已做图形文件视觉检查，未做完整页面浏览器验收。
