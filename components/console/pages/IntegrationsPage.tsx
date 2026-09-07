import { Button, CopyButton, Select } from '@/components/console/primitives';
import { AppLink as Link } from '@/components/runtime/app-link';
import { models, type Usage } from '@/lib/console/domain';
import { ArrowRight, CircleCheck, RefreshCw, Terminal } from 'lucide-react';
import { useState } from 'react';

import {
  Badge,
  demoRoot,
  Empty,
  Field,
  money,
  sourceName,
  type PageProps,
} from '@/components/console/content';
export function IntegrationsPage({ state, t, act, notice }: PageProps) {
  const [tool, setTool] = useState('generic');
  const [selectedModel, setSelectedModel] = useState(
    new URLSearchParams(window.location.search).get('model') ?? models[0].id,
  );
  const [key, setKey] = useState(
    state.keys.find((k) => k.status === 'active')?.id ?? '',
  );
  const [result, setResult] = useState<Usage | null>(null);
  const [pending, setPending] = useState(false);
  const tools = [
    ['generic', t('通用 Chat Completions', 'Generic Chat Completions')],
    ['cline', 'Cline'],
    ['roo', 'Roo Code'],
    ['claude', 'Claude Code'],
    ['codex', 'Codex CLI'],
  ];
  const supported = tool === 'generic';
  const config = JSON.stringify(
    {
      base_url: 'https://api.example.invalid/v1',
      api_key: 'YOUR_API_KEY',
      model: selectedModel,
    },
    null,
    2,
  );
  const run = async (fail = false) => {
    setPending(true);
    setResult(null);
    await new Promise((resolve) => setTimeout(resolve, 350));
    const next = act({
      type: 'request',
      keyId: key,
      model: selectedModel,
      fail,
      requestId: crypto.randomUUID(),
    });
    if (next) {
      setResult(next.usage[0]);
      notice(
        fail
          ? t(
              '请求在推理前失败，无使用扣费。',
              'The request failed before inference. No usage was charged.',
            )
          : t(
              '调用完成，用量和账单已更新。',
              'Request completed. Usage and billing have been updated.',
            ),
      );
    }
    setPending(false);
  };
  return (
    <>
      <div className="cs-callout">
        <Terminal size={18} />
        {t(
          '本页生成配置模板并执行连接诊断，不会发送代码、Key 或提示词到外部服务。',
          'This page generates configuration templates and runs connection diagnostics without sending code, keys, or prompts to external services.',
        )}
      </div>
      <div className="cs-two-column">
        <section className="cs-card">
          <h2>{t('1. 选择工具和模型', '1. Choose a tool and model')}</h2>
          <Field label={t('编程工具', 'Coding tool')}>
            <Select value={tool} onValueChange={(value) => setTool(value)}>
              {tools.map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={t('模型', 'Model')}>
            <Select
              value={selectedModel}
              onValueChange={(value) => setSelectedModel(value)}
            >
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </Select>
          </Field>
          <p>
            <Badge>
              {supported
                ? t('示例协议', 'Example protocol')
                : t('待兼容性验证', 'Compatibility unverified')}
            </Badge>
          </p>
          <p className="cs-muted">
            {supported
              ? t(
                  '模板使用目录模型 ID；服务域名为占位值，正式模型映射与服务地址尚未配置。',
                  'The template uses catalog model IDs. The endpoint is a placeholder; production model mapping and service endpoints are pending.',
                )
              : t(
                  '该工具的完整接入需要验证协议、流式输出、工具调用与错误处理，目前不提供未经验证的配置。',
                  'This tool requires protocol, streaming, tool-call and error-handling validation. Unverified configuration is not provided.',
                )}
          </p>
        </section>
        <section className="cs-card">
          <h2>{t('2. 查看配置模板', '2. Review the template')}</h2>
          {supported ? (
            <>
              <pre className="cs-code">{config}</pre>
              <CopyButton
                value={config}
                label={t('复制', 'Copy')}
                copiedLabel={t('已复制', 'Copied')}
              />
              <p className="cs-muted">
                {t(
                  '真实 Key 应在本地工具内填写。不要把 Key 提交到代码仓库。',
                  'Enter a real key in your local tool. Keep keys out of repositories.',
                )}
              </p>
            </>
          ) : (
            <Empty
              title={t('接入指南待开放', 'Guide not available yet')}
              detail={t(
                '可先用下方诊断体验额度和计费流程。',
                'Use the diagnostic below to explore quota and billing flows.',
              )}
            />
          )}
        </section>
      </div>
      <section className="cs-card">
        <h2>{t('3. 连接诊断', '3. Connection diagnostics')}</h2>
        <p className="cs-muted">
          {t(
            '成功测试会消耗点数或余额；失败测试在推理前终止，不扣费。',
            'A successful test consumes credits or balance. Failed tests stop before inference and do not charge.',
          )}
        </p>
        <Field label={t('使用的 Key', 'Key to use')}>
          <Select value={key} onValueChange={(value) => setKey(value)}>
            <option value="">{t('请选择', 'Select a key')}</option>
            {state.keys.map((k) => (
              <option key={k.id} value={k.id}>
                {k.name} · {sourceName(k.funding, t)} ·{' '}
                {k.status === 'active'
                  ? t('可用', 'Active')
                  : k.status === 'paused'
                    ? t('已停用', 'Paused')
                    : t('已撤销', 'Revoked')}
              </option>
            ))}
          </Select>
        </Field>
        <div className="cs-inline-actions">
          <Button
            className="cs-button primary"
            disabled={!key || pending}
            onClick={() => void run()}
          >
            {pending ? <RefreshCw size={16} /> : <Terminal size={16} />}{' '}
            {t('发起成功调用', 'Run successful request')}
          </Button>
          <Button
            className="cs-button"
            disabled={!key || pending}
            onClick={() => void run(true)}
          >
            {t('测试失败响应', 'Test failure response')}
          </Button>
          <Link className="cs-text-button" href={`${demoRoot}/api-keys`}>
            {t('管理 Key', 'Manage keys')}
          </Link>
        </div>
        {result && (
          <output className="cs-result">
            <CircleCheck size={18} />
            <div>
              <strong>
                {result.status === 'success'
                  ? t('调用已完成', 'Request completed')
                  : t('已记录失败状态', 'Failure recorded')}
              </strong>
              <p>{result.id}</p>
              <span>
                {result.input + result.output} Tokens ·{' '}
                {result.funding === 'plan'
                  ? `${result.points} ${t('点数', 'credits')}`
                  : money(result.cents)}
              </span>
            </div>
            <Link href={`${demoRoot}/usage`}>
              {t('查看用量', 'View usage')}
              <ArrowRight size={16} />
            </Link>
          </output>
        )}
      </section>
    </>
  );
}
