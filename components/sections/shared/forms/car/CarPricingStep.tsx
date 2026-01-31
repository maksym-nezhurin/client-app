import { DollarSign, Sparkles, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { CarPricing } from './CarFormTypes';

interface CarPricingStepProps {
  formData: CarPricing;
  errors: Record<string, string>;
  onChange: (field: keyof CarPricing, value: string) => void;
}

export function CarPricingStep({ formData, errors, onChange }: CarPricingStepProps) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400">
          <DollarSign className="h-3 w-3" />
          Pricing
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Set Your Price
        </h2>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Set your asking price
        </p>
      </div>

      <div className="max-w-md">
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Asking Price (USD) *
        </label>
        <div className="relative">
          <DollarSign className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400 z-10" />
          <Input
            type="number"
            placeholder="e.g., 35000"
            value={formData.price}
            onChange={(e) => onChange('price', e.target.value)}
            className={`w-full rounded-lg border px-4 py-4 pl-12 text-lg transition-all focus:outline-none focus:ring-2 ${
              errors.price
                ? 'border-red-500 focus:ring-red-200'
                : 'border-slate-300 focus:border-primary focus:ring-primary/20 dark:border-slate-700'
            } bg-white dark:bg-slate-800 dark:text-white`}
          />
        </div>
        {errors.price && (
          <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            {errors.price}
          </p>
        )}
        
        {/* Price Preview */}
        {formData.price && !errors.price && (
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
            <p className="text-sm text-green-700 dark:text-green-400">
              Your listing price: <span className="text-lg font-bold">${Number(formData.price).toLocaleString()}</span>
            </p>
          </div>
        )}

        {/* Pricing Tips */}
        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-blue-900 dark:text-blue-200">
              Pricing Tips
            </h3>
          </div>
          <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Research similar vehicles to set a competitive price</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Consider your vehicle's condition and mileage</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Be realistic - overpriced listings get fewer views</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>You can always adjust the price later</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
