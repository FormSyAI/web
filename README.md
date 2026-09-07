# AURINOVA / FormSy Web

React + Vite 双语品牌网站。FormSy 产品内容已迁移到 `/aurinova-reference` 页面骨架，保持原有视觉与交互风格。当前完成本地实现，尚未发布线上。

## 当前状态

- `/`：自己的产品内容设计，提供 FormSy 定位、能力、架构与学习闭环素材。
- `/aurinova-reference`：新版产品首页，包含核心能力、学习闭环、模型与部署、应用场景、验证方法、资源摘要和合作流程。
- `/aurinova-reference/pricing`：试点验证、企业部署和产业合作方案，包含比较表和 FAQ。
- 登录、注册、SSO、找回密码与法律说明页面已具备前端实现；真实服务依赖外部配置，见认证接口文档。
- `/dev/design-system`：组件与 token 开发预览。

## 文档入口

| 文档 | 用途 |
| --- | --- |
| [AGENT.md](AGENT.md) | 精简设计约束 |
| [PRODUCT.md](PRODUCT.md) | 品牌、产品定位与工作边界 |
| [网站内容架构](docs/WEBSITE_CONTENT_ARCHITECTURE.md) | 菜单、区块、文案、内容取舍与迁移目标 |
| [DESIGN.md](DESIGN.md) | 详细视觉规范 |
| [Banner 设计](docs/BANNER_DESIGN.md) | 双首屏图形、SVG 素材与质量记录 |
| [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) | token、组件和样式维护入口 |
| [内容维护](content/README.md) | 中英文字典与修改方法 |
| [根首页内容](docs/CURRENT_SITE_CONTENT.md) | 当前产品内容来源及索引 |
| [参考骨架内容](docs/AURINOVA_REFERENCE_CONTENT.md) | 当前骨架状态与迁移映射 |
| [认证接口](docs/auth-api.md) | 外部身份服务接入协议 |
| [控制台与 Coding Plan 方案](docs/CONSOLE_AND_CODING_PLAN.md) | 登录衔接、后台菜单、套餐计量、计费架构与实施阶段 |

## 开发与验证

使用 Node.js 22.13.0 或更高版本。在 `web` 目录运行：

```sh
npm install
npm run dev
```

开发服务端口为 3001。代码修改后按影响范围执行：

```sh
npm run typecheck
npm run lint
npm run build
```

构建输出到 `dist/`，包含公开路由的静态入口。纯文档修改检查内容、链接与差异即可。发布时沿用 `.openai/hosting.json` 对应的 Sites 项目，发布需有明确请求。

## 维护入口

- `src/router.tsx`：路由与别名；菜单目标需要对应真实页面或锚点。
- `app/aurinova-reference/`：目标首页、定价与认证页面。
- `content/aurinova-reference.ts`：中英文配对文案与共享结构；`.zh.ts`：中文导出入口。
- `content/site.ts`、`site.en.ts`：根首页中英文产品素材。
- `content/pricing.i18n.ts`、`auth.i18n.ts`：定价与认证文案。
- `app/globals.css`：全局 token；路由 CSS 管理局部布局。
- `components/site/`、`components/ui/`：共享站点组件与基础交互。

原始 BP、技术架构及产业规划材料位于上级目录。BP 带有机密标记，公开内容使用经过筛选的摘要。参考页面中的客户、数字、模型价格与上线状态不作为自有事实来源。
