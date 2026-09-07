'use client';

import { ArrowRight, Boxes, Gauge, Sparkles } from 'lucide-react';
import { AppLink as Link } from '@/components/runtime/app-link';
import { useEffect } from 'react';

import { useI18n } from '@/components/i18n/i18n-provider';
import { AurinovaReferenceFooter } from '@/components/site/aurinova-reference-footer';
import { AurinovaReferenceHeader } from '@/components/site/aurinova-reference-header';
import { CodingPlanOfferings } from '@/components/site/coding-plan-offerings';
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
              href={content.primary.href}
            >
              {content.primary.label}
              <ArrowRight size={17} />
            </Link>
            <Link
              className="pr-button pr-button-outline"
              href={content.secondary.href}
            >
              {content.secondary.label}
            </Link>
          </div>
        </section>
        <CodingPlanOfferings />
        <nav
          className="pr-jumps pr-shell"
          aria-label={content.ui.pricingSections}
        >
          {content.plans.map((plan, i) => (
            <a href={`#${plan.id}`} key={plan.id}>
              <span className="pr-glyph" aria-hidden="true">
                {i === 0 ? <Gauge /> : i === 1 ? <Sparkles /> : <Boxes />}
              </span>
              <h2>{plan.title}</h2>
              <p>{plan.description}</p>
              <strong>
                {content.ui.seeDetails}
                <ArrowRight size={16} />
              </strong>
            </a>
          ))}
        </nav>
        {content.plans.map((plan) => (
          <section key={plan.id} id={plan.id}>
            <div className="pr-band">
              <div className="pr-shell pr-section-intro">
                <h2>{plan.title}</h2>
                <p>{plan.description}</p>
              </div>
            </div>
            <div className="pr-section pr-shell pr-plan-scope">
              <h2>{content.ui.scope}</h2>
              <ul>
                {plan.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="pr-description">{plan.pricing}</p>
              <Link
                className="pr-button pr-button-outline"
                href={content.primary.href}
              >
                {content.primary.label}
                <ArrowRight size={17} />
              </Link>
            </div>
          </section>
        ))}
        <section className="pr-section pr-shell" id="comparison">
          <h2>{content.ui.compare}</h2>
          <PricingTable
            label={content.ui.compare}
            headers={content.comparison.headers}
            rows={content.comparison.rows}
          />
          <p className="pr-description">{content.comparison.note}</p>
        </section>
        <section className="pr-section pr-shell pr-faq" id="faq">
          <h2>{content.ui.faq}</h2>
          {content.faq.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
      </div>
      <AurinovaReferenceFooter />
    </main>
  );
}
