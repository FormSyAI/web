# 控制台交互演示与接口预留

更新：2026-09-07。用户确认暂未配置模型、定价、身份、支付或推理后端，本轮范围为可交互演示和接口预留。原始完整规划见 [控制台与 Coding Plan](CONSOLE_AND_CODING_PLAN.md)。

## 访问与范围

`/demo/console` 默认打开用量页。八个页面共用侧栏、语言设置和浏览器本地状态。数据存于 `aurinova.console.demo.v1`，设置页可恢复示例数据或清空。演示标识无法作为真实 API Key 使用。

| 路由（前缀 `/demo/console/`） | 已实现 |
| --- | --- |
| `usage` | 套餐/API 分账、日期/模型/Key 筛选、趋势、请求详情、分页、CSV 导出 |
| `coding-plan` | 示例套餐、开通/升级/到期续订订单、模拟支付成功/失败/取消、周期和短窗口额度、续费提醒及降级意向 |
| `models` | 两个明确标注 Demo 的模型、搜索、示例费率与额度、接入跳转 |
| `api-keys` | 创建、模型权限、固定计费来源、有效期、子预算、停用/启用、撤销、轮换 |
| `integrations` | 占位配置复制、工具选择、成功/失败诊断，关联用量和扣减 |
| `billing/balance` | 示例充值、余额及收支流水 |
| `billing/orders` | 状态筛选、订单详情、未完成订单处理、CSV 导出 |
| `settings` | 工作空间名、时区、通知偏好、本地操作记录、演示重置 |

官网增加 Coding Plan 和模型入口，定价页保留企业方案。登录页保留既有表单，并链接独立演示。真实 `/console/*` 入口检查会话并显示服务待接入状态；不使用本地演示数据伪装真实权益。

## 演示计量规则

- Starter：示例 ¥49 / 30 天、10,000 点，5 小时窗口 2,500 点；Pro：示例 ¥149 / 30 天、40,000 点，窗口 10,000 点。所有金额和模型均供交互评审，未形成销售承诺。
- 点数按输入、缓存命中和输出的示例权重计算。API 使用整数分扣减，套餐使用点数；不足时停止，无自动跨账户扣费。
- 同一支付事件及请求 ID 重复执行不会重复扣减或发放权益。推理前失败不扣费。
- 升级保留周期结束时间和实际已用点数，按剩余周期计算差价与额外额度。降级仅记录下周期意向；自动续费、扣款和下一周期任务需后端实现。
- Key 子预算按自身来源计量；轮换保留预算消耗和到期时间，撤销旧标识。
- 本地状态可被浏览器修改，无法作为计费或权限边界。并发上限仅展示，未模拟分布式并发控制。

## 接口预留

代码：`lib/console/api.ts`，身份衔接：`components/auth/session-provider.tsx`。

`.env.example` 提供 `VITE_AURINOVA_CONSOLE_API_BASE_URL` 和 `VITE_AURINOVA_CONSOLE_ENABLED`。这些配置控制预留请求客户端；真实页面仍需后续绑定查询、分页和写入结果。开启变量不会自动开通服务。

业务前缀：`/api/console/workspaces/{workspaceId}`。

| 预留路径 | 方法 / 用途 |
| --- | --- |
| `/usage/summary`、`/usage/requests` | GET 汇总及游标列表 |
| `/models`、`/plans` | GET 服务端模型与价格目录 |
| `/keys` | GET 列表、POST 创建（一次性返回 secret） |
| `/keys/{id}/status`、`/revoke`、`/rotate` | POST 状态、撤销、轮换 |
| `/subscription`、`/subscription/cancel-renewal` | GET 订阅、POST 取消续订 |
| `/orders` | GET 列表、POST 创建订单 |
| `/wallet`、`/wallet/ledger` | GET 余额和流水 |
| `/profile` | GET / POST 工作空间偏好 |
| `/diagnostics` | POST 受控诊断 |

请求带 Cookie 和 `X-AURINOVA-Console-Request`，默认超时 12 秒。创建 Key、轮换、订单和诊断由调用方持有 `Idempotency-Key`，重试沿用同一值。错误使用 HTTP 状态及 `{code,message}`；客户端不会失败后回退演示。认证查询/注销见 [认证接口](auth-api.md)。

后续后端须实现工作空间授权、CSRF、Key 哈希存储、限流、支付回调验签、原子计量账本和真实推理网关。正式价格、模型映射、退款/发票与兼容性验证待服务选型；工具列表中除通用占位协议外均明确标注未验证。导出当前仅覆盖本地筛选结果，真实大规模导出接口另行设计。

## 验证

- `npm run test:console`：计费隔离、重复事件、失败零扣费、额度耗尽、窗口重置、周期到期、升级差价与额度、子预算、撤销与轮换、余额流水对账。
- `npm run typecheck`、`npm run lint`、`npm run build`：类型、静态检查和静态路由产物。
- 浏览器手动检查：Key 创建及一次展示、调用诊断与点数更新、充值订单模拟成功与权益更新、中英文切换、窄屏接入页布局。

未验证真实登录、付款、邮件或模型兼容性，当前没有对应后端。
