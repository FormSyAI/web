---
name: AURINOVA
description: Bilingual AI infrastructure presented through a precise blue-led editorial system.
colors:
  brand-blue-softest: '#f2f7fc'
  brand-blue-soft: '#e4eef8'
  brand-blue-light: '#8db8e3'
  brand-blue: '#2c6cb5'
  brand-blue-deep: '#1c4a7f'
  brand-blue-ink: '#0b2645'
  brand-gold-soft: '#fff5d8'
  brand-gold-light: '#f7d36b'
  brand-gold: '#f3b322'
  ink: '#121216'
  paper: '#ffffff'
  surface: '#f5f5f3'
  muted-ink: '#626269'
  line: '#dedee3'
  deep-surface: '#09090b'
  auth-error: '#a92019'
  auth-error-surface: '#fff8f7'
  auth-success: '#26764e'
  auth-success-surface: '#f4fbf7'
typography:
  display:
    fontFamily: 'Inter, Geist Sans, PingFang SC, Microsoft YaHei, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(3.35rem, 5.2vw, 5.2rem)'
    fontWeight: 570
    lineHeight: 0.99
    letterSpacing: '-0.04em'
  headline:
    fontFamily: 'Inter, Geist Sans, PingFang SC, Microsoft YaHei, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(2.8rem, 4.5vw, 4.8rem)'
    fontWeight: 560
    lineHeight: 1
    letterSpacing: '-0.04em'
  title:
    fontFamily: 'Inter, Geist Sans, PingFang SC, Microsoft YaHei, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(2rem, 3vw, 3.15rem)'
    fontWeight: 560
    letterSpacing: '-0.035em'
  body:
    fontFamily: 'Inter, Geist Sans, PingFang SC, Microsoft YaHei, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: 'Geist Mono, SFMono-Regular, Consolas, ui-monospace, monospace'
    fontSize: '0.8125rem'
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: '0.04em'
  auth-task-title:
    fontFamily: 'Inter, Geist Sans, PingFang SC, Microsoft YaHei, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(2rem, 2.3vw, 2.55rem)'
    fontWeight: 570
    lineHeight: 1.12
    letterSpacing: '-0.035em'
  auth-field-label:
    fontFamily: 'Inter, Geist Sans, PingFang SC, Microsoft YaHei, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.92rem'
    fontWeight: 540
    lineHeight: 1.35
  auth-helper:
    fontFamily: 'Inter, Geist Sans, PingFang SC, Microsoft YaHei, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.84rem'
    fontWeight: 400
    lineHeight: 1.45
  auth-action:
    fontFamily: 'Geist Mono, SFMono-Regular, Consolas, ui-monospace, monospace'
    fontSize: '0.82rem'
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: '0.035em'
rounded:
  square: '0'
  menu: '8px'
  round: '50%'
spacing:
  xs: '8px'
  sm: '14px'
  md: '20px'
  lg: '32px'
  xl: '48px'
  section: '96px'
  section-large: '112px'
  auth-mobile-gutter: '32px'
components:
  button-primary:
    backgroundColor: '{colors.brand-blue}'
    textColor: '{colors.paper}'
    typography: '{typography.label}'
    rounded: '{rounded.square}'
    padding: '0 18px'
    height: '50px'
  button-primary-hover:
    backgroundColor: '{colors.brand-blue-deep}'
    textColor: '{colors.paper}'
  button-secondary:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    typography: '{typography.label}'
    rounded: '{rounded.square}'
    padding: '0 18px'
    height: '50px'
  pricing-card:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    rounded: '{rounded.square}'
    padding: '32px'
  auth-panel-desktop:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    width: '384px'
  auth-panel-mobile:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    width: '326px'
  auth-input:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    typography: '{typography.body}'
    rounded: '{rounded.square}'
    padding: '0 14px'
    height: '50px'
  auth-touch-target:
    typography: '{typography.auth-action}'
    size: '44px'
  auth-preview:
    backgroundColor: '{colors.brand-blue-softest}'
    textColor: '{colors.brand-blue-deep}'
    typography: '{typography.auth-helper}'
    rounded: '{rounded.square}'
    padding: '10px 12px'
  auth-error-state:
    backgroundColor: '{colors.auth-error-surface}'
    textColor: '{colors.auth-error}'
    typography: '{typography.auth-helper}'
    rounded: '{rounded.square}'
  auth-success-state:
    backgroundColor: '{colors.auth-success-surface}'
    textColor: '{colors.auth-success}'
    typography: '{typography.auth-helper}'
    rounded: '{rounded.square}'
---

# Design System: AURINOVA

Updated: 2026-09-07. The approved visual baseline is `/aurinova-reference`. Preserve its current layout and interactions while migrating FormSy content from `/`. The migration plan lives in [WEBSITE_CONTENT_ARCHITECTURE.md](docs/WEBSITE_CONTENT_ARCHITECTURE.md); concise constraints live in [AGENT.md](AGENT.md). This document describes visual conventions, not proof that reference-page products or services are available.

## Overview

**Creative North Star: "The Infrastructure Ledger"**

AURINOVA presents advanced AI infrastructure with the assurance of a meticulously typeset technical ledger. Broad white fields, crisp rules, large editorial headlines, and ordered data make complex commercial choices feel legible and trustworthy. Brand blue creates the principal visual rhythm through calls to action, full-width section bands, selected states, and interactive feedback; gold appears sparingly as a warm signal within the otherwise cool system.

The system balances enterprise gravity with technical fluency. Sans-serif display and body type carries bilingual explanations clearly, while compact monospace labels identify actions, navigation utilities, metadata, and table headers. Composition stays flat and architectural: hierarchy comes from scale, contrast, borders, and alternating fields more often than elevation.

Authentication extends this world in Operate mode: a blueprint-soft platform pane frames a white, ruled task surface, while progressive forms keep one decision primary at a time. Preview, verification, and consent states are explicit interface structures whose wording and visibility carry product truth.

### Authentication Contract Provenance

- **FORM seed:** `unavailable` (未提供). No authoritative seed key is present in the repository; do not infer or fabricate one.
- **QUALITY BAR path:** `unavailable` (未提供). No authoritative card path is present in the repository; do not infer or fabricate one.

**The Recorded Authority Rule.** FORM seed: `unavailable` (未提供). QUALITY BAR path: `unavailable` (未提供). Both stay unavailable until an authoritative project artifact supplies them.

**Key Characteristics:**

- White editorial canvas with deep-blue section intervals.
- Large, tightly tracked headings paired with readable bilingual body copy.
- Square controls and flat ruled containers.
- Monospace action labels and metadata with tabular numeric alignment.
- Gold reserved for small emphasis moments, especially on dark fields.
- Shared navigation and consistent Chinese/English information structure.
- Task-first authentication with persistent preview truth, live verification gating, and affirmative consent.

## Colors

The palette is a restrained technical blue scale grounded by white, near-black ink, quiet gray rules, and a rare gold accent.

### Primary

- **AURINOVA Blue:** The default action, link emphasis, selection, focus, and interactive fill.
- **Deep Signal Blue:** The hover state for primary actions and a strong full-width section field.
- **Infrastructure Navy:** The deepest branded section field and a high-contrast backdrop for explanatory content.
- **Soft Blueprint Blues:** Quiet hover washes, subtle branded surfaces, and supporting states.

### Secondary

- **Signal Gold:** A scarce accent for high-value labels and moments that need warmth without competing with primary actions.
- **Soft Signal Gold:** Supporting highlight fields and dark-surface typography.

### Neutral

- **Editorial Paper:** The dominant page, control, table, and card surface.
- **Technical Ink:** Primary text, hard button borders, and decisive table rules.
- **Quiet Surface:** Low-contrast tonal separation where a white field needs support.
- **Muted Ink:** Secondary explanations, notes, and table labels.
- **Rule Gray:** Dividers, container edges, navigation borders, and table row separators.
- **Deep Surface:** Announcement and footer fields that frame the white editorial body.

### Semantic Authentication States

- **Authentication Error:** Field errors, failed password requirements, invalid borders, and recovery notices use the dedicated error family; translucent error text is prohibited.
- **Authentication Success:** Satisfied requirements and completion notices use the dedicated success family without competing with the blue primary action.
- **State Surfaces:** Error and success backgrounds remain pale, flat, and one-pixel ruled so status is conveyed by text, icon, and color together.

### Named Rules

**The Blue Rhythm Rule.** Use brand blue to mark major decisions and section changes; large uninterrupted blue fields should punctuate white content rather than dominate every viewport.

**The Gold Signal Rule.** Gold is a small, high-value signal. Keep it out of primary buttons and broad backgrounds.

**The Semantic State Rule.** Authentication error and success colors are functional tokens; never substitute brand blue or opacity-reduced text for them.

## Typography

**Display Font:** Inter with Geist Sans, PingFang SC, Microsoft YaHei, and system sans-serif fallbacks  
**Body Font:** Inter with Geist Sans, PingFang SC, Microsoft YaHei, and system sans-serif fallbacks  
**Label/Mono Font:** Geist Mono with SFMono-Regular, Consolas, and monospace fallbacks

**Character:** The primary sans stack is modern, neutral, and sturdy across Latin and Simplified Chinese. Monospace labels add a technical cadence to actions and data without taking over long-form reading.

### Hierarchy

- **Display:** Large, medium-weight, tightly tracked type for a single page proposition; keep lines balanced and compact.
- **Headline:** Large section statements on brand-blue fields, with near-solid line height and short line lengths.
- **Title:** Subsection and pricing-category headings with slightly softer scale and the same tight editorial tracking.
- **Body:** Regular-weight explanatory copy with generous line height; keep paragraphs around 60–75 characters when layout permits.
- **Label:** Bold compact monospace for buttons, table headers, footer categories, metadata, and utility navigation; uppercase Latin labels are welcome where the content dictionary supplies them.
- **Authentication Task Title:** Medium-weight sans at `clamp(2rem, 2.3vw, 2.55rem)`, with a 1.12 line height and tight `-0.035em` tracking.
- **Authentication Field Label:** Medium sans at `0.92rem` and weight 540; labels stay directly associated with inputs.
- **Authentication Helper:** Regular sans at `0.84rem` with a 1.45 line height for hints, validation, preview explanation, and recovery copy.
- **Authentication Action:** Bold monospace at `0.82rem` with `0.035em` tracking; English actions may be uppercase while Chinese retains natural casing.

### Named Rules

**The Two-Voice Rule.** Sans-serif explains; monospace directs, labels, and quantifies.

**The Bilingual Measure Rule.** Preserve the same hierarchy in Chinese and English, allowing natural line wrapping without shrinking one locale into a secondary treatment.

**The Form Voice Rule.** Sans-serif explains form state and requirements; monospace names the action that advances the task.

## Layout

The reference world uses a centered editorial shell, typically 1320–1392px wide, with 32px desktop gutters. Major sections alternate between open white space and edge-to-edge blue or near-black fields. Hero content favors a broad single-column reading measure; explanatory bands use a two-column split; cards and pricing tables align to the same shell.

Spacing is generous and sectional: approximately 96–112px around primary content blocks, with 24–42px separating headings, copy, and actions. The header is sticky beneath the 48px announcement bar. At tablet widths near 960–1050px, primary navigation collapses and multi-column card/footer grids reduce. Around 680–700px, gutters tighten to 18–20px, actions stack, two-column bands become one column, and wide semantic tables scroll horizontally without compressing numeric content.

Authentication uses a balanced 50/50 split at 1280px and above, with platform context on the left and a centered 384px task panel on the right. From 1024–1279px the split becomes 4:3 to protect the form. At 1023px and below, the platform pane disappears and the task owns the viewport. A 390px viewport uses 32px gutters and a 326px form panel with no horizontal overflow.

**The Shared Edge Rule.** Headlines, cards, tables, and footer content align to the same shell edges even when their background fields span the viewport.

**The Authentication Split Rule.** Preserve 50/50 at wide desktop, 4:3 at intermediate desktop, and a single task pane at 1023px and below; the 390px reference remains exactly 326px wide.

## Elevation & Depth

The system is flat by default. Depth is communicated with tonal contrast, strict borders, sticky layering, and full-width color fields. Small ambient shadows appear only on floating navigation menus; content cards, buttons, and tables remain shadowless at rest.

### Shadow Vocabulary

- **Floating menu:** A soft low-opacity shadow supports mobile and mega-menu overlays while keeping their white surfaces visually light.

### Named Rules

**The Flat Ledger Rule.** Content surfaces earn hierarchy through rules, spacing, and color fields; reserve shadows for overlays that physically sit above the document.

## Shapes

The primary form language is square and ruled. Buttons, pricing cards, table containers, and major content blocks use zero radius with one-pixel borders. Eight-pixel corners are limited to transient navigation menus and compact hover targets. Circles belong to avatars, status marks, or intrinsically round indicators.

**The Square Foundation Rule.** Default to straight edges for structural UI; introduce rounding only when an overlay or compact interactive target needs visual separation.

## Components

### Buttons

- **Shape:** Square with a one-pixel border, compact horizontal padding, and a 48–50px minimum height.
- **Primary:** Brand-blue fill with white bold monospace text; use for the dominant next step.
- **Hover / Focus:** Deepen the blue on hover; pricing-page actions may lift by 2px. All keyboard focus uses an offset blue outline, and arrow icons travel 4px in the action direction.
- **Secondary:** White fill and technical-ink border; invert to an ink field on hover.
- **Touch Baseline:** Authentication controls and icon actions expose at least a 44×44px hit area on compact screens.

### Inputs / Fields

- **Style:** White, square, 50px-high fields with a one-pixel neutral rule and 14px horizontal inset.
- **Focus:** Shift the rule to AURINOVA blue and add a visible offset or soft blue focus indicator.
- **Error / Disabled:** Error text uses the semantic error token at AA contrast; disabled actions retain legible labels and an obvious unavailable state.

### Authentication Preview

- **Disclosure:** A blueprint-soft ruled notice appears before the task whenever live authentication is unavailable.
- **Truth:** Copy explicitly states that no account, session, provider handoff, or email is created; simulated success states repeat the relevant limitation.

### Human Verification & Consent

- **Verification:** Preview mode uses an explicitly local-only check. Live signup requires a real verification widget and a current token, with loading, expiry, failure, and retry states.
- **Consent:** Account creation requires a separate affirmative checkbox linked to the approved Terms of Service and Data Processing Agreement. Passive footer notice never substitutes for acceptance.
- **Availability:** Live signup remains gated until authentication, verification, and approved legal destinations are all configured.

**The Touch Baseline Rule.** Every compact authentication target, including Back and language controls, provides at least a 44×44px hit area.

**The Preview Truth Rule.** Preview styling may demonstrate the complete interaction, but every state must deny real account, session, provider, and email effects until the backing services are enabled.

### Cards / Containers

- **Corner Style:** Square for content cards and pricing jump cards.
- **Background:** White at rest; interactive pricing cards invert to brand blue with white text.
- **Shadow Strategy:** Shadowless at rest.
- **Border:** One-pixel rule gray, with shared borders collapsed between adjacent cards.
- **Internal Padding:** 32px on desktop and 24–28px on compact screens.

### Navigation

The shared navigation combines a 48px announcement rail with a 72px sticky white header. The logo anchors the left edge, page links center, and language/account actions align right. Desktop links use compact sans-serif labels with blue hover or active feedback; utility actions use monospace. On compact screens, replace the link row with a 44px Lucide menu trigger and a bordered two-column menu. Keep one navigation implementation across reference pages and mark the active route with `aria-current`.

### Pricing Tables

Use native table structure with column headers and row headers. Tables span the shell, use a strong two-pixel top rule, one-pixel row dividers, tabular numerals, right-aligned numeric columns, and left-aligned descriptive first columns. Monospace uppercase headers distinguish metadata from values. On small screens, preserve a practical minimum width and allow horizontal scrolling.

### Section Bands

Full-width navy and deep-blue bands reset the page rhythm between dense pricing sections. Pair a large left-aligned headline with concise supporting copy, shifting from a two-column composition to one column on mobile. White text and softened white body copy maintain hierarchy inside the field.

## Do's and Don'ts

### Do:

- **Do** preserve a dominant white field and use blue bands as deliberate chapter breaks.
- **Do** use the supplied AURINOVA logo and the shared reference header across related pages.
- **Do** keep all bilingual strings in typed content dictionaries and preserve hierarchy across locales.
- **Do** use semantic tables with scoped headers and tabular numerals for commercial data.
- **Do** use Lucide icons with restrained stroke weights and purposeful hover motion.
- **Do** maintain visible offset focus outlines and reduced-motion behavior.
- **Do** keep authentication preview, verification, and affirmative consent states explicit and bilingual.
- **Do** preserve the 44px compact touch baseline and the 326px panel at a 390px viewport.

### Don't:

- **Don't** soften structural controls and pricing surfaces with arbitrary rounded cards.
- **Don't** use decorative shadows on static content or create depth that competes with the editorial rules.
- **Don't** spread gold across primary actions, large backgrounds, or routine navigation states.
- **Don't** replace clear type hierarchy with icon-only controls when a text label carries essential meaning.
- **Don't** hard-code translated copy or pricing facts inside presentation components.
- **Don't** compress wide pricing tables until labels or numeric comparisons become ambiguous.
- **Don't** let a preview completion state imply that an account, session, provider handoff, or email exists.
- **Don't** collapse verification and legal consent into a decorative checkbox or passive footer sentence.
