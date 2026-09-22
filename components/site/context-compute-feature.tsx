import AppImage from '@/components/runtime/app-image';

const featureIcons: Record<string, string> = {
  database: '/icons/server-2.svg',
  shield: '/icons/shield.svg',
  lightning: '/icons/dial.svg',
  growth: '/icons/stairs-up.svg',
};

const diagramIcons: Record<string, string> = {
  documents: '/icons/files-pen.svg',
  tools: '/icons/gear.svg',
  users: '/icons/nodes-2.svg',
  check: '/icons/shield.svg',
  analytics: '/icons/layers.svg',
  cube: '/icons/cube.svg',
  evolve: '/icons/stairs-up.svg',
};

type ContextComputeContent = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  description: string;
  benefits: readonly {
    icon: string;
    title: string;
    detail: string;
  }[];
  caption: string;
  diagram: {
    centerTitle: readonly string[];
    labels: {
      understand: string;
      control: string;
      learn: string;
      validate: string;
    };
    left: readonly {
      icon: string;
      title: string;
      detail: string;
    }[];
    right: readonly {
      icon: string;
      title: string;
      detail: string;
    }[];
  };
};

function DiagramCallouts({
  items,
  side,
}: {
  items: ContextComputeContent['diagram']['left'];
  side: 'left' | 'right';
}) {
  return (
    <div className={`fw-context-callouts is-${side}`}>
      {items.map((item) => (
        <article className="fw-context-callout" key={item.title}>
          <AppImage
            src={diagramIcons[item.icon]}
            alt=""
            width={48}
            height={54}
          />
          <div>
            <strong>{item.title}</strong>
            <span>{item.detail}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ContextComputeFeature({
  content,
}: {
  content: ContextComputeContent;
}) {
  return (
    <section className="fw-context-compute" id="platform">
      <div className="fw-shell fw-context-compute-grid">
        <div className="fw-context-compute-copy" id="context-compute">
          <p className="fw-context-compute-eyebrow">{content.eyebrow}</p>
          <h2>
            <span>{content.titleLead}</span>{' '}
            <em>{content.titleAccent}</em>
          </h2>
          <p className="fw-context-compute-subtitle">{content.subtitle}</p>
          <p className="fw-context-compute-description">
            {content.description}
          </p>

          <ul className="fw-context-benefits">
            {content.benefits.map((benefit) => (
              <li key={benefit.title}>
                <AppImage
                  src={featureIcons[benefit.icon]}
                  alt=""
                  width={64}
                  height={74}
                />
                <strong>{benefit.title}</strong>
                <span>{benefit.detail}</span>
              </li>
            ))}
          </ul>

        </div>

        <figure className="fw-context-diagram" id="evidence-learning">
          <div className="fw-context-diagram-surface">
            <svg
              className="fw-context-diagram-lines"
              viewBox="0 0 1000 640"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <linearGradient id="fw-context-line" x1="0" x2="1">
                  <stop offset="0" stopColor="#8fb6ff" />
                  <stop offset="1" stopColor="#326fdf" />
                </linearGradient>
              </defs>
              <circle cx="500" cy="320" r="188" />
              <circle cx="500" cy="320" r="245" />
              <path d="M 268 154 C 354 154 344 204 405 232" />
              <path d="M 268 320 H 405" />
              <path d="M 268 486 C 354 486 344 436 405 408" />
              <path d="M 732 154 C 646 154 656 204 595 232" />
              <path d="M 732 320 H 595" />
              <path d="M 732 486 C 646 486 656 436 595 408" />
              <circle className="fw-context-line-node" cx="405" cy="232" r="5" />
              <circle className="fw-context-line-node" cx="405" cy="320" r="5" />
              <circle className="fw-context-line-node" cx="405" cy="408" r="5" />
              <circle className="fw-context-line-node" cx="595" cy="232" r="5" />
              <circle className="fw-context-line-node" cx="595" cy="320" r="5" />
              <circle className="fw-context-line-node" cx="595" cy="408" r="5" />
            </svg>

            <DiagramCallouts items={content.diagram.left} side="left" />

            <div className="fw-context-core">
              <span className="fw-context-orbit-label is-top">
                {content.diagram.labels.understand}
              </span>
              <span className="fw-context-orbit-label is-left">
                {content.diagram.labels.control}
              </span>
              <span className="fw-context-orbit-label is-right">
                {content.diagram.labels.learn}
              </span>
              <span className="fw-context-orbit-label is-bottom">
                {content.diagram.labels.validate}
              </span>
              <AppImage src={diagramIcons.cube} alt="" width={220} height={252} />
              <strong>
                {content.diagram.centerTitle.map((title) => (
                  <span key={title}>{title}</span>
                ))}
              </strong>
            </div>

            <DiagramCallouts items={content.diagram.right} side="right" />

            <svg
              className="fw-context-middle-lines"
              viewBox="0 0 1000 640"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M 304 320 H 405" />
              <path d="M 696 320 H 595" />
            </svg>
          </div>
          <figcaption>{content.caption}</figcaption>
          <ul className="fw-context-diagram-sr-list">
            {[...content.diagram.left, ...content.diagram.right].map((item) => (
              <li key={`${item.title}-${item.detail}`}>
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
        </figure>
      </div>
    </section>
  );
}
