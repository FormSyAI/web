'use client';

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheck,
  Code2,
  Layers3,
  Plus,
  Search,
  Sparkles,
} from 'lucide-react';
import { AppLink as Link } from '@/components/runtime/app-link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Brand } from '@/components/site/brand';

const colors = [
  { name: 'Ink', token: '--ink', value: '#121216', usage: '主文字 / 深色表面' },
  {
    name: 'Paper',
    token: '--paper',
    value: '#FFFFFF',
    usage: '页面 / 反色文字',
  },
  {
    name: 'Brand Blue 500',
    token: '--brand-blue-500',
    value: '#2C6CB5',
    usage: '品牌 / 主操作',
  },
  {
    name: 'Brand Blue 700',
    token: '--brand-blue-700',
    value: '#1C4A7F',
    usage: '深色强调面',
  },
  {
    name: 'Brand Gold 500',
    token: '--brand-gold-500',
    value: '#F3B322',
    usage: '重点 / 提醒信号',
  },
  { name: 'Line', token: '--line', value: '#DEDEE3', usage: '网格 / 边界' },
] as const;

const spacing = [
  { name: '2XS', value: 4 },
  { name: 'XS', value: 8 },
  { name: 'SM', value: 12 },
  { name: 'MD', value: 16 },
  { name: 'LG', value: 24 },
  { name: 'XL', value: 32 },
  { name: '2XL', value: 48 },
  { name: '3XL', value: 64 },
] as const;

const navigation = [
  { label: 'Foundations', href: '#foundations', index: '01' },
  { label: 'Typography', href: '#typography', index: '02' },
  { label: 'Controls', href: '#controls', index: '03' },
  { label: 'Surfaces', href: '#surfaces', index: '04' },
  { label: 'Patterns', href: '#patterns', index: '05' },
] as const;

function SpecHeader({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="ds-spec-header">
      <span>{index}</span>
      <div>
        <p>{eyebrow}</p>
        <h2>{title}</h2>
        <div>{description}</div>
      </div>
    </header>
  );
}

function StatusDot({ tone }: { tone: 'success' | 'warning' | 'neutral' }) {
  return (
    <span
      className={`ds-status-dot ds-status-dot-${tone}`}
      aria-hidden="true"
    />
  );
}

export default function DesignSystemPage() {
  return (
    <main className="ds-page" id="top">
      <a className="skip-link" href="#ds-main">
        跳到主要内容
      </a>

      <header className="ds-topbar">
        <div className="ds-topbar-brand">
          <Brand />
          <span>DESIGN SYSTEM</span>
        </div>
        <div className="ds-topbar-meta">
          <span>DEV PREVIEW</span>
          <span>V1.0</span>
          <Link href="/">
            <ArrowLeft size={15} aria-hidden="true" />
            返回官网
          </Link>
        </div>
      </header>

      <div className="ds-layout">
        <aside className="ds-sidebar">
          <div className="ds-sidebar-title">
            <Sparkles size={18} strokeWidth={1.5} aria-hidden="true" />
            <span>System Index</span>
          </div>
          <nav aria-label="Design system 导航">
            {navigation.map((item) => (
              <a href={item.href} key={item.href}>
                <span>{item.index}</span>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="ds-sidebar-note">
            <StatusDot tone="success" />
            <span>Tokens synced</span>
          </div>
        </aside>

        <div className="ds-main" id="ds-main">
          <section className="ds-intro">
            <div>
              <p className="ds-kicker">AURINOVA / FORMSY</p>
              <h1>Design System</h1>
              <p>
                企业 AI 基础设施的视觉与交互基线。所有示例直接使用官网共享 token
                和组件。
              </p>
            </div>
            <div className="ds-intro-signature" aria-label="设计系统状态">
              <span className="ds-signature-mark">A / F</span>
              <dl>
                <div>
                  <dt>MODE</dt>
                  <dd>Precision Grid</dd>
                </div>
                <div>
                  <dt>RADIUS</dt>
                  <dd>Square</dd>
                </div>
                <div>
                  <dt>BASE UNIT</dt>
                  <dd>4 px</dd>
                </div>
              </dl>
            </div>
          </section>

          <section className="ds-section" id="foundations">
            <SpecHeader
              index="01"
              eyebrow="FOUNDATIONS"
              title="颜色与空间"
              description="以高对比中性色承载信息，源自 Logo 的深蓝聚焦品牌、主操作和信息状态，金色用于关键强调与提醒。"
            />

            <div className="ds-block">
              <div className="ds-block-label">
                <span>COLOR TOKENS</span>
                <code>CSS VARIABLES</code>
              </div>
              <div className="ds-color-grid">
                {colors.map((color) => (
                  <article className="ds-color-card" key={color.token}>
                    <div
                      className="ds-color-swatch"
                      style={{ background: `var(${color.token})` }}
                    >
                      <span>{color.value}</span>
                    </div>
                    <div>
                      <strong>{color.name}</strong>
                      <code>{color.token}</code>
                      <p>{color.usage}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="ds-block">
              <div className="ds-block-label">
                <span>SPACING SCALE</span>
                <code>4 PX BASE</code>
              </div>
              <div className="ds-spacing-list">
                {spacing.map((item) => (
                  <div className="ds-spacing-row" key={item.name}>
                    <code>{item.name}</code>
                    <div>
                      <span style={{ width: `${item.value * 3}px` }} />
                    </div>
                    <strong>{item.value}px</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="ds-section" id="typography">
            <SpecHeader
              index="02"
              eyebrow="TYPOGRAPHY"
              title="Technical Editorial"
              description="展示标题保持低字重和紧字距；正文关注中文可读性；编号、标签和元数据使用等宽字体。"
            />

            <div className="ds-type-table">
              <div className="ds-type-row ds-type-display">
                <div>
                  <code>DISPLAY 01</code>
                  <span>76 / 84 · 520</span>
                </div>
                <p>拥有自己的企业智能</p>
              </div>
              <div className="ds-type-row ds-type-heading">
                <div>
                  <code>HEADING 02</code>
                  <span>48 / 54 · 520</span>
                </div>
                <p>面向可信结果的运行层</p>
              </div>
              <div className="ds-type-row ds-type-body">
                <div>
                  <code>BODY 01</code>
                  <span>18 / 31 · 400</span>
                </div>
                <p>
                  把代码、文档、测试、工具输出与执行反馈，编译成 Agent
                  可使用、可验证、可审计的任务上下文。
                </p>
              </div>
              <div className="ds-type-row ds-type-mono">
                <div>
                  <code>MONO 01</code>
                  <span>12 / 18 · 650</span>
                </div>
                <p>CONTEXT COMPUTE · EVIDENCE · FINISH GATE</p>
              </div>
            </div>
          </section>

          <section className="ds-section" id="controls">
            <SpecHeader
              index="03"
              eyebrow="CONTROLS"
              title="操作与状态"
              description="操作层保持紧凑、直接、可键盘访问。控件的尺寸、边框和焦点环沿用语义 token。"
            />

            <div className="ds-control-grid">
              <div className="ds-demo-panel">
                <div className="ds-block-label">
                  <span>BUTTONS</span>
                  <code>ACTIONS</code>
                </div>
                <div className="ds-demo-row">
                  <Button
                    className="ds-ui-button ds-ui-button-primary"
                    size="lg"
                  >
                    开始构建 <ArrowRight data-icon="inline-end" />
                  </Button>
                  <Button className="ds-ui-button" variant="outline" size="lg">
                    查看架构
                  </Button>
                  <Button className="ds-ui-button" variant="ghost" size="lg">
                    了解更多
                  </Button>
                  <Button className="ds-ui-button" disabled size="lg">
                    不可用
                  </Button>
                  <Button
                    className="ds-ui-icon-button"
                    variant="outline"
                    size="icon-lg"
                    aria-label="新增"
                  >
                    <Plus />
                  </Button>
                </div>
              </div>

              <div className="ds-demo-panel">
                <div className="ds-block-label">
                  <span>STATUS & TAGS</span>
                  <code>SEMANTIC</code>
                </div>
                <div className="ds-demo-row">
                  <Badge className="ds-ui-badge">PRIMARY</Badge>
                  <Badge className="ds-ui-badge" variant="outline">
                    EVIDENCE
                  </Badge>
                  <Badge
                    className="ds-ui-badge ds-ui-badge-success"
                    variant="outline"
                  >
                    <CircleCheck data-icon="inline-start" /> VERIFIED
                  </Badge>
                  <Badge
                    className="ds-ui-badge ds-ui-badge-warning"
                    variant="outline"
                  >
                    RISK
                  </Badge>
                </div>
                <div className="ds-status-list">
                  <span>
                    <StatusDot tone="success" />
                    运行正常
                  </span>
                  <span>
                    <StatusDot tone="warning" />
                    需要关注
                  </span>
                  <span>
                    <StatusDot tone="neutral" />
                    等待执行
                  </span>
                </div>
              </div>

              <div className="ds-demo-panel ds-demo-panel-wide">
                <div className="ds-block-label">
                  <span>FORM FIELDS</span>
                  <code>INPUT</code>
                </div>
                <div className="ds-form-grid">
                  <label htmlFor="ds-task-name">
                    <span>任务名称</span>
                    <Input
                      id="ds-task-name"
                      className="ds-ui-input"
                      placeholder="例如：修复支付超时"
                    />
                  </label>
                  <label htmlFor="ds-asset-search">
                    <span>搜索资产</span>
                    <div className="ds-input-with-icon">
                      <Search size={17} aria-hidden="true" />
                      <Input
                        id="ds-asset-search"
                        className="ds-ui-input"
                        placeholder="TOCS、ACF、Policy…"
                      />
                    </div>
                  </label>
                  <label className="ds-form-wide" htmlFor="ds-validation-notes">
                    <span>验证说明</span>
                    <Textarea
                      id="ds-validation-notes"
                      className="ds-ui-textarea"
                      placeholder="描述完成标准和所需证据"
                    />
                  </label>
                  <div className="ds-switch-row ds-form-wide">
                    <div>
                      <strong>启用 Finish Gate</strong>
                      <span>完成前检查全部验证证据</span>
                    </div>
                    <Switch defaultChecked aria-label="启用 Finish Gate" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ds-section" id="surfaces">
            <SpecHeader
              index="04"
              eyebrow="SURFACES"
              title="内容表面"
              description="卡片使用 1px 结构边界和明确的明暗层级，阴影仅用于需要表达空间关系的浮层。"
            />

            <Tabs defaultValue="light" className="ds-tabs">
              <TabsList variant="line" className="ds-tabs-list">
                <TabsTrigger value="light">Light</TabsTrigger>
                <TabsTrigger value="dark">Dark</TabsTrigger>
                <TabsTrigger value="brand">Brand</TabsTrigger>
              </TabsList>
              <TabsContent value="light">
                <div className="ds-surface-demo ds-surface-light">
                  <div className="ds-surface-index">01</div>
                  <Layers3 size={26} strokeWidth={1.4} />
                  <p>ENTERPRISE EDGE</p>
                  <h3>Context Compute</h3>
                  <span>计算任务状态、证据、完成标准与恢复路径。</span>
                  <a href="#patterns">
                    查看模式 <ArrowRight size={17} />
                  </a>
                </div>
              </TabsContent>
              <TabsContent value="dark">
                <div className="ds-surface-demo ds-surface-dark">
                  <div className="ds-surface-index">02</div>
                  <Code2 size={26} strokeWidth={1.4} />
                  <p>INFERENCE LAYER</p>
                  <h3>Workload Intelligence</h3>
                  <span>统一模型路由、缓存、验证与算力调度。</span>
                  <a href="#patterns">
                    查看模式 <ArrowRight size={17} />
                  </a>
                </div>
              </TabsContent>
              <TabsContent value="brand">
                <div className="ds-surface-demo ds-surface-brand">
                  <div className="ds-surface-index">03</div>
                  <Sparkles size={26} strokeWidth={1.4} />
                  <p>SOVEREIGN ASSET</p>
                  <h3>Private Learning Loop</h3>
                  <span>
                    把有效经验沉淀为企业自己的 Policy、Skill 与 Weights。
                  </span>
                  <a href="#patterns">
                    查看模式 <ArrowRight size={17} />
                  </a>
                </div>
              </TabsContent>
            </Tabs>
          </section>

          <section className="ds-section" id="patterns">
            <SpecHeader
              index="05"
              eyebrow="PATTERNS"
              title="数据与证据表达"
              description="指标同时展示结论、名称和口径；状态流使用编号与单向连接，避免依赖颜色传达全部含义。"
            />

            <div className="ds-pattern-grid">
              <article className="ds-metric-demo">
                <span>01 · EARLY VALIDATION</span>
                <strong>−60%</strong>
                <h3>平均 Token 消耗</h3>
                <p>GLM-5.1 · Indexed baseline 100 → 40</p>
              </article>

              <article className="ds-flow-demo">
                <div className="ds-block-label">
                  <span>VALIDATED TASK FLOW</span>
                  <code>5 STEPS</code>
                </div>
                <ol>
                  {['目标', '上下文', '执行', '验证', '学习'].map(
                    (item, index) => (
                      <li key={item}>
                        <span>0{index + 1}</span>
                        <strong>{item}</strong>
                        {index < 4 && (
                          <ArrowRight size={14} aria-hidden="true" />
                        )}
                        {index === 4 && <Check size={15} aria-hidden="true" />}
                      </li>
                    ),
                  )}
                </ol>
              </article>
            </div>
          </section>

          <footer className="ds-footer">
            <span>AURINOVA DESIGN SYSTEM · V1.0</span>
            <a href="#top">返回顶部</a>
          </footer>
        </div>
      </div>
    </main>
  );
}
