# Quick Start: Market + Feature Flag System

This guide shows you how to use the integrated Market and Feature Flag systems.

## ⚡ Quick Overview

```typescript
// 1. User visits site → Market auto-detected (PL, SK, or UA)
// 2. Features filtered by market availability
// 3. UI adapts automatically

// Example: Sell button only shows in Poland
const { isEnabled } = useFeature('SELL_CARS');
// isEnabled = true in PL, false in SK/UA
```

## 🚀 Common Use Cases

### Use Case 1: Show Feature Only in Specific Markets

**Scenario**: Car selling is only available in Poland

```typescript
// types/features.ts (already configured)
[FeatureKey.SELL_CARS]: {
  enabledMarkets: [MarketCode.PL], // ✅ PL only
  requiresAuth: true,
}

// Your component
import { useFeature } from '@/hooks/useFeature';

function Navbar() {
  const { isEnabled } = useFeature('SELL_CARS');
  
  return (
    <nav>
      {isEnabled && <Link href="/sell">Sell Your Car</Link>}
    </nav>
  );
}
```

### Use Case 2: Different Features Per Market

**Scenario**: Payment methods vary by market

```typescript
function PaymentOptions() {
  const { market } = useMarket();
  const { isEnabled } = useFeature('ONLINE_PAYMENT');
  
  return (
    <div>
      {/* Cash - always available */}
      <PaymentOption type="cash" />
      
      {/* Online payment - PL & SK only */}
      {isEnabled && (
        <>
          <PaymentOption type="card" />
          {market === 'PL' && <PaymentOption type="blik" />}
          {market === 'SK' && <PaymentOption type="tatrapay" />}
        </>
      )}
    </div>
  );
}
```

### Use Case 3: Coming Soon Features

**Scenario**: Show "coming soon" for disabled features

```typescript
function Navbar() {
  const { isEnabled, reason } = useFeature('SELL_CARS');
  
  return (
    <nav>
      {isEnabled ? (
        <Link href="/sell">Sell Car</Link>
      ) : reason === 'market_not_supported' ? (
        <div className="badge">Selling - Coming Soon 🚀</div>
      ) : null}
    </nav>
  );
}
```

### Use Case 4: Feature Requires Login

**Scenario**: Feature needs authentication

```typescript
function PremiumFeature() {
  const { isEnabled, reason } = useFeature('PREMIUM_LISTINGS');
  
  if (!isEnabled) {
    if (reason === 'auth_required') {
      return <LoginPrompt message="Sign in to access Premium" />;
    }
    if (reason === 'market_not_supported') {
      return <ComingSoonBadge />;
    }
    return null;
  }
  
  return <PremiumContent />;
}
```

## 📋 Step-by-Step: Adding a New Feature

### Step 1: Define Feature in Registry

```typescript
// types/features.ts

// Add to enum
export const FeatureKey = {
  // ... existing
  LEASE_CARS: 'LEASE_CARS', // ← Add this
};

// Add configuration
[FeatureKey.LEASE_CARS]: {
  key: FeatureKey.LEASE_CARS,
  name: 'Lease Cars',
  description: 'Car leasing options',
  enabledMarkets: [MarketCode.PL], // Only Poland
  requiresAuth: true,
  beta: true, // Mark as beta
}
```

### Step 2: Use in Your Component

```typescript
// components/CarActions.tsx
import { useFeature } from '@/hooks/useFeature';
import { FeatureKey } from '@/types/features';

function CarActions({ car }) {
  const leasing = useFeature(FeatureKey.LEASE_CARS);
  
  return (
    <div>
      <button>Buy Now</button>
      <button>Contact Seller</button>
      
      {/* Only shows in Poland, to logged-in users */}
      {leasing.isEnabled && (
        <button>
          Lease This Car
          {leasing.config?.beta && <span className="beta">BETA</span>}
        </button>
      )}
    </div>
  );
}
```

### Step 3: Test It

```javascript
// Switch to Poland market
localStorage.setItem('user-market', 'PL');

// Log in
// Sign in via UI

// Reload page
window.location.reload();

// ✅ "Lease This Car" button should appear!

// Switch to Slovakia
localStorage.setItem('user-market', 'SK');
window.location.reload();

// ❌ Button disappears (not enabled in SK)
```

## 🎯 Best Practices

### ✅ DO:

```typescript
// Use feature flags
<FeatureGate feature="SELL_CARS">
  <SellButton />
</FeatureGate>

// Provide fallbacks
{isEnabled ? <Feature /> : <ComingSoon />}

// Check specific reasons
if (reason === 'auth_required') {
  return <LoginPrompt />;
}
```

### ❌ DON'T:

```typescript
// Don't hardcode market checks
{market === 'PL' && <SellButton />} // ❌

// Don't ignore reasons
{!isEnabled && null} // ❌ No feedback to user

// Don't duplicate feature logic
if (market === 'PL' && user) { // ❌ Use feature flags
  return <Feature />;
}
```

## 🔧 Quick Configuration Reference

### Enable Feature in New Market

```typescript
// types/features.ts
[FeatureKey.SELL_CARS]: {
  enabledMarkets: [
    MarketCode.PL,
    MarketCode.SK, // ← Add Slovakia
  ],
}
```

### Make Feature Beta

```typescript
[FeatureKey.MY_FEATURE]: {
  // ... config
  beta: true, // ← Add this
}
```

### Require Authentication

```typescript
[FeatureKey.MY_FEATURE]: {
  // ... config
  requiresAuth: true, // ← Add this
}
```

### Schedule Feature Launch

```typescript
[FeatureKey.MY_FEATURE]: {
  // ... config
  enabledFrom: new Date('2025-03-01'), // ← Goes live March 1
}
```

### Disable Feature Globally

```typescript
[FeatureKey.MY_FEATURE]: {
  // ... config
  enabledMarkets: [], // ← Empty array = disabled everywhere
}
```

## 🧪 Testing Checklist

When adding a new feature:

- [ ] Feature defined in `FeatureKey` enum
- [ ] Feature configured in `FEATURE_REGISTRY`
- [ ] Tested in Poland market
- [ ] Tested in Slovakia market
- [ ] Tested in Ukraine market
- [ ] Tested logged out state
- [ ] Tested logged in state
- [ ] Fallback UI shows when disabled
- [ ] Beta badge shows if `beta: true`
- [ ] Coming soon shows if `comingSoon: true`

## 🐛 Troubleshooting

### Feature not appearing?

```typescript
// Debug helper
const feature = useFeature('MY_FEATURE');
console.log({
  isEnabled: feature.isEnabled,
  reason: feature.reason,
  config: feature.config,
  currentMarket: market,
});
```

### Market not detecting correctly?

```typescript
// Force a market (for testing)
localStorage.setItem('user-market', 'PL');
window.location.reload();
```

### Feature shows in wrong market?

```typescript
// Check configuration
import { FEATURE_REGISTRY } from '@/types/features';
console.log(FEATURE_REGISTRY.MY_FEATURE.enabledMarkets);
// Should be: ['PL', 'SK', 'UA'] or subset
```

## 📚 Next Steps

- Read [Feature Flags Documentation](./FEATURE_FLAGS.md) for complete guide
- See [Feature Flag Examples](./FEATURE_FLAG_EXAMPLES.md) for more examples
- Check [Market System](./MARKET_SYSTEM.md) for market configuration

## 💡 Tips

1. **Start simple**: Enable feature in one market first
2. **Test thoroughly**: Check all markets and auth states
3. **Provide feedback**: Show why feature is disabled
4. **Use beta flags**: Mark experimental features as beta
5. **Schedule launches**: Use date-based activation for rollouts

---

**Need help?** Check the full documentation or ask the team! 🚀
