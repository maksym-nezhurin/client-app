import { CheckCircle } from 'lucide-react';
import { CarFormStep } from './CarFormTypes';

interface CarFormStepperProps {
  steps: CarFormStep[];
  currentStep: number;
}

export function CarFormStepper({ steps, currentStep }: CarFormStepperProps) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/80 p-6 backdrop-blur-xl dark:bg-slate-900/80">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-all ${
                  currentStep >= step.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <step.icon className="h-6 w-6" />
                )}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  currentStep >= step.id
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-4 h-1 flex-1 rounded transition-all ${
                  currentStep > step.id
                    ? 'bg-primary'
                    : 'bg-slate-200 dark:bg-slate-800'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
