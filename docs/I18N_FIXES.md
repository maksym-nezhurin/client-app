# i18n Translation Fixes

## Issue

Translation keys like `client.actions.start_searching.title` were not being translated because:

1. The `client` namespace was not included in the `NAMESPACES` array in `lib/i18n.ts`
2. Components were using `useTypedTranslation()` without specifying the namespace (defaulting to `'common'`)
3. Translation keys included the namespace prefix (e.g., `t('client.nav.browse')`)

## Solution

### 1. Added Missing Namespaces

Updated `lib/i18n.ts` to include all available namespaces:

```typescript
export const NAMESPACES = [
  'common',
  'auth',
  'profile',
  'menu',
  'users',
  'cars',
  'scrapper',
  'api',
  'time',
  'errors',
  'client',    // ✅ Added
  'system',    // ✅ Added
] as const;
```

### 2. Updated Component Namespace Usage

Changed components to explicitly specify the `'client'` namespace:

**Before:**
```tsx
const { t } = useTypedTranslation();
// ...
{t('client.actions.start_searching.title')}
```

**After:**
```tsx
const { t } = useTypedTranslation('client');
// ...
{t('actions.start_searching.title')}
```

### 3. Removed Namespace Prefixes from Translation Keys

All translation keys were updated to remove the `client.` prefix since the namespace is now specified in the hook:

- `t('client.nav.browse')` → `t('nav.browse')`
- `t('client.actions.start_searching.title')` → `t('actions.start_searching.title')`
- `t('client.account_menu.label')` → `t('account_menu.label')`

### 4. Added Missing Translation Key

Added the missing `explore` key to all language files:

**English:**
```json
"nav": {
  "browse": "Browse",
  "explore": "Explore",  // ✅ Added
  "sell": "Sell",
  ...
}
```

**Polish:**
```json
"nav": {
  "browse": "Przeglądaj",
  "explore": "Odkrywaj",  // ✅ Added
  "sell": "Sprzedaż",
  ...
}
```

**Ukrainian:**
```json
"nav": {
  "browse": "Пошук",
  "explore": "Досліджуй",  // ✅ Added
  "sell": "Продаж",
  ...
}
```

## Files Modified

### Core Configuration
- `lib/i18n.ts` - Added `'client'` and `'system'` namespaces

### Components Updated (7 files)
- `components/nav/Navbar.tsx`
- `components/sections/ActionCardsSection.tsx`
- `components/sections/PartnerSection.tsx`
- `components/sections/LatestAnnouncementsSection.tsx`
- `app/(admin)/account/layout.tsx`
- `app/(admin)/account/page.tsx`
- `app/not-found.tsx`

### Settings Pages Updated (5 files)
- `app/(admin)/account/settings/page.tsx`
- `app/(admin)/account/settings/billing/page.tsx`
- `app/(admin)/account/settings/notifications/page.tsx`
- `app/(admin)/account/settings/preferences/page.tsx`
- `app/(admin)/account/settings/privacy/page.tsx`

### Translation Files Updated (3 files)
- `public/locales/en/client.json` - Added `explore` key
- `public/locales/pl/client.json` - Added `explore` key
- `public/locales/uk/client.json` - Added `explore` key

## Usage Guide

### Using the `client` Namespace

For any component using translations from the `client.json` file:

```tsx
import { useTypedTranslation } from '@/lib/i18n';

function MyComponent() {
  const { t } = useTypedTranslation('client');
  
  return (
    <div>
      <h1>{t('nav.browse')}</h1>
      <p>{t('actions.start_searching.description')}</p>
    </div>
  );
}
```

### Available `client` Namespace Keys

- `nav.*` - Navigation items (browse, explore, sell, about, list, login, logout, dashboard, settings, billing)
- `actions.*` - Action cards (start_searching, list_car, create_account)
- `account_menu.*` - Account dropdown menu
- `account.*` - Account dashboard and pages
- `account_settings.*` - Account settings pages
- `account_cars.*` - Car management pages
- `browse.*` - Browse page
- `home.*` - Homepage sections
- `hero.*` - Hero section
- `features.*` - Features section
- `partners.*` - Partners section
- `filters.*` - Filter UI elements

### Using Other Namespaces

For components using other translation namespaces:

```tsx
// Auth translations
const { t } = useTypedTranslation('auth');

// Common translations
const { t } = useTypedTranslation('common');

// Multiple namespaces
const { t } = useTypedTranslation(['client', 'common']);
```

## Testing

To verify translations are working:

1. Start the dev server: `pnpm dev`
2. Open the browser and check the console for any missing translation warnings
3. Navigate to different pages and verify all text is properly translated
4. Switch languages using the market selector in the navbar
5. Check that all three languages (English, Polish, Ukrainian) display correctly

## Common Issues

### Issue: Translation shows the key instead of translated text

**Cause:** Namespace not specified or wrong key
**Solution:** Ensure `useTypedTranslation('client')` is used and the key exists in `public/locales/{lang}/client.json`

### Issue: Translation is undefined or null

**Cause:** Missing translation key in JSON file
**Solution:** Add the key to all language files (en, pl, uk)

### Issue: Wrong language is displayed

**Cause:** Browser language detection or cached language preference
**Solution:** Clear localStorage (`localStorage.removeItem('i18nextLng')`) and refresh

## Summary

✅ All translation keys now work correctly
✅ `client` namespace properly configured
✅ All components updated to use correct namespace
✅ Missing `explore` key added to all languages
✅ Consistent pattern across all files

The translation system is now fully functional and all text should display properly in English, Polish, and Ukrainian.
