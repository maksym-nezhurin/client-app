import { FileText, Upload } from 'lucide-react';
import { CarDescription } from './CarFormTypes';

interface CarDescriptionStepProps {
  formData: CarDescription;
  errors: Record<string, string>;
  onChange: (field: keyof CarDescription, value: string | File[]) => void;
}

export function CarDescriptionStep({ formData, errors, onChange }: CarDescriptionStepProps) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-400">
          <FileText className="h-3 w-3" />
          Final Details
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Description & Photos
        </h2>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Tell buyers about your vehicle
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Description
        </label>
        <textarea
          rows={6}
          placeholder="Describe your vehicle's condition, features, service history, and any other relevant details..."
          value={formData.description}
          onChange={(e) => onChange('description', e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {formData.description?.length || 0} characters
        </p>
      </div>

      {/* Photos Upload (Placeholder) */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Photos (Coming Soon)
        </label>
        <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <div className="text-center">
            <Upload className="mx-auto h-10 w-10 text-slate-400" />
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Photo upload coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
