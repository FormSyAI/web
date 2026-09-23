'use client';

import { ArrowUpRight, Check, ChevronDown, Mail, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useI18n } from '@/components/i18n/i18n-provider';
import { AurinovaReferenceFooter } from '@/components/site/aurinova-reference-footer';
import { AurinovaReferenceHeader } from '@/components/site/aurinova-reference-header';
import { BannerShader } from '@/components/site/banner-shader';
import { AppLink as Link } from '@/components/runtime/app-link';

import './careers.css';

const APPLY_EMAIL = 'hr@aurinova.cn';

type LocalizedText = { zh: string; en: string };
type LocalizedList = { zh: string[]; en: string[] };

type Job = {
  id: string;
  department: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  responsibilities: LocalizedList;
  requirements: LocalizedList;
  preferred: LocalizedList;
};

const jobs: Job[] = [
  {
    id: 'agent-engineer',
    department: { zh: 'AI研发部', en: 'AI R&D' },
    title: { zh: 'Agent 开发工程师', en: 'Agent Development Engineer' },
    summary: {
      zh: '参与 Context Compute 核心技术与产品研发，研究上下文如何影响 Agent 的决策、效果与成本。',
      en: 'Build Context Compute core technology and products, and study how context shapes agent decisions, effectiveness and cost.',
    },
    responsibilities: {
      zh: [
        '参与 Context Compute 核心技术与产品研发。',
        '研究如何为 AI Agent 提供准确、精简、动态更新的上下文。',
        '研究如何通过精准上下文控制影响模型决策，控制幻觉，提升模型智能。',
        '构建完整评测体系与观测机制，评估上下文对 Agent 效果与成本的影响。',
        '与现有 Agent、模型服务和企业系统完成集成。',
      ],
      en: [
        'Work on core technology and product development for Context Compute.',
        'Research how to provide AI agents with accurate, concise and continuously updated context.',
        'Research how precise context control shapes model decisions, reduces hallucination and improves model intelligence.',
        'Build a complete evaluation and observability system to assess how context affects agent effectiveness and cost.',
        'Integrate with existing agents, model services and enterprise systems.',
      ],
    },
    requirements: {
      zh: [
        '本科及以上学历，具备较好的数学抽象思维。',
        '理解大模型和 AI Agent 的基本工作方式。',
        '对上下文工程、知识检索或 AI 应用开发有实践经验。',
        '具备良好的问题分析、系统设计和工程实现能力。',
        '能够使用 AI Coding 工具高效完成研发工作。',
        '对新的 AI 系统方向有兴趣，具备较强的学习和探索能力。',
      ],
      en: [
        "Bachelor's degree or above, with strong mathematical abstraction.",
        'Understand how large models and AI agents fundamentally work.',
        'Practical experience in context engineering, knowledge retrieval or AI application development.',
        'Strong problem analysis, system design and engineering implementation skills.',
        'Able to use AI coding tools effectively.',
        'Interest in new AI system directions, with strong learning and exploration ability.',
      ],
    },
    preferred: {
      zh: [
        '有符号化推理、知识图谱推理相关经验。',
        '有 RAG、Context Engineering、知识图谱或模型评测经验。',
        '熟悉 Coding Agent、工具调用或多轮任务执行流程。',
        '有 Agent Trace、模型调用成本或推理性能优化经验。',
        '参与过相关开源项目或拥有可展示的个人项目。',
      ],
      en: [
        'Experience in symbolic reasoning or knowledge graph reasoning.',
        'Experience in RAG, Context Engineering, knowledge graphs or model evaluation.',
        'Familiar with coding agents, tool calls or multi-turn task execution.',
        'Experience with agent traces, model cost or inference performance optimization.',
        'Contributions to open-source projects or demonstrable personal projects.',
      ],
    },
  },
  {
    id: 'agent-platform-backend-engineer',
    department: { zh: 'AI研发部', en: 'AI R&D' },
    title: { zh: 'Agent Infra 开发工程师', en: 'Agent Infra Development Engineer' },
    summary: {
      zh: '负责 Agent 数据平台与多智能体编排平台的设计和研发，建设企业级知识库与 RAG 检索链路。',
      en: 'Design and build the agent data platform and multi-agent orchestration platform, including enterprise knowledge bases and RAG pipelines.',
    },
    responsibilities: {
      zh: [
        '参与 Agent 数据平台与多智能体编排平台的设计和研发。',
        '负责 Coding Agent 会话、日志、Commit 等数据的采集、解析、存储与检索。',
        '建设企业级知识库及 RAG 检索链路。',
        '参与多智能体任务编排、状态管理、上下文传递和结果聚合。',
        '建设 Agent 工作流的可靠性、可观测性与审计能力。',
        '推动平台与 Coding Agent、模型服务及企业系统集成。',
      ],
      en: [
        'Design and build the agent data platform and multi-agent orchestration platform.',
        'Collect, parse, store and retrieve coding-agent sessions, logs and commits.',
        'Build enterprise knowledge bases and RAG retrieval pipelines.',
        'Work on multi-agent task orchestration, state management, context passing and result aggregation.',
        'Build reliability, observability and auditability for agent workflows.',
        'Drive platform integration with coding agents, model services and enterprise systems.',
      ],
    },
    requirements: {
      zh: [
        '2 年及以上后端开发经验，具备服务端系统、数据平台或平台型产品的独立设计与交付经验。',
        '了解 Claude Code、Codex、Cursor、OpenCode 等 Coding Agent 的会话与日志结构。',
        '熟悉知识检索与 RAG，了解文档解析、索引、召回、重排及权限过滤。',
        '了解多智能体架构，熟悉至少一种 Agent 框架，如 LangGraph、DeepAgents、AutoGen、Semantic Kernel、CrewAI。',
        '了解 MCP、A2A 等协议，具备 Agent 工作流的可靠性设计意识。',
        '具备持续学习、源码阅读和快速验证能力。',
      ],
      en: [
        '2+ years of backend development experience with independent design and delivery of server systems, data platforms or platform products.',
        'Understand the session and log structures of coding agents such as Claude Code, Codex, Cursor and OpenCode.',
        'Familiar with knowledge retrieval and RAG, including document parsing, indexing, recall, reranking and permission filtering.',
        'Understand multi-agent architectures and at least one agent framework such as LangGraph, DeepAgents, AutoGen, Semantic Kernel or CrewAI.',
        'Understand MCP, A2A and similar protocols, with reliability design awareness for agent workflows.',
        'Strong ability to keep learning, read source code and validate ideas quickly.',
      ],
    },
    preferred: {
      zh: [
        '有企业级知识库从 0 到 1 的落地经验。',
        '有 Coding Agent 数据采集、Agent Trace 或任务编排平台开发经验。',
        '有多租户权限、GitHub/GitLab 集成或 Git 数据处理经验。',
        '有 Agent 可观测性、评测或模型调用成本优化经验。',
        '参与过相关开源项目或有可展示的个人项目。',
      ],
      en: [
        'Experience building enterprise knowledge bases from 0 to 1.',
        'Experience with coding agent data collection, agent traces or orchestration platform development.',
        'Experience with multi-tenant permissions, GitHub/GitLab integration or Git data processing.',
        'Experience in agent observability, evaluation or model cost optimization.',
        'Open-source contributions or demonstrable personal projects.',
      ],
    },
  },
];

function JobCard({
  job,
  open,
  onToggle,
}: {
  job: Job;
  open: boolean;
  onToggle: () => void;
}) {
  const { locale } = useI18n();
  const text = (value: LocalizedText) =>
    locale === 'zh-CN' ? value.zh : value.en;
  const list = (value: LocalizedList) =>
    locale === 'zh-CN' ? value.zh : value.en;
  const t = (zh: string, en: string) => (locale === 'zh-CN' ? zh : en);
  const index = jobs.findIndex((item) => item.id === job.id) + 1;

  return (
    <article className={`career-card${open ? ' is-open' : ''}`} id={job.id}>
      <button
        type="button"
        className="career-card-trigger"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="career-card-index">
          {String(index).padStart(2, '0')}
        </span>
        <span className="career-card-main">
          <span className="career-card-department">{text(job.department)}</span>
          <strong>{text(job.title)}</strong>
          <span className="career-card-summary">{text(job.summary)}</span>
        </span>
        <span className="career-card-toggle">
          <span>{open ? t('收起详情', 'Close') : t('查看详情', 'Details')}</span>
          <ChevronDown size={19} />
        </span>
      </button>

      <div className="career-detail" hidden={!open}>
        <div className="career-detail-grid">
          <section className="career-section">
            <h3>{t('岗位职责', 'Responsibilities')}</h3>
            <ul>
              {list(job.responsibilities).map((item) => (
                <li key={item}>
                  <Check size={15} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="career-section">
            <h3>{t('任职要求', 'Requirements')}</h3>
            <ul>
              {list(job.requirements).map((item) => (
                <li key={item}>
                  <Check size={15} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="career-preferred">
          <h3>{t('加分项', 'Nice to have')}</h3>
          <ul className="career-tags">
            {list(job.preferred).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="career-detail-footer">
          <p>
            {t('请将简历发送至', 'Send your resume to')}{' '}
            <a href={`mailto:${APPLY_EMAIL}`}>{APPLY_EMAIL}</a>
          </p>
          <a
            className="pr-button pr-button-solid"
            href={`mailto:${APPLY_EMAIL}`}
          >
            {t('投递此职位', 'Apply for this role')}
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </article>
  );
}

function CareersPage() {
  const { locale } = useI18n();
  const t = (zh: string, en: string) => (locale === 'zh-CN' ? zh : en);
  const [openJob, setOpenJob] = useState(jobs[0].id);

  useEffect(() => {
    document.title =
      locale === 'zh-CN' ? '加入我们 | AURINOVA' : 'Careers | AURINOVA';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        t(
          '加入 AURINOVA，参与 Context Compute、Agent 数据平台与多智能体编排平台的研发。',
          'Join AURINOVA and build Context Compute, the agent data platform and multi-agent orchestration.',
        ),
      );
  }, [locale, t]);

  return (
    <main className="pr-page careers-page">
      <AurinovaReferenceHeader current="careers" />

      <div className="fw-banner-assembly fw-designed-hero careers-hero-banner">
        <BannerShader className="fw-banner-shader" />
        <section className="careers-hero pr-shell">
          <div className="careers-hero-copy">
            <p className="careers-eyebrow">
              <Sparkles size={15} />
              AURINOVA · {t('加入我们', 'JOIN US')}
            </p>
            <h1>
              {t('把每一次上下文，', 'Turn every context')}
              <br />
              <span>{t('变成可验证的智能。', 'into verifiable intelligence.')}</span>
            </h1>
            <div className="pr-actions">
              <Link className="pr-button pr-button-solid" href={`mailto:${APPLY_EMAIL}`}>
                {t('邮件投递简历', 'Apply by email')}
                <Mail size={17} />
              </Link>
              <a className="pr-button pr-button-outline" href="#careers-jobs">
                {t('查看开放职位', 'Open positions')}
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>

          <div className="careers-hero-aside">
            <span>{t('OPEN POSITIONS', '开放职位')}</span>
            <strong>02</strong>
            <p>{t('AI 研发部', 'AI R&D')}</p>
            <a href={`mailto:${APPLY_EMAIL}`}>{APPLY_EMAIL}</a>
          </div>
        </section>
      </div>

      <section className="careers-jobs pr-shell" id="careers-jobs" aria-label={t('开放职位', 'Open positions')}>
        <div className="careers-jobs-head">
          <div>
            <p>{t('OPEN POSITIONS', 'OPEN POSITIONS')}</p>
            <h2>{t('开放职位', 'Current openings')}</h2>
          </div>
          <p className="careers-jobs-note">
            {t('简历请直接发送至', 'Send your resume directly to')}{' '}
            <a href={`mailto:${APPLY_EMAIL}`}>{APPLY_EMAIL}</a>
          </p>
        </div>
        <div className="careers-job-list">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              open={openJob === job.id}
              onToggle={() =>
                setOpenJob((current) => (current === job.id ? '' : job.id))
              }
            />
          ))}
        </div>
      </section>

      <AurinovaReferenceFooter />
    </main>
  );
}

export default CareersPage;
