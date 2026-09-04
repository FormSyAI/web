# AURINOVA Web

AURINOVA / FormSy 的 React 品牌官网。页面借鉴 Fireworks AI 的信息密度、黑白分区、像素数据图形与工程化排版，并使用 FormSy 的产品材料组织中文内容。

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 维护入口

- `content/site.ts`：导航、首屏、产品能力、架构、验证数据、资源与页脚文案。
- `content/fireworks-reference.ts`：仅根据 Fireworks 官方公开页面整理的参考版本内容。
- `app/globals.css`：设计 token、基础排版、组件样式与响应式规则。
- `components/site/`：站点级组件；移动导航和轮播交互集中在客户端组件中。
- `components/ui/`：当前页面实际使用的 Shadcn/Base UI 基础组件。
- `app/page.tsx`：首页区块组合，尽量保持为纯展示层。
- `app/dev/design-system/page.tsx`：设计 token 与组件的开发预览路由。
- `app/fireworks-reference/page.tsx`：Fireworks.ai 首页信息架构参考版本。

修改文案或卡片时优先编辑 `content/site.ts`。新增视觉值时先补充全局 token，再在组件样式中引用，避免散落重复色值和间距。

设计系统预览：`/dev/design-system`

Fireworks 参考版本：`/fireworks-reference`

内容文档位于 `docs/CURRENT_SITE_CONTENT.md` 和 `docs/FIREWORKS_REFERENCE_CONTENT.md`。

## 页面结构

1. 公告条与粘性导航
2. 双页产品主张轮播
3. 兼容生态跑马灯
4. 任务控制面板
5. Context Compute / Workload Intelligence
6. 企业私有学习闭环
7. 四层部署架构
8. 主权上下文资产轮播
9. 内部验证指标
10. 企业价值、产品说明、行动区与页脚

## 内容披露

原始商业计划包含 `CONFIDENTIAL · SEED 2026` 标识。当前页面只采用产品定位、架构与内部实验摘要；公开发布前请再次确认实验口径、披露权限和品牌联系方式。
