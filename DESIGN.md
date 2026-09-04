---
name: AURINOVA
description: Bilingual AI infrastructure presented through a precise blue-led editorial system.
colors:
  brand-blue-softest: "#f2f7fc"
  brand-blue-soft: "#e4eef8"
  brand-blue-light: "#8db8e3"
  brand-blue: "#2c6cb5"
  brand-blue-deep: "#1c4a7f"
  brand-blue-ink: "#0b2645"
  brand-gold-soft: "#fff5d8"
  brand-gold-light: "#f7d36b"
  brand-gold: "#f3b322"
  ink: "#121216"
  paper: "#ffffff"
  surface: "#f5f5f3"
  muted-ink: "#626269"
  line: "#dedee3"
  deep-surface: "#09090b"
typography:
  display:
    fontFamily: "Inter, Geist Sans, PingFang SC, Microsoft YaHei, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.35rem, 5.2vw, 5.2rem)"
    fontWeight: 570
    lineHeight: 0.99
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, Geist Sans, PingFang SC, Microsoft YaHei, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.8rem, 4.5vw, 4.8rem)"
    fontWeight: 560
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Inter, Geist Sans, PingFang SC, Microsoft YaHei, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3vw, 3.15rem)"
    fontWeight: 560
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Inter, Geist Sans, PingFang SC, Microsoft YaHei, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Geist Mono, SFMono-Regular, Consolas, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "0.04em"
rounded:
  square: "0"
  menu: "8px"
  round: "50%"
spacing:
  xs: "8px"
  sm: "14px"
  md: "20px"
  lg: "32px"
  xl: "48px"
  section: "96px"
  section-large: "112px"
components:
  button-primary:
    backgroundColor: "{colors.brand-blue}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0 18px"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.brand-blue-deep}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0 18px"
    height: "50px"
  pricing-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "32px"
---

# Design System: AURINOVA

## Overview

**Creative North Star: "The Infrastructure Ledger"**

AURINOVA presents advanced AI infrastructure with the assurance of a meticulously typeset technical ledger. Broad white fields, crisp rules, large editorial headlines, and ordered data make complex commercial choices feel legible and trustworthy. Brand blue creates the principal visual rhythm through calls to action, full-width section bands, selected states, and interactive feedback; gold appears sparingly as a warm signal within the otherwise cool system.

The system balances enterprise gravity with technical fluency. Sans-serif display and body type carries bilingual explanations clearly, while compact monospace labels identify actions, navigation utilities, metadata, and table headers. Composition stays flat and architectural: hierarchy comes from scale, contrast, borders, and alternating fields more often than elevation.

**Key Characteristics:**

- White editorial canvas with deep-blue section intervals.
- Large, tightly tracked headings paired with readable bilingual body copy.
- Square controls and flat ruled containers.
- Monospace action labels and metadata with tabular numeric alignment.
- Gold reserved for small emphasis moments, especially on dark fields.
- Shared navigation and consistent Chinese/English information structure.

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

### Named Rules

**The Blue Rhythm Rule.** Use brand blue to mark major decisions and section changes; large uninterrupted blue fields should punctuate white content rather than dominate every viewport.

**The Gold Signal Rule.** Gold is a small, high-value signal. Keep it out of primary buttons and broad backgrounds.

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

### Named Rules

**The Two-Voice Rule.** Sans-serif explains; monospace directs, labels, and quantifies.

**The Bilingual Measure Rule.** Preserve the same hierarchy in Chinese and English, allowing natural line wrapping without shrinking one locale into a secondary treatment.

## Layout

The reference world uses a centered editorial shell, typically 1320–1392px wide, with 32px desktop gutters. Major sections alternate between open white space and edge-to-edge blue or near-black fields. Hero content favors a broad single-column reading measure; explanatory bands use a two-column split; cards and pricing tables align to the same shell.

Spacing is generous and sectional: approximately 96–112px around primary content blocks, with 24–42px separating headings, copy, and actions. The header is sticky beneath the 48px announcement bar. At tablet widths near 960–1050px, primary navigation collapses and multi-column card/footer grids reduce. Around 680–700px, gutters tighten to 18–20px, actions stack, two-column bands become one column, and wide semantic tables scroll horizontally without compressing numeric content.

**The Shared Edge Rule.** Headlines, cards, tables, and footer content align to the same shell edges even when their background fields span the viewport.

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

### Don't:

- **Don't** soften structural controls and pricing surfaces with arbitrary rounded cards.
- **Don't** use decorative shadows on static content or create depth that competes with the editorial rules.
- **Don't** spread gold across primary actions, large backgrounds, or routine navigation states.
- **Don't** replace clear type hierarchy with icon-only controls when a text label carries essential meaning.
- **Don't** hard-code translated copy or pricing facts inside presentation components.
- **Don't** compress wide pricing tables until labels or numeric comparisons become ambiguous.
