# Feature Flag Examples

Real-world examples of using the feature flag system.

## Navigation Examples

### Example 1: Dynamic Navbar Based on Features

```typescript
import { useFeature } from '@/hooks/useFeature';
import { FeatureKey } from '@/types/features';

function Navbar() {
  const sellCars = useFeature(FeatureKey.SELL_CARS);
  const explore = useFeature(FeatureKey.EXPLORE_PAGE);
  const compare = useFeature(FeatureKey.COMPARISON_TOOL);
  
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/browse">Browse Cars</Link>
      
      {/* Only show Explore in markets where it's enabled */}
      {explore.isEnabled && (
        <Link href="/explore">
          Explore
          {explore.config?.beta && <BetaBadge />}
        </Link>
      )}
      
      {/* Sell button with smart fallback */}
      {sellCars.isEnabled ? (
        <Link href="/sell" className="primary-button">
          List Your Car
        </Link>
      ) : sellCars.reason === 'market_not_supported' ? (
        <div className="coming-soon-badge">
          🚧 Selling Coming Soon in Your Market
        </div>
      ) : sellCars.reason === 'auth_required' ? (
        <Link href="/auth/login" className="secondary-button">
          Sign in to Sell
        </Link>
      ) : null}
      
      {/* Compare tool with beta badge */}
      {compare.isEnabled && (
        <Link href="/compare">
          Compare
          {compare.config?.beta && <span className="beta">BETA</span>}
        </Link>
      )}
    </nav>
  );
}
```

### Example 2: Mobile Menu with Feature Filtering

```typescript
function MobileMenu() {
  const features = useFeatures([
    FeatureKey.SELL_CARS,
    FeatureKey.EXPLORE_PAGE,
    FeatureKey.COMPARISON_TOOL,
    FeatureKey.FAVORITES,
  ]);
  
  const menuItems = [
    { href: '/', label: 'Home', always: true },
    { href: '/browse', label: 'Browse', always: true },
    { 
      href: '/explore', 
      label: 'Explore', 
      feature: features.EXPLORE_PAGE 
    },
    { 
      href: '/sell', 
      label: 'Sell Car', 
      feature: features.SELL_CARS 
    },
    { 
      href: '/compare', 
      label: 'Compare', 
      feature: features.COMPARISON_TOOL,
      badge: 'Beta'
    },
    { 
      href: '/favorites', 
      label: 'Favorites', 
      feature: features.FAVORITES 
    },
  ];
  
  return (
    <div className="mobile-menu">
      {menuItems.map(item => {
        // Always show if no feature check required
        if (item.always) {
          return <MenuItem key={item.href} {...item} />;
        }
        
        // Check feature availability
        if (item.feature?.isEnabled) {
          return (
            <MenuItem 
              key={item.href} 
              {...item}
              badge={item.badge}
            />
          );
        }
        
        return null;
      })}
    </div>
  );
}
```

## Page-Level Examples

### Example 3: Sell Car Page with Market Check

```typescript
// app/(client)/sell/page.tsx
import { redirect } from 'next/navigation';
import { useFeature } from '@/hooks/useFeature';
import { FeatureKey } from '@/types/features';

export default function SellCarPage() {
  const { isEnabled, reason, config } = useFeature(FeatureKey.SELL_CARS);
  
  // Redirect if feature not available
  if (!isEnabled) {
    if (reason === 'market_not_supported') {
      return (
        <div className="text-center py-20">
          <h1>Selling Cars Coming Soon!</h1>
          <p>We're working hard to bring car selling to {config?.name} market.</p>
          <Link href="/">Return Home</Link>
        </div>
      );
    }
    
    if (reason === 'auth_required') {
      redirect('/auth/login?returnTo=/sell');
    }
  }
  
  return <SellCarForm />;
}
```

### Example 4: Feature-Based Page Access

```typescript
// app/(client)/premium/page.tsx
'use client';

import { FeatureGate } from '@/components/features/FeatureGate';
import { FeatureKey } from '@/types/features';

export default function PremiumPage() {
  return (
    <FeatureGate
      feature={FeatureKey.PREMIUM_LISTINGS}
      showLoginPrompt
      showComingSoon
    >
      <div>
        <h1>Go Premium</h1>
        <PremiumFeaturesList />
        <PremiumPricing />
      </div>
    </FeatureGate>
  );
}
```

## Component Examples

### Example 5: Car Listing Card with Feature-Based Actions

```typescript
function CarCard({ car }: { car: Car }) {
  const features = useFeatures([
    FeatureKey.FAVORITES,
    FeatureKey.SHARE_LISTINGS,
    FeatureKey.COMPARISON_TOOL,
  ]);
  
  return (
    <div className="car-card">
      <CarImage src={car.image} />
      <CarDetails car={car} />
      
      <div className="actions">
        <button>View Details</button>
        
        {/* Add to favorites - only if feature enabled */}
        {features.FAVORITES.isEnabled && (
          <button onClick={() => addToFavorites(car.id)}>
            ❤️ Save
          </button>
        )}
        
        {/* Share button - enabled in all markets */}
        {features.SHARE_LISTINGS.isEnabled && (
          <button onClick={() => shareCar(car)}>
            🔗 Share
          </button>
        )}
        
        {/* Add to comparison - beta feature */}
        {features.COMPARISON_TOOL.isEnabled && (
          <button onClick={() => addToComparison(car.id)}>
            📊 Compare
            {features.COMPARISON_TOOL.config?.beta && (
              <span className="beta-badge">BETA</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
```

### Example 6: Payment Options Based on Market

```typescript
function CheckoutPage({ amount }: { amount: number }) {
  const { market } = useMarket();
  const onlinePayment = useFeature(FeatureKey.ONLINE_PAYMENT);
  const installments = useFeature(FeatureKey.INSTALLMENT_PLANS);
  const crypto = useFeature(FeatureKey.CRYPTO_PAYMENT);
  
  return (
    <div>
      <h2>Payment Methods</h2>
      
      {/* Always available: Cash */}
      <PaymentOption 
        icon="💵"
        name="Cash on Delivery"
        available={true}
      />
      
      {/* Market-specific online payment */}
      {onlinePayment.isEnabled && (
        <>
          <PaymentOption icon="💳" name="Credit Card" />
          <PaymentOption icon="🏦" name="Bank Transfer" />
          
          {/* Poland: BLIK */}
          {market === 'PL' && (
            <PaymentOption icon="📱" name="BLIK" />
          )}
          
          {/* Slovakia: TatraPay */}
          {market === 'SK' && (
            <PaymentOption icon="🏦" name="TatraPay" />
          )}
        </>
      )}
      
      {/* Installment plans - requires verification */}
      {installments.isEnabled ? (
        <PaymentOption 
          icon="📆" 
          name="Pay in Installments"
          description="Split into 12 monthly payments"
        />
      ) : installments.reason === 'verification_required' ? (
        <PaymentOption 
          icon="📆" 
          name="Pay in Installments"
          disabled
          message="Verify your account to unlock"
        />
      ) : null}
      
      {/* Crypto - coming soon */}
      {crypto.config?.comingSoon && (
        <PaymentOption 
          icon="₿" 
          name="Cryptocurrency"
          comingSoon
        />
      )}
    </div>
  );
}
```

## Form Examples

### Example 7: Dynamic Form Fields Based on Features

```typescript
function CarListingForm() {
  const premiumListings = useFeature(FeatureKey.PREMIUM_LISTINGS);
  const featuredAds = useFeature(FeatureKey.FEATURED_ADS);
  const carHistory = useFeature(FeatureKey.CAR_HISTORY_REPORTS);
  
  return (
    <form>
      {/* Basic fields - always visible */}
      <input name="title" placeholder="Car Title" />
      <input name="price" placeholder="Price" />
      <textarea name="description" placeholder="Description" />
      
      {/* Premium listing options */}
      {premiumListings.isEnabled && (
        <div className="premium-section">
          <h3>Premium Options</h3>
          <label>
            <input type="checkbox" name="premium" />
            Make this a Premium Listing (+$50)
          </label>
        </div>
      )}
      
      {/* Featured ad options */}
      {featuredAds.isEnabled && (
        <div className="featured-section">
          <label>
            <input type="checkbox" name="featured" />
            Feature on Homepage (+$100)
          </label>
        </div>
      )}
      
      {/* Car history report upload */}
      {carHistory.isEnabled && (
        <div className="history-section">
          <label>
            Upload Car History Report (Optional)
            <input type="file" name="historyReport" />
          </label>
        </div>
      )}
      
      <button type="submit">List Car</button>
    </form>
  );
}
```

## Dashboard Examples

### Example 8: User Dashboard with Feature-Based Sections

```typescript
function UserDashboard() {
  const features = useFeatures([
    FeatureKey.SELL_CARS,
    FeatureKey.DEALER_ACCOUNTS,
    FeatureKey.VERIFIED_SELLERS,
    FeatureKey.PREMIUM_LISTINGS,
    FeatureKey.PRICE_ALERTS,
  ]);
  
  return (
    <div className="dashboard">
      <h1>My Dashboard</h1>
      
      <div className="grid">
        {/* Always visible: Saved Cars */}
        <DashboardCard
          title="Saved Cars"
          icon="❤️"
          link="/dashboard/saved"
        />
        
        {/* Feature-gated: My Listings */}
        {features.SELL_CARS.isEnabled && (
          <DashboardCard
            title="My Listings"
            icon="🚗"
            link="/dashboard/listings"
          />
        )}
        
        {/* Feature-gated: Dealer Tools */}
        <FeatureGate feature={FeatureKey.DEALER_ACCOUNTS}>
          <DashboardCard
            title="Dealer Tools"
            icon="🏢"
            link="/dashboard/dealer"
          />
        </FeatureGate>
        
        {/* Verification status */}
        {features.VERIFIED_SELLERS.isEnabled && (
          <DashboardCard
            title="Verification"
            icon={features.VERIFIED_SELLERS.config?.requiresVerification ? "✅" : "⏳"}
            link="/dashboard/verification"
          />
        )}
        
        {/* Premium features */}
        {features.PREMIUM_LISTINGS.isEnabled && (
          <DashboardCard
            title="Premium Features"
            icon="⭐"
            link="/dashboard/premium"
          />
        )}
        
        {/* Price alerts */}
        {features.PRICE_ALERTS.isEnabled && (
          <DashboardCard
            title="Price Alerts"
            icon="🔔"
            link="/dashboard/alerts"
          />
        )}
      </div>
    </div>
  );
}
```

## Marketing/Promotion Examples

### Example 9: Market-Specific Hero Banners

```typescript
function HomePage() {
  const { market } = useMarket();
  const sellCars = useFeature(FeatureKey.SELL_CARS);
  const premiumListings = useFeature(FeatureKey.PREMIUM_LISTINGS);
  
  return (
    <div>
      {/* Hero banner changes based on market features */}
      {sellCars.isEnabled ? (
        <Hero
          title="Buy and Sell Cars in Poland"
          subtitle="List your car for free and reach millions"
          cta="Start Selling"
          ctaLink="/sell"
        />
      ) : (
        <Hero
          title="Find Your Perfect Car"
          subtitle="Browse thousands of cars in your area"
          cta="Start Browsing"
          ctaLink="/browse"
        />
      )}
      
      {/* Feature-specific promotions */}
      <div className="promotions">
        {premiumListings.isEnabled && (
          <PromotionBanner
            icon="⭐"
            title="Go Premium"
            description="Get 10x more views on your listings"
            cta="Learn More"
            link="/premium"
          />
        )}
        
        {!sellCars.isEnabled && (
          <PromotionBanner
            icon="🚀"
            title="Selling Coming Soon!"
            description="Be the first to know when we launch in your market"
            cta="Join Waitlist"
            link="/waitlist"
          />
        )}
      </div>
    </div>
  );
}
```

### Example 10: Feature-Based Email Notifications

```typescript
// Server-side example
async function sendMarketingEmail(user: User) {
  const market = user.market;
  const features = getMarketFeatures(market);
  
  const emailContent = {
    subject: `New Features Available in ${market}!`,
    body: `
      <h1>Hello ${user.name}!</h1>
      <p>Check out what's new in your market:</p>
      <ul>
        ${features.map(f => `
          <li>
            <strong>${f.name}</strong>: ${f.description}
            ${f.beta ? '<span class="badge">BETA</span>' : ''}
          </li>
        `).join('')}
      </ul>
    `,
  };
  
  await sendEmail(user.email, emailContent);
}
```

## Advanced Examples

### Example 11: A/B Testing with Feature Flags

```typescript
function PricingPage() {
  const { market } = useMarket();
  const premiumListings = useFeature(FeatureKey.PREMIUM_LISTINGS);
  
  // A/B test: Show different pricing in Poland
  const variant = market === 'PL' ? 'A' : 'B';
  
  if (!premiumListings.isEnabled) {
    return <ComingSoonPage />;
  }
  
  return (
    <div>
      <h1>Premium Listing Pricing</h1>
      
      {variant === 'A' ? (
        <PricingTable prices={[29, 49, 99]} />
      ) : (
        <PricingTable prices={[39, 59, 109]} />
      )}
    </div>
  );
}
```

### Example 12: Feature Rollout with Date Scheduling

```typescript
// In types/features.ts
[FeatureKey.NEW_SEARCH]: {
  key: FeatureKey.NEW_SEARCH,
  name: 'Advanced Search',
  description: 'New search with AI-powered filters',
  enabledMarkets: [MarketCode.PL],
  enabledFrom: new Date('2025-03-01'), // Launch March 1
  enabledUntil: new Date('2025-03-15'), // A/B test for 2 weeks
  beta: true,
}

// Component automatically respects date scheduling
function SearchBar() {
  const newSearch = useFeature(FeatureKey.NEW_SEARCH);
  
  return newSearch.isEnabled ? (
    <NewAdvancedSearch />
  ) : (
    <LegacySearch />
  );
}
```

## Testing Examples

### Example 13: Test Different Market Scenarios

```typescript
describe('Feature Flags', () => {
  it('shows sell button in Poland', () => {
    localStorage.setItem('user-market', 'PL');
    
    render(<Navbar />);
    
    expect(screen.getByText('List Your Car')).toBeInTheDocument();
  });
  
  it('shows coming soon in Slovakia', () => {
    localStorage.setItem('user-market', 'SK');
    
    render(<Navbar />);
    
    expect(screen.getByText(/Coming Soon/)).toBeInTheDocument();
    expect(screen.queryByText('List Your Car')).not.toBeInTheDocument();
  });
  
  it('shows login prompt when not authenticated', () => {
    localStorage.setItem('user-market', 'PL');
    // Don't mock user
    
    render(<SellPage />);
    
    expect(screen.getByText('Sign in to Sell')).toBeInTheDocument();
  });
});
```

## Summary

These examples demonstrate:

- ✅ Navigation based on feature availability
- ✅ Page-level access control
- ✅ Component-level feature gates
- ✅ Market-specific payment options
- ✅ Dynamic forms based on features
- ✅ Dashboard customization
- ✅ Marketing/promotions
- ✅ A/B testing
- ✅ Scheduled rollouts
- ✅ Testing strategies

All powered by a single, centralized feature registry!
