# Translation System Migration - Summary

## Problem

The application was using a git-hosted package `@reelo/i18n` that required build scripts during installation. This caused Vercel deployment failures:

```
ERR_PNPM_PREPARE_PACKAGE  Failed to prepare git-hosted package
@reelo/i18n@1.0.0 pnpm-install: `pnpm install`
Exit status 1
```

The package had:
- A `prepare` script that ran `pnpm install` and `npm run build`
- TypeScript dependencies needed for compilation
- Outdated lockfile that failed in CI environments
- Required `pnpm-workspace.yaml` with `onlyBuiltDependencies` configuration

## Solution: Local Translations

Migrated from external git-hosted package to **local translation files**, making the repository truly standalone and Vercel-friendly.

## Changes Made

### 1. **Copied Translations Locally**
```
public/locales/
├── en/          # English translations
├── pl/          # Polish translations
└── uk/          # Ukrainian translations
    ├── common.json
    ├── auth.json
    ├── cars.json
    ├── profile.json
    ├── menu.json
    ├── users.json
    ├── scrapper.json
    ├── api.json
    ├── time.json
    ├── errors.json
    ├── client.json
    └── system.json
```

### 2. **Updated Dependencies**

**Removed:**
```json
"@reelo/i18n": "git+https://github.com/maksym-nezhurin/reelo-i18n.git"
```

**Added:**
```json
"i18next": "^25.2.1",
"i18next-browser-languagedetector": "^8.1.0",
"i18next-http-backend": "^3.0.2",
"react-i18next": "^15.5.2"
```

### 3. **Created Local i18n Configuration**

Created `lib/i18n.ts` with:
- HTTP Backend to load from `/locales/{{lng}}/{{ns}}.json`
- Language detection (URL, cookie, localStorage, browser)
- React-i18next integration
- Type-safe hooks: `useTypedTranslation()`

### 4. **Simplified Build Scripts**

**Before:**
```json
"scripts": {
  "postinstall": "node scripts/copy-locales.js || true",
  "build": "echo '📦 Copying translations...' && node scripts/copy-locales.js && next build"
}
```

**After:**
```json
"scripts": {
  "build": "next build"
}
```

### 5. **Removed Workspace Configuration**

**Deleted files:**
- `pnpm-workspace.yaml` - No longer needed
- `scripts/copy-locales.js` - Not needed with local translations

**Cleaned `.npmrc`:**
```
enable-pre-post-scripts=true
```

### 6. **Fixed Configuration Issues**

- Renamed `versel.json` → `vercel.json` (typo fix)
- Added font download disable for Vercel builds

### 7. **Created Documentation**

Added comprehensive documentation:
- `docs/I18N_SETUP.md` - Complete i18n usage guide
- `TRANSLATION_MIGRATION.md` - This migration summary

## Benefits

✅ **No Build Scripts** - Translations are static JSON files
✅ **No Workspace Config** - Truly standalone repository
✅ **Vercel-Friendly** - No complex pnpm configurations needed
✅ **Faster Builds** - No git package cloning or compilation
✅ **Simpler Maintenance** - Edit translations directly in the repo
✅ **Better Control** - All translations versioned with the code
✅ **No External Dependencies** - Everything self-contained

## Usage (No Changes Required)

The API remains the same, so **no code changes are needed** in components:

```tsx
import { useTypedTranslation } from '@/lib/i18n';

function MyComponent() {
  const { t } = useTypedTranslation();
  return <h1>{t('common.welcome')}</h1>;
}
```

## Deployment

### Vercel Configuration

**Required Settings:**
- **Root Directory**: `apps/client` (or leave empty for monorepo root)
- **Build Command**: `pnpm run build`
- **Install Command**: `pnpm install --no-frozen-lockfile`
- **Node Version**: 24.x (set in `package.json`)

### Environment Variables

No environment variables needed for translations.

### Build Process

1. Vercel clones the repository
2. Runs `pnpm install --no-frozen-lockfile`
3. Runs `next build`
4. Translations are included in the build (from `public/locales/`)

## Testing Locally

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Test build
pnpm build

# Test production
pnpm start
```

## Updating Translations

### To add/update translations:

1. Edit files in `public/locales/{lang}/{namespace}.json`
2. Commit changes to git
3. Push to remote
4. Vercel will automatically deploy with updated translations

### To add a new language:

1. Create folder: `public/locales/{lang}/`
2. Copy all JSON files from `en/` folder
3. Translate the content
4. Add to `lib/i18n.ts`:
   ```ts
   export const SUPPORTED_LANGUAGES = ['en', 'uk', 'pl', 'de']; // Add 'de'
   ```

## Rollback Plan

If issues arise, the old `@reelo/i18n` package is still available at:
```
git+https://github.com/maksym-nezhurin/reelo-i18n.git
```

But would require re-adding:
- `pnpm-workspace.yaml` with `onlyBuiltDependencies`
- `scripts/copy-locales.js`
- Build script modifications

## Files Changed

### Added:
- `public/locales/` - All translation files
- `docs/I18N_SETUP.md` - Documentation
- `TRANSLATION_MIGRATION.md` - This file

### Modified:
- `package.json` - Dependencies and scripts
- `lib/i18n.ts` - Complete rewrite for local setup
- `.npmrc` - Simplified configuration
- `vercel.json` - Fixed typo and added build env

### Deleted:
- `pnpm-workspace.yaml` - No longer needed
- `scripts/copy-locales.js` - Not needed with local translations
- `versel.json` - Fixed typo → renamed to `vercel.json`

## Migration Date

January 31, 2026

## Status

✅ **Complete** - Ready for Vercel deployment
✅ **Tested** - Local build successful
✅ **Documented** - Full documentation provided

---

**Next Steps**: Push changes to git and deploy to Vercel!
