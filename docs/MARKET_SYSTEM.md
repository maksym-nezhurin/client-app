# Multi-Market System Documentation

## Overview

The multi-market system allows users to browse and interact with car listings specific to their geographic market (Poland, Slovakia, or Ukraine). The system automatically detects the user's location and provides an easy way to switch between markets.

## Features

- **Auto-detection**: Automatically detects user's market based on browser language and timezone
- **Manual switching**: Users can manually switch between markets via the navbar toggle
- **Persistence**: Market preference is saved in localStorage and cookies
- **API integration**: All API requests automatically include the selected market
- **Type-safe**: Full TypeScript support with proper typing

## Markets

Currently supported markets:

| Code | Country  | Currency | Language | Flag |
|------|----------|----------|----------|------|
| PL   | Poland   | PLN      | pl       | 🇵🇱   |
| SK   | Slovakia | EUR      | sk       | 🇸🇰   |
| UA   | Ukraine  | UAH      | uk       | 🇺🇦   |

## Architecture

### Core Components

1. **MarketContext** (`contexts/market/MarketContext.tsx`)
   - Manages global market state
   - Handles market detection and persistence
   - Provides market configuration

2. **Market Detection** (`lib/market-detection.ts`)
   - Detects user location using multiple strategies
   - Browser language detection
   - Timezone-based detection
   - Fallback to default market (PL)

3. **Market Types** (`types/market.ts`)
   - Market type definitions
   - Market configuration objects
   - Constants and defaults

4. **API Integration** (`lib/api.ts`)
   - Automatically adds `X-Market` header to all API requests
   - Reads market from cookie for SSR compatibility

### Hooks

- **useMarket()**: Access current market and market config
- **useMarketRoutes()**: Get market-prefixed routes automatically

## Usage Examples

### Basic: Access Current Market

```tsx
import { useMarket } from '@/contexts/market/MarketContext';

function MyComponent() {
  const { market, marketConfig } = useMarket();
  
  return (
    <div>
      <p>Current market: {market}</p>
      <p>Currency: {marketConfig.currency}</p>
      <p>Flag: {marketConfig.flag}</p>
    </div>
  );
}
```

### Switch Market

```tsx
import { useMarket } from '@/contexts/market/MarketContext';

function MarketSwitcher() {
  const { market, setMarket } = useMarket();
  
  return (
    <button onClick={() => setMarket('SK')}>
      Switch to Slovakia
    </button>
  );
}
```

### Market Indicator Component

```tsx
import { MarketIndicator } from '@/components/market/MarketIndicator';

function Header() {
  return (
    <header>
      <MarketIndicator showCurrency showName />
    </header>
  );
}
```

### Market-Aware Routes

```tsx
import { useMarketRoutes } from '@/hooks/useMarketRoutes';
import Link from 'next/link';

function Navigation() {
  const { routes } = useMarketRoutes();
  
  return (
    <nav>
      <Link href={routes.BROWSE}>Browse Cars</Link>
      <Link href={routes.SELL}>List Your Car</Link>
    </nav>
  );
}
```

### API Requests with Market

API requests automatically include the market header:

```tsx
import { apiClient } from '@/lib/api';

async function fetchCars() {
  // Market is automatically included in X-Market header
  const response = await apiClient.get('/cars');
  return response.data;
}
```

## Backend Integration

Your API should:

1. Read the `X-Market` header from requests
2. Filter/scope data based on the market
3. Return market-specific results

Example (Node.js/Express):

```javascript
app.get('/api/cars', (req, res) => {
  const market = req.headers['x-market'] || 'PL';
  
  // Filter cars by market
  const cars = db.cars.filter(car => car.market === market);
  
  res.json(cars);
});
```

## Market Detection Flow

1. **First Visit**:
   - Check localStorage for saved preference → No
   - Check cookie for saved preference → No
   - Auto-detect using browser language
   - Fallback to timezone detection
   - Save detected market to localStorage and cookie

2. **Returning Visit**:
   - Check localStorage → Found preference
   - Use saved market
   - Skip auto-detection

3. **Manual Switch**:
   - User clicks market toggle
   - Update context state
   - Save to localStorage and cookie
   - Trigger re-render with new market

## Persistence

### localStorage
- Key: `user-market`
- Value: Market code (e.g., 'PL', 'SK', 'UA')
- Used for client-side persistence

### Cookie
- Name: `market`
- Value: Market code
- Max-Age: 30 days
- Used for SSR compatibility

## Adding a New Market

**Everything is managed from ONE file: `types/market.ts`**

1. Add the market code to the enum:

```typescript
export const MarketCode = {
  PL: 'PL',
  SK: 'SK',
  UA: 'UA',
  CZ: 'CZ', // Add this
} as const;
```

2. Add the market configuration to `MARKET_CONFIGS`:

```typescript
const MARKET_CONFIGS: MarketConfig[] = [
  // ... existing markets
  {
    code: MarketCode.CZ,
    name: 'Czech Republic',
    currency: 'CZK',
    locale: 'cs-CZ',
    flag: '🇨🇿',
    language: 'cs',
    enabled: true,
    timezone: 'Europe/Prague',
    domains: ['cz.yoursite.com'],
  },
];
```

**That's it!** Everything else (market options, detection, validation, etc.) is automatically derived from this config.

### Disabling a Market

Simply set `enabled: false` in the config:

```typescript
{
  code: MarketCode.SK,
  name: 'Slovakia',
  // ... other config
  enabled: false, // Disable Slovakia market
}
```

The market will be automatically hidden from:
- Market switcher in navbar
- Market detection logic
- API requests
- Route generation

## Testing

To test market detection:

1. Clear browser data (localStorage + cookies)
2. Change browser language to target market
3. Reload page
4. Verify correct market is detected

To test manual switching:

1. Click market toggle in navbar
2. Verify UI updates immediately
3. Reload page
4. Verify market persists

## Troubleshooting

### Market not persisting after reload
- Check browser console for localStorage errors
- Verify cookies are enabled
- Check that MarketProvider wraps your app

### API not receiving market header
- Verify apiClient is being used for requests
- Check browser network tab for X-Market header
- Ensure market cookie is set

### Wrong market detected
- Check browser language settings
- Clear localStorage and cookies
- Force a specific market during development:
  ```typescript
  localStorage.setItem('user-market', 'SK');
  ```

## Future Enhancements

- [ ] Add more markets (Czech Republic, Romania, etc.)
- [ ] Implement i18n translations per market
- [ ] Add market-specific payment methods
- [ ] Market-specific car regulations/requirements
- [ ] Analytics per market
- [ ] A/B testing per market
