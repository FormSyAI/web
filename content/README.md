# Website content

The production homepage and full AURINOVA route read visible copy from locale dictionaries in this directory.

### Production homepage

- `site.ts`: Simplified Chinese (`zh-CN`)
- `site.en.ts`: English (`en-US`)
- `i18n.ts`: supported locales, default locale, dictionary registry, and shape validation

### Full AURINOVA site

- `aurinova-reference.ts`: English content and shared asset URLs
- `aurinova-reference.zh.ts`: Simplified Chinese copy; unchanged assets and links are inherited from the English source
- `aurinova-reference.i18n.ts`: locale dictionary registry and route content types

## Updating copy

Edit the matching field in both locale files. Keep object keys and collection structures aligned; TypeScript validates both language structures during type checking.

Common sections:

- `ui`: interface labels, accessibility text, metadata, and reusable actions
- `brand`, `announcement`, `navigation`: global brand and header content
- `heroSlides`: homepage hero carousel
- `manifesto`, `platforms`, `operatingLoop`, `architecture`: product narrative
- `assets`, `evidence`, `solutions`, `resources`: supporting sections
- `cta`, `footer`: closing actions and footer navigation

The language preference is stored under `aurinova-locale` in browser storage. The first visit falls back to the browser language, with Chinese as the application default.

Both `/` and `/aurinova-reference` share that preference, so switching language on one route updates the other route on the next visit.
