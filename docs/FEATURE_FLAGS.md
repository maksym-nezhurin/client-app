# Feature Flags & Permissions System

## Overview

The feature flags system provides a centralized way to manage feature availability across different markets and user types. It integrates seamlessly with the market system and authentication context to provide granular control over what features users can access.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Feature Registry                        │
│         (types/features.ts - Single Source of Truth)         │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
┌───────────────┐          ┌──────────────────┐
│  useFeature() │          │   FeatureGate    │
│     Hook      │          │    Component     │
└──────┬────────┘          └────────┬─────────┘
       │                            │
       └─────────┬──────────────────┘
                 ▼
       ┌──────────────────┐
       │  Feature Check    │
       │  - Market        │
       │  - Auth Status   │
       │  - Verification  │
       │  - Time-based    │
       └──────────────────┘
```

## Core Components

### 1. Feature Registry (`types/features.ts`)

**Single source of truth** for all features. Every feature is defined here with its configuration.

```typescript
export const FeatureKey = {
  SELL_CARS: 'SELL_CARS',
  RENT_CARS: 'RENT_CARS',
  // ... more features
} as const;

export const FEATURE_REGISTRY: Record<Feature, FeatureConfig> = {
  [FeatureKey.SELL_CARS]: {
    key: FeatureKey.SELL_CARS,
    name: 'Sell Cars',
    description: 'Ability to list cars for sale',
    enabledMarkets: [MarketCode.PL], // Only Poland
    requiresAuth: true,
    requiresVerification: false,
  },
  // ... more features
};
```

### 2. useFeature Hook (`hooks/useFeature.ts`)

Hook to check feature availability:

```typescript
const { isEnabled, config, reason } = useFeature('SELL_CARS');

// isEnabled: boolean - Can user access this feature?
// config: FeatureConfig - Feature configuration
// reason: string | null - Why feature is disabled (if disabled)
//   - 'market_not_supported' - Not available in current market
//   - 'auth_required' - User must log in
//   - 'verification_required' - User must verify account
//   - 'feature_not_found' - Feature doesn't exist
```

### 3. FeatureGate Component (`components/features/FeatureGate.tsx`)

Declarative component for feature-gating UI:

```tsx
<FeatureGate feature="SELL_CARS">
  <SellButton />
</FeatureGate>
```

## Feature Configuration Options

```typescript
interface FeatureConfig {
  key: Feature;                    // Unique feature identifier
  name: string;                    // Display name
  description: string;             // Feature description
  enabledMarkets: Market[];        // Which markets have access
  requiresAuth?: boolean;          // Requires login?
  requiresVerification?: boolean;  // Requires verified account?
  beta?: boolean;                  // Is this in beta?
  comingSoon?: boolean;            // Coming soon badge?
  enabledFrom?: Date;              // Schedule launch
  enabledUntil?: Date;             // Schedule sunset
}
```

## Usage Examples

### Example 1: Basic Feature Check

```typescript
import { useFeature } from '@/hooks/useFeature';
import { FeatureKey } from '@/types/features';

function SellCarButton() {
  const { isEnabled } = useFeature(FeatureKey.SELL_CARS);
  
  if (!isEnabled) return null;
  
  return <button>List Your Car</button>;
}
```

### Example 2: Custom Fallback Based on Reason

```typescript
function SellCarButton() {
  const { isEnabled, reason } = useFeature(FeatureKey.SELL_CARS);
  
  if (!isEnabled) {
    if (reason === 'market_not_supported') {
      return <ComingSoonBadge />;
    }
    if (reason === 'auth_required') {
      return <SignInPrompt />;
    }
    return null;
  }
  
  return <button>List Your Car</button>;
}
```

### Example 3: Using FeatureGate Component

```tsx
import { FeatureGate } from '@/components/features/FeatureGate';
import { FeatureKey } from '@/types/features';

function Navigation() {
  return (
    <nav>
      <Link href="/browse">Browse</Link>
      
      {/* Only show if feature is enabled */}
      <FeatureGate feature={FeatureKey.SELL_CARS}>
        <Link href="/sell">Sell Car</Link>
      </FeatureGate>
      
      {/* With custom fallback */}
      <FeatureGate 
        feature={FeatureKey.PREMIUM_LISTINGS}
        fallback={<Badge>Coming Soon</Badge>}
      >
        <Link href="/premium">Go Premium</Link>
      </FeatureGate>
    </nav>
  );
}
```

### Example 4: Multiple Features Check

```typescript
import { useFeatures } from '@/hooks/useFeature';

function CarListingPage() {
  const features = useFeatures([
    FeatureKey.SELL_CARS,
    FeatureKey.PREMIUM_LISTINGS,
    FeatureKey.FEATURED_ADS
  ]);
  
  return (
    <div>
      {features.SELL_CARS.isEnabled && <BasicListingForm />}
      {features.PREMIUM_LISTINGS.isEnabled && <PremiumOption />}
      {features.FEATURED_ADS.isEnabled && <FeaturedOption />}
    </div>
  );
}
```

### Example 5: Market-Specific Content

```typescript
import { useFeature } from '@/hooks/useFeature';
import { useMarket } from '@/contexts/market/MarketContext';

function PaymentOptions() {
  const { market } = useMarket();
  const { isEnabled } = useFeature(FeatureKey.ONLINE_PAYMENT);
  
  return (
    <div>
      <h3>Payment Methods</h3>
      
      {isEnabled ? (
        <>
          <button>Pay Online</button>
          {market === 'PL' && <button>BLIK</button>}
          {market === 'SK' && <button>TatraPay</button>}
        </>
      ) : (
        <p>Cash payment only in your market</p>
      )}
    </div>
  );
}
```

### Example 6: Navigation Menu with Feature Flags

```typescript
function Navbar() {
  const { isEnabled: canSell } = useFeature(FeatureKey.SELL_CARS);
  const { isEnabled: canExplore } = useFeature(FeatureKey.EXPLORE_PAGE);
  
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/browse">Browse</Link>
      
      {canExplore && <Link href="/explore">Explore</Link>}
      {canSell && <Link href="/sell">Sell Your Car</Link>}
    </nav>
  );
}
```

### Example 7: Beta Features with Badge

```tsx
<FeatureGate 
  feature={FeatureKey.COMPARISON_TOOL}
  showComingSoon
>
  <Link href="/compare">
    Compare Cars
    {/* Badge automatically shown if beta: true */}
  </Link>
</FeatureGate>
```

### Example 8: Scheduled Feature Launch

```typescript
// In types/features.ts
[FeatureKey.NEW_FEATURE]: {
  key: FeatureKey.NEW_FEATURE,
  name: 'New Feature',
  enabledMarkets: [MarketCode.PL],
  enabledFrom: new Date('2025-02-15'), // Goes live on Feb 15
  enabledUntil: new Date('2025-12-31'), // Sunset on Dec 31
}

// Component automatically shows/hides based on dates
<FeatureGate feature={FeatureKey.NEW_FEATURE}>
  <NewFeatureUI />
</FeatureGate>
```

## Adding a New Feature

**Step 1**: Add feature key to enum in `types/features.ts`:

```typescript
export const FeatureKey = {
  // ... existing features
  MY_NEW_FEATURE: 'MY_NEW_FEATURE',
} as const;
```

**Step 2**: Add feature configuration to registry:

```typescript
export const FEATURE_REGISTRY: Record<Feature, FeatureConfig> = {
  // ... existing features
  [FeatureKey.MY_NEW_FEATURE]: {
    key: FeatureKey.MY_NEW_FEATURE,
    name: 'My New Feature',
    description: 'Description of what this feature does',
    enabledMarkets: [MarketCode.PL, MarketCode.SK],
    requiresAuth: true,
    beta: true, // Optional: mark as beta
  },
};
```

**Step 3**: Use in your components:

```typescript
import { useFeature } from '@/hooks/useFeature';
import { FeatureKey } from '@/types/features';

function MyComponent() {
  const { isEnabled } = useFeature(FeatureKey.MY_NEW_FEATURE);
  
  if (!isEnabled) return null;
  
  return <div>New Feature UI</div>;
}
```

**That's it!** The feature is now available and controlled centrally.

## Enabling/Disabling Features

### For a Market

Update `enabledMarkets` array in `FEATURE_REGISTRY`:

```typescript
[FeatureKey.SELL_CARS]: {
  // ... config
  enabledMarkets: [
    MarketCode.PL,      // ✅ Enabled in Poland
    MarketCode.SK,      // ✅ Enabled in Slovakia
    // MarketCode.UA,   // ❌ Disabled in Ukraine
  ],
}
```

### For All Markets (Global Disable)

Set `enabledMarkets` to empty array:

```typescript
enabledMarkets: [], // Disabled everywhere
```

### Temporarily (Maintenance Mode)

Use date-based scheduling:

```typescript
enabledFrom: new Date('2025-02-01'),  // Unavailable before this
enabledUntil: new Date('2025-02-05'), // Unavailable after this
```

## Integration with Authentication

Features can require authentication or verification:

```typescript
[FeatureKey.PREMIUM_FEATURE]: {
  // ... config
  requiresAuth: true,              // User must be logged in
  requiresVerification: true,      // User must verify email/phone
}
```

The `useFeature` hook automatically checks these requirements:

```typescript
const { isEnabled, reason } = useFeature(FeatureKey.PREMIUM_FEATURE);

// If user not logged in:
// isEnabled = false
// reason = 'auth_required'

// If user logged in but not verified:
// isEnabled = false
// reason = 'verification_required'
```

## Best Practices

### 1. **Always Use Feature Flags for Market-Specific Features**

❌ **Bad**:
```typescript
{market === 'PL' && <SellButton />}
```

✅ **Good**:
```typescript
<FeatureGate feature={FeatureKey.SELL_CARS}>
  <SellButton />
</FeatureGate>
```

### 2. **Provide Meaningful Fallbacks**

❌ **Bad**:
```typescript
{isEnabled && <Feature />}
// Nothing shown if disabled
```

✅ **Good**:
```typescript
{isEnabled ? (
  <Feature />
) : (
  <ComingSoonBadge />
)}
```

### 3. **Use Beta Flags for Testing**

```typescript
[FeatureKey.NEW_FEATURE]: {
  // ... config
  enabledMarkets: [MarketCode.PL],
  beta: true, // Mark as beta
}
```

### 4. **Document Feature Purpose**

Always include a clear description:

```typescript
{
  key: FeatureKey.SELL_CARS,
  name: 'Sell Cars',
  description: 'Allows users to list their cars for sale on the platform',
  // ...
}
```

### 5. **Test Different Markets**

```typescript
// Switch market in dev tools:
localStorage.setItem('user-market', 'SK');
// Then reload to test Slovakia market
```

## Future: User Permissions

The system is designed to extend to user-level permissions:

```typescript
// Future implementation
interface FeatureConfig {
  // ... existing fields
  requiredRoles?: UserRole[];      // e.g., ['dealer', 'admin']
  requiredSubscription?: string;   // e.g., 'premium', 'pro'
}

// Usage will be:
const { isEnabled, reason } = useFeature(FeatureKey.DEALER_DASHBOARD);
// reason could be 'role_required' or 'subscription_required'
```

## Troubleshooting

### Feature not showing up?

1. Check if feature is enabled for current market
2. Check if user meets auth/verification requirements
3. Check if feature has date restrictions
4. Check browser console for errors

### How to debug?

```typescript
const feature = useFeature(FeatureKey.MY_FEATURE);
console.log('Feature Debug:', {
  isEnabled: feature.isEnabled,
  reason: feature.reason,
  config: feature.config,
  currentMarket: market,
  isAuthenticated: !!user,
});
```

## Testing

### Test Feature in Different Markets

```typescript
// Test helper
function TestFeatureInMarket({ market }: { market: Market }) {
  localStorage.setItem('user-market', market);
  window.location.reload();
}

// Usage
<button onClick={() => TestFeatureInMarket({ market: 'SK' })}>
  Test in Slovakia
</button>
```

### Mock Feature for Testing

```typescript
// In your test file
jest.mock('@/hooks/useFeature', () => ({
  useFeature: () => ({
    isEnabled: true,
    config: mockConfig,
    reason: null,
  }),
}));
```

## Related Documentation

- [Market System](./MARKET_SYSTEM.md) - Multi-market configuration
- [Authentication](./AUTHENTICATION_IMPLEMENTATION.md) - Auth system
- [Examples](./FEATURE_FLAG_EXAMPLES.md) - More code examples
