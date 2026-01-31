import { Car, Calendar, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { CarBasicInfo } from './CarFormTypes';

interface CarBasicInfoStepProps {
  formData: CarBasicInfo;
  errors: Record<string, string>;
  onChange: (field: keyof CarBasicInfo, value: string) => void;
}

export function CarBasicInfoStep({ formData, errors, onChange }: CarBasicInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400">
          <Car className="h-3 w-3" />
          Basic Information
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Vehicle Information
        </h2>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Enter your vehicle's basic details
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Brand */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Brand *
          </label>
          <Input
            type="text"
            placeholder="e.g., BMW, Mercedes, Tesla"
            value={formData.brand}
            onChange={(e) => onChange('brand', e.target.value)}
            className={`w-full rounded-lg border px-4 py-3 transition-all focus:outline-none focus:ring-2 ${
              errors.brand
                ? 'border-red-500 focus:ring-red-200'
                : 'border-slate-300 focus:border-primary focus:ring-primary/20 dark:border-slate-700'
            } bg-white dark:bg-slate-800 dark:text-white`}
          />
          {errors.brand && (
            <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {errors.brand}
            </p>
          )}
        </div>

        {/* Model */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Model *
          </label>
          <Input
            type="text"
            placeholder="e.g., X5, C-Class, Model 3"
            value={formData.model}
            onChange={(e) => onChange('model', e.target.value)}
            className={`w-full rounded-lg border px-4 py-3 transition-all focus:outline-none focus:ring-2 ${
              errors.model
                ? 'border-red-500 focus:ring-red-200'
                : 'border-slate-300 focus:border-primary focus:ring-primary/20 dark:border-slate-700'
            } bg-white dark:bg-slate-800 dark:text-white`}
          />
          {errors.model && (
            <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {errors.model}
            </p>
          )}
        </div>

        {/* Year */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Year *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 z-10" />
            <Input
              type="number"
              placeholder="e.g., 2022"
              min="1900"
              max={new Date().getFullYear() + 1}
              value={formData.year}
              onChange={(e) => onChange('year', e.target.value)}
              className={`w-full rounded-lg border px-4 py-3 pl-10 transition-all focus:outline-none focus:ring-2 ${
                errors.year
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-slate-300 focus:border-primary focus:ring-primary/20 dark:border-slate-700'
              } bg-white dark:bg-slate-800 dark:text-white`}
            />
          </div>
          {errors.year && (
            <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {errors.year}
            </p>
          )}
        </div>

        {/* VIN */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            VIN (Vehicle Identification Number) *
          </label>
          <Input
            type="text"
            placeholder="17-character VIN"
            maxLength={17}
            value={formData.vin}
            onChange={(e) => onChange('vin', e.target.value.toUpperCase())}
            className={`w-full rounded-lg border px-4 py-3 font-mono transition-all focus:outline-none focus:ring-2 ${
              errors.vin
                ? 'border-red-500 focus:ring-red-200'
                : 'border-slate-300 focus:border-primary focus:ring-primary/20 dark:border-slate-700'
            } bg-white dark:bg-slate-800 dark:text-white`}
          />
          {errors.vin && (
            <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {errors.vin}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
