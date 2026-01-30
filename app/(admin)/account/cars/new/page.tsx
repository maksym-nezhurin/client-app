'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { 
  Car, 
  Upload, 
  DollarSign, 
  Calendar, 
  Gauge, 
  Fuel,
  Settings,
  FileText,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import Link from 'next/link';

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
  complectation: string;
  
  // Pricing
  price: string;
  
  // Description
  description: string;
  
  // Images (placeholder for now)
  images: File[];
}

export default function AddCarPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<CarFormData>({
    brand: '',
    model: '',
    year: '',
    vin: '',
    type: '',
    color: '',
    mileage: '',
    engine: '',
    transmission: '',
    fuelType: '',
    complectation: '',
    price: '',
    description: '',
    images: [],
  });

  const steps = [
    { id: 1, name: 'Basic Info', icon: Car },
    { id: 2, name: 'Details', icon: Settings },
    { id: 3, name: 'Pricing', icon: DollarSign },
    { id: 4, name: 'Description', icon: FileText },
  ];

  const carTypes = ['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Wagon', 'Convertible', 'Truck', 'Van'];
  const transmissionTypes = ['Manual', 'Automatic', 'Semi-Automatic'];
  const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid'];

  const handleInputChange = (field: keyof CarFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.brand) newErrors.brand = 'Brand is required';
      if (!formData.model) newErrors.model = 'Model is required';
      if (!formData.year) newErrors.year = 'Year is required';
      if (!formData.vin) newErrors.vin = 'VIN is required';
    } else if (step === 2) {
      if (!formData.type) newErrors.type = 'Vehicle type is required';
      if (!formData.mileage) newErrors.mileage = 'Mileage is required';
      if (!formData.fuelType) newErrors.fuelType = 'Fuel type is required';
      if (!formData.transmission) newErrors.transmission = 'Transmission is required';
    } else if (step === 3) {
      if (!formData.price) newErrors.price = 'Price is required';
      if (formData.price && isNaN(Number(formData.price))) {
        newErrors.price = 'Price must be a number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    try {
      // TODO: Replace with actual API call
      console.log('Submitting car data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success! Redirect to cars list
      router.push(ROUTES.ACCOUNT_CARS);
    } catch (error) {
      console.error('Error submitting car:', error);
      setErrors({ submit: 'Failed to add car. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link 
            href={ROUTES.ACCOUNT_CARS}
            className="mb-2 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Cars
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Add New Vehicle
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            List your vehicle and reach thousands of potential buyers
          </p>
        </div>
      </div>

      {/* Progress Steps */}
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

      {/* Form Content */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="mb-6">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400">
                <Car className="h-3 w-3" />
                Step 1 of 4
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Basic Information
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
                <input
                  type="text"
                  placeholder="e.g., BMW, Mercedes, Tesla"
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
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
                <input
                  type="text"
                  placeholder="e.g., X5, C-Class, Model 3"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
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
                  <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    placeholder="e.g., 2022"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
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
                <input
                  type="text"
                  placeholder="17-character VIN"
                  maxLength={17}
                  value={formData.vin}
                  onChange={(e) => handleInputChange('vin', e.target.value.toUpperCase())}
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
        )}

        {/* Step 2: Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="mb-6">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-400">
                <Settings className="h-3 w-3" />
                Step 2 of 4
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Vehicle Details
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
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 transition-all focus:outline-none focus:ring-2 ${
                    errors.type
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-slate-300 focus:border-primary focus:ring-primary/20 dark:border-slate-700'
                  } bg-white dark:bg-slate-800 dark:text-white`}
                >
                  <option value="">Select type</option>
                  {carTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
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
                <input
                  type="text"
                  placeholder="e.g., Black, White, Silver"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Mileage */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Mileage (km) *
                </label>
                <div className="relative">
                  <Gauge className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    placeholder="e.g., 45000"
                    value={formData.mileage}
                    onChange={(e) => handleInputChange('mileage', e.target.value)}
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
                <input
                  type="text"
                  placeholder="e.g., 2.0, 3.5"
                  value={formData.engine}
                  onChange={(e) => handleInputChange('engine', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Fuel Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Fuel Type *
                </label>
                <div className="relative">
                  <Fuel className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <select
                    value={formData.fuelType}
                    onChange={(e) => handleInputChange('fuelType', e.target.value)}
                    className={`w-full rounded-lg border px-4 py-3 pl-10 transition-all focus:outline-none focus:ring-2 ${
                      errors.fuelType
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-slate-300 focus:border-primary focus:ring-primary/20 dark:border-slate-700'
                    } bg-white dark:bg-slate-800 dark:text-white`}
                  >
                    <option value="">Select fuel type</option>
                    {fuelTypes.map(fuel => (
                      <option key={fuel} value={fuel}>{fuel}</option>
                    ))}
                  </select>
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
                <select
                  value={formData.transmission}
                  onChange={(e) => handleInputChange('transmission', e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 transition-all focus:outline-none focus:ring-2 ${
                    errors.transmission
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-slate-300 focus:border-primary focus:ring-primary/20 dark:border-slate-700'
                  } bg-white dark:bg-slate-800 dark:text-white`}
                >
                  <option value="">Select transmission</option>
                  {transmissionTypes.map(trans => (
                    <option key={trans} value={trans}>{trans}</option>
                  ))}
                </select>
                {errors.transmission && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {errors.transmission}
                  </p>
                )}
              </div>

              {/* Complectation */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Trim/Complectation
                </label>
                <input
                  type="text"
                  placeholder="e.g., Sport, Luxury, Premium"
                  value={formData.complectation}
                  onChange={(e) => handleInputChange('complectation', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Pricing */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="mb-6">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400">
                <DollarSign className="h-3 w-3" />
                Step 3 of 4
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Pricing
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
                <DollarSign className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  placeholder="e.g., 35000"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
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
        )}

        {/* Step 4: Description */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="mb-6">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-400">
                <FileText className="h-3 w-3" />
                Step 4 of 4
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
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {formData.description.length} characters
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
        )}

        {/* Submit Error */}
        {errors.submit && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
            <p className="flex items-center gap-2 text-sm text-red-700 dark:text-red-300">
              <AlertCircle className="h-5 w-5" />
              {errors.submit}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/80 p-6 backdrop-blur-xl dark:bg-slate-900/80">
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
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Publishing...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                Publish Listing
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
