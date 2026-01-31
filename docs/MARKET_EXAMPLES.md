# Market System Examples

## Example 1: Adding Czech Republic Market

```typescript
// types/market.ts

// Step 1: Add to enum
export const MarketCode = {
  PL: 'PL',
  SK: 'SK',
  UA: 'UA',
  CZ: 'CZ', // ← Add this
} as const;

// Step 2: Add config
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

**Done!** The new market will automatically appear in:
- ✅ Navbar market switcher
- ✅ Market detection (browser language + timezone)
- ✅ API headers
- ✅ Route generation

## Example 2: Temporarily Disabling Slovakia

```typescript
// types/market.ts

const MARKET_CONFIGS: MarketConfig[] = [
  {
    code: MarketCode.SK,
    name: 'Slovakia',
    currency: 'EUR',
    locale: 'sk-SK',
    flag: '🇸🇰',
    language: 'sk',
    enabled: false, // ← Change to false
    timezone: 'Europe/Bratislava',
  },
  // ... other markets
];
```

**Result:**
- ❌ Slovakia removed from market switcher
- ❌ Not used in auto-detection
- ⚠️ Existing users with SK saved will fallback to default market

## Example 3: Adding Multiple Markets at Once

```typescript
// types/market.ts

export const MarketCode = {
  PL: 'PL',
  SK: 'SK',
  UA: 'UA',
  CZ: 'CZ',
  RO: 'RO',
  HU: 'HU',
} as const;

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
  },
  {
    code: MarketCode.RO,
    name: 'Romania',
    currency: 'RON',
    locale: 'ro-RO',
    flag: '🇷🇴',
    language: 'ro',
    enabled: true,
    timezone: 'Europe/Bucharest',
  },
  {
    code: MarketCode.HU,
    name: 'Hungary',
    currency: 'HUF',
    locale: 'hu-HU',
    flag: '🇭🇺',
    language: 'hu',
    enabled: true,
    timezone: 'Europe/Budapest',
  },
];
```

## Example 4: Using Market in Components

```typescript
import { useMarket } from '@/contexts/market/MarketContext';
import { MarketCode } from '@/types/market';

function PriceDisplay({ price }: { price: number }) {
  const { marketConfig } = useMarket();
  
  const formatter = new Intl.NumberFormat(marketConfig.locale, {
    style: 'currency',
    currency: marketConfig.currency,
  });
  
  return <span>{formatter.format(price)}</span>;
}

function MarketSpecificContent() {
  const { market } = useMarket();
  
  if (market === MarketCode.PL) {
    return <div>Content specific to Poland</div>;
  }
  
  if (market === MarketCode.UA) {
    return <div>Ukrainian specific content</div>;
  }
  
  return <div>Default content</div>;
}
```

## Example 5: Market-Aware API Calls

```typescript
import { apiClient } from '@/lib/api';

// Market is automatically included in X-Market header
async function fetchCars() {
  const response = await apiClient.get('/cars');
  return response.data;
}

// On backend (example):
app.get('/api/cars', (req, res) => {
  const market = req.headers['x-market']; // 'PL', 'SK', or 'UA'
  const cars = db.cars.filter(car => car.market === market);
  res.json(cars);
});
```

## Example 6: Market-Specific Routing

```typescript
import { useMarketRoutes } from '@/hooks/useMarketRoutes';
import Link from 'next/link';

function Navigation() {
  const { routes, market } = useMarketRoutes();
  
  return (
    <nav>
      {/* Automatically prefixes with market: /pl/browse */}
      <Link href={routes.BROWSE}>Browse Cars</Link>
      
      {/* /pl/cars/123 or /sk/cars/123 etc */}
      <Link href={routes.CAR('123')}>View Car</Link>
      
      {/* Manual construction */}
      <Link href={`/${market.toLowerCase()}/custom-page`}>
        Custom Page
      </Link>
    </nav>
  );
}
```

## Example 7: Conditional Features by Market

```typescript
import { useMarket } from '@/contexts/market/MarketContext';
import { MarketCode } from '@/types/market';

function PaymentOptions() {
  const { market } = useMarket();
  
  return (
    <div>
      <h3>Payment Methods</h3>
      
      {/* Show for all markets */}
      <button>Credit Card</button>
      
      {/* Poland only */}
      {market === MarketCode.PL && (
        <button>BLIK</button>
      )}
      
      {/* Slovakia only */}
      {market === MarketCode.SK && (
        <button>TatraPay</button>
      )}
      
      {/* Ukraine only */}
      {market === MarketCode.UA && (
        <button>PrivatBank</button>
      )}
    </div>
  );
}
```

## Example 8: Beta/Test Markets

```typescript
// types/market.ts

const MARKET_CONFIGS: MarketConfig[] = [
  // Production markets
  {
    code: MarketCode.PL,
    name: 'Poland',
    // ... config
    enabled: true,
  },
  
  // Beta market - hidden from public
  {
    code: MarketCode.CZ,
    name: 'Czech Republic (Beta)',
    // ... config
    enabled: false, // Not shown in public market switcher
  },
];

// In your code, allow beta access for specific users
function MarketSwitcher() {
  const { user } = useAuth();
  const isBetaTester = user?.roles?.includes('beta');
  
  const visibleMarkets = isBetaTester 
    ? MARKET_CONFIGS // Show all markets
    : ENABLED_MARKETS; // Show only enabled
    
  return (
    <select>
      {visibleMarkets.map(m => (
        <option key={m.code} value={m.code}>
          {m.flag} {m.name}
        </option>
      ))}
    </select>
  );
}
```

## Example 9: Market-Specific Validation

```typescript
import { MarketCode } from '@/types/market';
import { useMarket } from '@/contexts/market/MarketContext';

function PhoneInput() {
  const { market } = useMarket();
  
  const getPhoneRegex = (market: Market) => {
    switch (market) {
      case MarketCode.PL:
        return /^(\+48)?[0-9]{9}$/; // Polish format
      case MarketCode.SK:
        return /^(\+421)?[0-9]{9}$/; // Slovak format
      case MarketCode.UA:
        return /^(\+380)?[0-9]{9}$/; // Ukrainian format
      default:
        return /^[0-9]+$/;
    }
  };
  
  const getPlaceholder = (market: Market) => {
    switch (market) {
      case MarketCode.PL: return '+48 123 456 789';
      case MarketCode.SK: return '+421 123 456 789';
      case MarketCode.UA: return '+380 123 456 789';
      default: return 'Phone number';
    }
  };
  
  return (
    <input
      type="tel"
      placeholder={getPlaceholder(market)}
      pattern={getPhoneRegex(market).source}
    />
  );
}
```

## Example 10: Testing Different Markets

```typescript
// In your test file
import { MarketProvider } from '@/contexts/market/MarketContext';
import { MarketCode } from '@/types/market';

describe('Market-dependent component', () => {
  it('shows Polish content', () => {
    // Mock localStorage to force market
    localStorage.setItem('user-market', MarketCode.PL);
    
    render(
      <MarketProvider>
        <YourComponent />
      </MarketProvider>
    );
    
    expect(screen.getByText('Polish content')).toBeInTheDocument();
  });
  
  it('shows Slovak content', () => {
    localStorage.setItem('user-market', MarketCode.SK);
    
    render(
      <MarketProvider>
        <YourComponent />
      </MarketProvider>
    );
    
    expect(screen.getByText('Slovak content')).toBeInTheDocument();
  });
});
```
