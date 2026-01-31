import { Settings, Gauge, Fuel, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select, SelectOption } from '@/components/ui/Select';
import { CarDetails, CAR_TYPES, TRANSMISSION_TYPES, FUEL_TYPES } from './CarFormTypes';

interface CarDetailsStepProps {
  formData: CarDetails;
  errors: Record<string, string>;
  onChange: (field: keyof CarDetails, value: string) => void;
  showComplectation?: boolean;
}

export function CarDetailsStep({ formData, errors, onChange, showComplectation = true }: CarDetailsStepProps) {
  // Convert arrays to SelectOption format
  const carTypeOptions: SelectOption[] = CAR_TYPES.map(type => ({ label: type, value: type }));
  const transmissionOptions: SelectOption[] = TRANSMISSION_TYPES.map(type => ({ label: type, value: type }));
  const fuelTypeOptions: SelectOption[] = FUEL_TYPES.map(type => ({ label: type, value: type }));

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-400">
          <Settings className="h-3 w-3" />
          Vehicle Details
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Specifications
        </h2>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Provide detailed specifications
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Vehicle Type *
          </label>
          <Select
            value={formData.type}
            onChange={(value) => onChange('type', value)}
            options={carTypeOptions}
            placeholder="Select type"
            className={`w-full rounded-lg border px-4 py-3 transition-all focus:outline-none focus:ring-2 ${
              errors.type
                ? 'border-red-500 focus:ring-red-200'
                : 'border-slate-300 focus:border-primary focus:ring-primary/20 dark:border-slate-700'
            } bg-white dark:bg-slate-800 dark:text-white`}
          />
          {errors.type && (
            <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {errors.type}
            </p>
          )}
        </div>

        {/* Color */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Color
          </label>
          <Input
            type="text"
            placeholder="e.g., Black, White, Silver"
            value={formData.color}
            onChange={(e) => onChange('color', e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Mileage */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Mileage (km) *
          </label>
          <div className="relative">
            <Gauge className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 z-10" />
            <Input
              type="number"
              placeholder="e.g., 45000"
              value={formData.mileage}
              onChange={(e) => onChange('mileage', e.target.value)}
              className={`w-full rounded-lg border px-4 py-3 pl-10 transition-all focus:outline-none focus:ring-2 ${
                errors.mileage
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-slate-300 focus:border-primary focus:ring-primary/20 dark:border-slate-700'
              } bg-white dark:bg-slate-800 dark:text-white`}
            />
          </div>
          {errors.mileage && (
            <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {errors.mileage}
            </p>
          )}
        </div>

        {/* Engine */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Engine Size (L)
          </label>
          <Input
            type="text"
            placeholder="e.g., 2.0, 3.5"
            value={formData.engine}
            onChange={(e) => onChange('engine', e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Fuel Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Fuel Type *
          </label>
          <div className="relative">
            <Fuel className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 z-10 pointer-events-none" />
            <Select
              value={formData.fuelType}
              onChange={(value) => onChange('fuelType', value)}
              options={fuelTypeOptions}
              placeholder="Select fuel type"
              className={`w-full rounded-lg border px-4 py-3 pl-10 transition-all focus:outline-none focus:ring-2 ${
                errors.fuelType
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-slate-300 focus:border-primary focus:ring-primary/20 dark:border-slate-700'
              } bg-white dark:bg-slate-800 dark:text-white`}
            />
          </div>
          {errors.fuelType && (
            <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {errors.fuelType}
            </p>
          )}
        </div>

        {/* Transmission */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Transmission *
          </label>
          <Select
            value={formData.transmission}
            onChange={(value) => onChange('transmission', value)}
            options={transmissionOptions}
            placeholder="Select transmission"
            className={`w-full rounded-lg border px-4 py-3 transition-all focus:outline-none focus:ring-2 ${
              errors.transmission
                ? 'border-red-500 focus:ring-red-200'
                : 'border-slate-300 focus:border-primary focus:ring-primary/20 dark:border-slate-700'
            } bg-white dark:bg-slate-800 dark:text-white`}
          />
          {errors.transmission && (
            <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {errors.transmission}
            </p>
          )}
        </div>

        {/* Complectation (optional, only for listing) */}
        {showComplectation && (
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Trim/Complectation
            </label>
            <Input
              type="text"
              placeholder="e.g., Sport, Luxury, Premium"
              value={formData.complectation || ''}
              onChange={(e) => onChange('complectation', e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        )}
      </div>
    </div>
  );
}
