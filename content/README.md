# Website content

The production homepage reads all visible copy from locale dictionaries in this directory.

- `site.ts`: Simplified Chinese (`zh-CN`)
- `site.en.ts`: English (`en-US`)
- `i18n.ts`: supported locales, default locale, dictionary registry, and shape validation

## Updating copy

Edit the matching field in both locale files. Keep object keys and collection structures aligned; TypeScript validates the English dictionary against the Chinese source shape during type checking.

Common sections:

- `ui`: interface labels, accessibility text, metadata, and reusable actions
- `brand`, `announcement`, `navigation`: global brand and header content
- `heroSlides`: homepage hero carousel
- `manifesto`, `platforms`, `operatingLoop`, `architecture`: product narrative
- `assets`, `evidence`, `solutions`, `resources`: supporting sections
- `cta`, `footer`: closing actions and footer navigation

The language preference is stored under `aurinova-locale` in browser storage. The first visit falls back to the browser language, with Chinese as the application default.
