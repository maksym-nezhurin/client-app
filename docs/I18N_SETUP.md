# i18n (Internationalization) Setup

## Overview

This application uses **i18next** for internationalization with translations stored locally in the repository. This eliminates external package dependencies and ensures Vercel deployments work smoothly.

## Supported Languages

- 🇬🇧 **English (en)** - Default
- 🇺🇦 **Ukrainian (uk)**
- 🇵🇱 **Polish (pl)**

## Project Structure

```
apps/client/
├── public/locales/          # Translation files (committed to git)
│   ├── en/
│   │   ├── common.json
│   │   ├── auth.json
│   │   ├── cars.json
│   │   └── ... (10 namespaces)
│   ├── pl/
│   │   └── ... (same structure)
│   └── uk/
│       └── ... (same structure)
└── lib/i18n.ts             # i18next configuration
```

## Translation Namespaces

The application uses modular translation files organized by feature:

1. **common** - Common UI elements (buttons, labels, etc.)
2. **auth** - Authentication related
3. **profile** - User profile
4. **menu** - Navigation menu
5. **users** - User management
6. **cars** - Car-related content
7. **scrapper** - Scrapper functionality
8. **api** - API client settings
9. **time** - Time-related translations
10. **errors** - Error messages

## Usage in Components

### Basic Usage

```tsx
import { useTypedTranslation } from '@/lib/i18n';

function MyComponent() {
  const { t } = useTypedTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('auth.login_success')}</p>
    </div>
  );
}
```

### With Specific Namespace

```tsx
import { useTypedTranslation } from '@/lib/i18n';

function CarComponent() {
  const { t } = useTypedTranslation('cars');
  
  return <h1>{t('title')}</h1>; // Uses cars.title
}
```

### With Interpolation

```tsx
const { t } = useTypedTranslation();

// Translation: "Password must be at least {{count}} characters"
<p>{t('auth.password_min_length', { count: 8 })}</p>
```

### Language Detection

The application automatically detects the user's language using:

1. Query parameter (`?lng=pl`)
2. Cookie (`i18next`)
3. Local storage (`i18nextLng`)
4. Browser language
5. Fallback to English

### Changing Language Programmatically

```tsx
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  return (
    <button onClick={() => i18n.changeLanguage('pl')}>
      Switch to Polish
    </button>
  );
}
```

## Configuration

### i18next Setup (`lib/i18n.ts`)

- **Backend**: HTTP Backend loads translations from `/locales/{{lng}}/{{ns}}.json`
- **Language Detection**: Auto-detects from URL, cookies, localStorage, or browser
- **Fallback**: English (`en`) is used if translation is missing
- **React Integration**: Uses `react-i18next` for React components

### Key Features

✅ **Client-side only** - Translations load on the client
✅ **HTTP Backend** - Loads translations from public folder
✅ **Language detection** - Automatic user language detection
✅ **Local storage** - Remembers user's language preference
✅ **No build scripts** - Translations are static JSON files
✅ **Vercel-friendly** - No external dependencies or build issues

## Adding New Translations

1. **Add translation to all language files**:
   ```bash
   public/locales/en/[namespace].json
   public/locales/uk/[namespace].json
   public/locales/pl/[namespace].json
   ```

2. **Use in components**:
   ```tsx
   t('namespace.new_key')
   ```

## Updating Translations

All translation files are committed to git in `public/locales/`. To update:

1. Edit the JSON files directly in `public/locales/{lang}/{namespace}.json`
2. Commit changes to git
3. Deploy - translations are included in the build

## Dependencies

```json
{
  "i18next": "^25.2.1",
  "i18next-browser-languagedetector": "^8.1.0",
  "i18next-http-backend": "^3.0.2",
  "react-i18next": "^15.5.2"
}
```

## Migration from @reelo/i18n

This project previously used a git-hosted `@reelo/i18n` package, which caused Vercel build issues. The setup has been simplified:

**Before**:
- Git-hosted package with build scripts
- Required `pnpm-workspace.yaml` and `onlyBuiltDependencies`
- Complex build pipeline

**After**:
- Local translation files in `public/locales/`
- Direct i18next dependencies
- No build scripts, no workspace configuration
- Simpler, more maintainable setup

## Troubleshooting

### Translations not loading

1. Check browser console for 404 errors on `/locales/` files
2. Verify files exist in `public/locales/{lang}/{namespace}.json`
3. Check network tab for failed HTTP requests

### Wrong language showing

1. Check localStorage: `localStorage.getItem('i18nextLng')`
2. Clear cookies and localStorage
3. Add `?lng=en` to URL to force a language

### Missing translations

1. Verify the key exists in the JSON file
2. Check the namespace is loaded
3. Fallback to English is automatic if translation missing

## Best Practices

1. **Always provide English translations** - It's the fallback language
2. **Use namespaces** - Keep translations organized by feature
3. **Consistent keys** - Use dot notation (e.g., `auth.login.title`)
4. **Interpolation** - Use `{{variable}}` for dynamic content
5. **Pluralization** - Use i18next's pluralization features for counts
6. **Context** - Add context to translations when meaning differs

## References

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [Next.js i18n Guide](https://nextjs.org/docs/advanced-features/i18n-routing)
