import { ArrowRight } from 'lucide-react';
import AppImage from '@/components/runtime/app-image';
import documentsIcon from '@/icon-documents.png';
import analyticsIcon from '@/icon-analytics.png';
import cubeIcon from '@/icon-cube.png';
import shieldIcon from '@/icon-shield.png';

type DataDomain = {
  title: string;
  detail: string;
  tag: string;
};

type DataSignal = {
  title: string;
  detail: string;
};

export type DataDomainOverviewContent = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  description: string;
  domains: readonly DataDomain[];
  signals: readonly DataSignal[];
  caption: string;
};

const domainIcons = [documentsIcon, cubeIcon, analyticsIcon] as const;
const signalIcons = [shieldIcon, documentsIcon, analyticsIcon] as const;

export function DataDomainOverview({
  content,
}: {
  content: DataDomainOverviewContent;
}) {
  return (
    <section className="fw-data-domains" id="overview">
      <div className="fw-shell fw-data-domains-grid">
        <div className="fw-data-domains-copy">
          <p className="fw-data-domains-eyebrow">{content.eyebrow}</p>
          <h2>
            <span>{content.titleLead}</span>
            <em>{content.titleAccent}</em>
          </h2>
          <p className="fw-data-domains-subtitle">{content.subtitle}</p>
          <p className="fw-data-domains-description">
            {content.description}
          </p>
          <ul className="fw-data-signal-list">
            {content.signals.map((signal, index) => (
              <li key={signal.title}>
                <AppImage
                  src={signalIcons[index]}
                  alt=""
                  width={72}
                  height={72}
                />
                <strong>{signal.title}</strong>
                <span>{signal.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="fw-data-domains-visual">
          <div className="fw-domain-flow">
            {content.domains.map((domain, index) => (
              <div className="fw-domain-step" key={domain.title}>
                <article className="fw-domain-card">
                  <AppImage
                    src={domainIcons[index]}
                    alt=""
                    width={160}
                    height={170}
                  />
                  <h3>{domain.title}</h3>
                  <p>{domain.detail}</p>
                </article>
                {index < content.domains.length - 1 && (
                  <ArrowRight className="fw-domain-arrow" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
          <div className="fw-domain-rail">
            {content.domains.map((domain) => (
              <div className="fw-domain-rail-item" key={domain.tag}>
                <span />
                <strong>{domain.tag}</strong>
              </div>
            ))}
          </div>
        </div>
        <p className="fw-data-domains-caption">{content.caption}</p>
      </div>
    </section>
  );
}
