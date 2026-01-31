# Car Form System - Shared Components

Amazing reusable car form components built for flexibility and consistency across the application.

## 🎯 Overview

This shared form system provides a complete, multi-step wizard for adding cars to either:
- **Listings** (for sale) - 4 steps with pricing and description
- **Garage** (personal tracking) - 2 steps, basic info and details only

## 📦 Components

### Main Component
- **`CarFormWizard`** - Complete form wizard with step navigation

### Step Components
- **`CarBasicInfoStep`** - Brand, Model, Year, VIN
- **`CarDetailsStep`** - Type, Color, Mileage, Engine, Transmission, Fuel
- **`CarPricingStep`** - Price (listing only)
- **`CarDescriptionStep`** - Description & Photos (listing only)
- **`CarFormStepper`** - Visual progress indicator

### Utilities
- **`useCarForm`** - Custom hook for form state management
- **`CarFormTypes.ts`** - Shared TypeScript types

## 🚀 Usage

### Simple Usage (Listing Form)
```tsx
import { CarFormWizard } from '@/components/sections/shared/forms/car';

function MyPage() {
  return (
    <CarFormWizard
      mode="listing"
      redirectTo={ROUTES.ACCOUNT_CARS}
      title="Add New Vehicle"
      subtitle="List your vehicle for sale"
    />
  );
}
```

### Garage Form
```tsx
<CarFormWizard
  mode="garage"
  redirectTo={ROUTES.ACCOUNT_CARS}
  title="Add to Garage"
  subtitle="Track your personal vehicles"
/>
```

### Embedded Form (No Header)
```tsx
<CarFormWizard
  mode="listing"
  embedded={true}
  onSubmit={async (data) => {
    // Custom submit logic
    await api.createListing(data);
  }}
  onCancel={() => {
    // Custom cancel logic
    router.back();
  }}
/>
```

## 🎨 Features

### Mode-Specific Behavior
**Listing Mode (`mode="listing"`)**
- ✅ Step 1: Basic Info (Brand, Model, Year, VIN)
- ✅ Step 2: Details (Type, Color, Mileage, Engine, Transmission, Fuel, Trim)
- ✅ Step 3: Pricing (Price with tips)
- ✅ Step 4: Description (Text + Photo upload placeholder)

**Garage Mode (`mode="garage"`)**
- ✅ Step 1: Basic Info (Brand, Model, Year, VIN)
- ✅ Step 2: Details (Type, Color, Mileage, Engine, Transmission, Fuel)

### Smart Features
- ✨ **Validation** - Real-time field validation with error messages
- ✨ **Progress Tracking** - Visual stepper with completion indicators
- ✨ **Responsive Design** - Works beautifully on mobile and desktop
- ✨ **Dark Mode** - Full dark mode support
- ✨ **Type Safety** - Fully typed with TypeScript
- ✨ **Accessibility** - Proper labels, ARIA attributes, and keyboard navigation
- ✨ **Error Handling** - Graceful error display and recovery

## 📋 Props Reference

### CarFormWizard

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'listing' \| 'garage'` | Required | Form mode (affects steps shown) |
| `onSubmit` | `(data: CarFormData) => Promise<void>` | undefined | Custom submit handler |
| `onCancel` | `() => void` | undefined | Custom cancel handler |
| `redirectTo` | `string` | mode-based | Where to redirect after success |
| `title` | `string` | mode-based | Page title |
| `subtitle` | `string` | undefined | Page subtitle |
| `embedded` | `boolean` | `false` | Removes header for embedded use |

## 🏗️ Architecture

```
components/sections/shared/forms/car/
├── CarFormWizard.tsx          # Main orchestrator
├── CarBasicInfoStep.tsx       # Step 1: Basic info
├── CarDetailsStep.tsx         # Step 2: Details
├── CarPricingStep.tsx         # Step 3: Pricing (listing only)
├── CarDescriptionStep.tsx     # Step 4: Description (listing only)
├── CarFormStepper.tsx         # Progress indicator
├── useCarForm.ts              # Form state hook
├── CarFormTypes.ts            # Shared types
├── index.ts                   # Public exports
└── README.md                  # This file
```

## 🔌 Integration Points

### Current Usage
1. **`/app/(admin)/account/cars/new/page.tsx`** - Create listing (listing mode)
2. **`/app/(admin)/account/cars/add-to-garage/page.tsx`** - Add to garage (garage mode)
3. **`/components/sections/ListPage/ListCtaSection.tsx`** - Embedded form for logged-in users

### Adding New Integration
```tsx
import { CarFormWizard } from '@/components/sections/shared/forms/car';

// In your component
<CarFormWizard
  mode="listing" // or "garage"
  onSubmit={async (formData) => {
    // Your custom logic
    await yourApiCall(formData);
  }}
  redirectTo="/your-success-page"
/>
```

## 🎨 Customization

### Custom Submit Handler
```tsx
<CarFormWizard
  mode="listing"
  onSubmit={async (data) => {
    try {
      await api.createCar(data);
      toast.success('Car added!');
    } catch (error) {
      toast.error('Failed to add car');
      throw error; // Re-throw to show error in form
    }
  }}
/>
```

### Using Individual Steps
```tsx
import { 
  CarBasicInfoStep,
  useCarForm 
} from '@/components/sections/shared/forms/car';

function CustomForm() {
  const { formData, errors, handleInputChange } = useCarForm('listing');
  
  return (
    <CarBasicInfoStep
      formData={formData}
      errors={errors}
      onChange={handleInputChange}
    />
  );
}
```

## 🔧 Form Data Structure

```typescript
interface CarFormData {
  // Basic Info
  brand: string;
  model: string;
  year: string;
  vin: string;
  
  // Details
  type: string;
  color: string;
  mileage: string;
  engine: string;
  transmission: string;
  fuelType: string;
  complectation?: string;
  
  // Pricing (listing only)
  price?: string;
  
  // Description (listing only)
  description?: string;
  images?: File[];
}
```

## ✨ Best Practices

1. **Always specify `mode`** - Determines which steps are shown
2. **Use `embedded={true}`** for inline forms without headers
3. **Provide `onSubmit`** for custom API integration
4. **Set `redirectTo`** for post-success navigation
5. **Handle errors** in your `onSubmit` - re-throw to display in form

## 🚦 Validation Rules

### Step 1 (Basic Info)
- ✅ Brand: Required
- ✅ Model: Required
- ✅ Year: Required, numeric, 1900 - (current year + 1)
- ✅ VIN: Required, max 17 characters, auto-uppercase

### Step 2 (Details)
- ✅ Type: Required (dropdown)
- ✅ Mileage: Required, numeric
- ✅ Fuel Type: Required (dropdown)
- ✅ Transmission: Required (dropdown)
- ⭕ Color: Optional
- ⭕ Engine: Optional
- ⭕ Complectation: Optional (listing mode only)

### Step 3 (Pricing - listing only)
- ✅ Price: Required, numeric

### Step 4 (Description - listing only)
- ⭕ All fields optional

## 🎯 Future Enhancements

- [ ] Photo upload implementation
- [ ] Auto-fetch car details from VIN
- [ ] Market-specific currency formatting
- [ ] Draft save/resume functionality
- [ ] Multi-language support
- [ ] Advanced validation (e.g., VIN checksum)
- [ ] Conditional fields based on car type

---

**Built with ❤️ for CarRentPro**
