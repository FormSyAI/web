'use client';

import { ArrowRight, Boxes, Gauge, Sparkles } from 'lucide-react';
import { AppLink as Link } from '@/components/runtime/app-link';
import { useEffect } from 'react';

import { useI18n } from '@/components/i18n/i18n-provider';
import { AurinovaReferenceFooter } from '@/components/site/aurinova-reference-footer';
import { AurinovaReferenceHeader } from '@/components/site/aurinova-reference-header';
import { pricingDictionaries } from '@/content/pricing.i18n';

function PricingTable({
  headers,
  rows,
  label,
}: {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
  label: string;
}) {
  return (
    <div className="pr-table-wrap">
      <table aria-label={label}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={cell} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={`${row[0]}-${cell}-${index}`}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Notes({ items }: { items: readonly string[] }) {
  return (
    <ul className="pr-notes">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function PricingPage() {
  const { locale } = useI18n();
  const content = pricingDictionaries[locale];

  useEffect(() => {
    document.title = content.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', content.meta.description);
  }, [content.meta]);

  return (
    <main className="pr-page">
      <a className="skip-link" href="#pricing-main">
        {content.ui.skip}
      </a>
      <AurinovaReferenceHeader current="pricing" />
      <div id="pricing-main">
        <section className="pr-hero pr-shell">
          <h1>{content.hero.title}</h1>
          <p>{content.hero.description}</p>
          <div className="pr-actions">
            <Link
              className="pr-button pr-button-solid"
              href="/aurinova-reference/signup"
            >
              {content.getStarted}
              <ArrowRight size={17} />
            </Link>
            <Link className="pr-button pr-button-outline" href="/contact">
              {content.contact}
            </Link>
          </div>
        </section>

        <nav
          className="pr-jumps pr-shell"
          aria-label={content.ui.pricingSections}
        >
          {content.jumpCards.map((card, index) => (
            <a href={card.href} key={card.title}>
              <span className="pr-glyph" aria-hidden="true">
                {index === 0 ? (
                  <Gauge />
                ) : index === 1 ? (
                  <Sparkles />
                ) : (
                  <Boxes />
                )}
              </span>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <strong>
                {content.seePricing}
                <ArrowRight size={16} />
              </strong>
            </a>
          ))}
        </nav>

        <section className="pr-band" id="serverless-pricing">
          <div className="pr-shell pr-section-intro">
            <h2>{content.serverless.title}</h2>
            <div>
              <p>{content.serverless.description}</p>
              <Link href="/docs">
                {content.serverless.docs}
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section className="pr-section pr-shell">
          <h2>{content.embeddings}</h2>
          <PricingTable
            label={content.embeddings}
            headers={content.embeddingHeaders}
            rows={content.embeddingRows}
          />
        </section>

        <section className="pr-band" id="fine-tuning-pricing">
          <div className="pr-shell pr-section-intro">
            <h2>{content.training.title}</h2>
            <p>{content.training.intro}</p>
          </div>
        </section>

        <section className="pr-section pr-shell">
          <h2>{content.training.managed}</h2>
          <p className="pr-description">
            {content.training.managedDescription}
          </p>
          <PricingTable
            label={content.training.managed}
            headers={content.training.managedHeaders}
            rows={content.managedRows}
          />
          <Notes items={content.training.notes} />
          <div className="pr-subsection">
            <h2>{content.training.serverlessApi}</h2>
            <p className="pr-description">
              {content.training.serverlessDescription}
            </p>
            <PricingTable
              label={content.training.serverlessApi}
              headers={content.training.serverlessHeaders}
              rows={content.serverlessTrainingRows}
            />
            <Notes items={content.training.serverlessNotes} />
          </div>
          <div className="pr-subsection pr-dedicated">
            <h2>{content.training.dedicated}</h2>
            <p className="pr-description">
              {content.training.dedicatedDescription}
            </p>
          </div>
        </section>

        <section className="pr-band" id="on-demand-pricing">
          <div className="pr-shell pr-section-intro">
            <h2>{content.onDemand.title}</h2>
            <p>{content.onDemand.intro}</p>
          </div>
        </section>
        <section className="pr-section pr-shell">
          <h2>{content.onDemand.subtitle}</h2>
          <PricingTable
            label={content.onDemand.subtitle}
            headers={content.onDemand.headers}
            rows={content.gpuRows}
          />
          <Notes items={[content.onDemand.note]} />
        </section>
      </div>
      <AurinovaReferenceFooter />
    </main>
  );
}
