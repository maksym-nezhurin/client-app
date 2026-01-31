'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Car, Settings, DollarSign, FileText, ArrowLeft, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';
import { CarFormMode, CarFormStep } from './CarFormTypes';
import { useCarForm } from './useCarForm';
import { CarFormStepper } from './CarFormStepper';
import { CarBasicInfoStep } from './CarBasicInfoStep';
import { CarDetailsStep } from './CarDetailsStep';
import { CarPricingStep } from './CarPricingStep';
import { CarDescriptionStep } from './CarDescriptionStep';

interface CarFormWizardProps {
  mode: CarFormMode;
  onSubmit?: (data: any) => Promise<void>;
  onCancel?: () => void;
  redirectTo?: string;
  title?: string;
  subtitle?: string;
  embedded?: boolean; // If true, removes header and uses compact styling
}

export function CarFormWizard({
  mode,
  onSubmit,
  onCancel,
  redirectTo,
  title,
  subtitle,
  embedded = false,
}: CarFormWizardProps) {
  const router = useRouter();
  const { formData, errors, setErrors, handleInputChange, validateStep } = useCarForm(mode);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define steps based on mode
  const steps: CarFormStep[] = mode === CarFormMode.LISTING
    ? [
        { id: 1, name: 'Basic Info', icon: Car, isRequired: true },
        { id: 2, name: 'Details', icon: Settings, isRequired: true },
        { id: 3, name: 'Pricing', icon: DollarSign, isRequired: true },
        { id: 4, name: 'Description', icon: FileText, isRequired: false },
      ]
    : [
        { id: 1, name: 'Basic Info', icon: Car, isRequired: true },
        { id: 2, name: 'Details', icon: Settings, isRequired: true },
      ];

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFormSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default behavior
        console.log('Submitting car data:', formData);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      // Redirect
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push(mode === CarFormMode.LISTING ? ROUTES.ACCOUNT_CARS : ROUTES.ACCOUNT);
      }
    } catch (error) {
      console.error('Error submitting car:', error);
      setErrors({ submit: 'Failed to add car. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  return (
    <div className={embedded ? 'space-y-4' : 'space-y-6'}>
      {/* Header (skip if embedded) */}
      {!embedded && (
        <div className="flex items-center justify-between">
          <div>
            {
              mode === CarFormMode.LISTING ? (
                <button
                  onClick={handleCancelClick}
                  className="mb-2 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to My Cars
                </button>
              ) : null
            }
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {title || (mode === CarFormMode.LISTING ? 'Add New Vehicle for Sale' : 'Add to Garage')}
            </h1>
            {subtitle && (
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Progress Steps */}
      <CarFormStepper steps={steps} currentStep={currentStep} />

      {/* Form Content */}
      <div className={`rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl dark:bg-slate-900/80 ${embedded ? 'p-4' : 'p-8'}`}>
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <CarBasicInfoStep
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        )}

        {/* Step 2: Details */}
        {currentStep === 2 && (
          <CarDetailsStep
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
            showComplectation={mode === CarFormMode.LISTING}
          />
        )}

        {/* Step 3: Pricing (listing only) */}
        {currentStep === 3 && mode === CarFormMode.LISTING && formData.price !== undefined && (
          <CarPricingStep
            formData={{ price: formData.price }}
            errors={errors}
            onChange={handleInputChange}
          />
        )}

        {/* Step 4: Description (listing only) */}
        {currentStep === 4 && mode === CarFormMode.LISTING && formData.description !== undefined && (
          <CarDescriptionStep
            formData={{ 
              description: formData.description,
              images: formData.images || []
            }}
            errors={errors}
            onChange={handleInputChange}
          />
        )}

        {/* Submit Error */}
        {errors.submit && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
            <p className="flex items-center gap-2 text-sm text-red-700 dark:text-red-300">
              <AlertCircle className="h-5 w-5" />
              {errors.submit}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className={`flex items-center justify-between rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl dark:bg-slate-900/80 ${embedded ? 'p-4' : 'p-6'}`}>
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="text-sm text-slate-600 dark:text-slate-400">
          Step {currentStep} of {steps.length}
        </div>

        {currentStep < steps.length ? (
          <Button onClick={handleNext} className="gap-2">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button 
            onClick={handleFormSubmit} 
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {mode === CarFormMode.LISTING ? 'Publishing...' : 'Adding...'}
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                {mode === CarFormMode.LISTING ? 'Publish Listing' : 'Add to Garage'}
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
