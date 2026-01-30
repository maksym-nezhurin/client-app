'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { 
  Car, 
  Calendar, 
  Gauge, 
  Fuel,
  Settings,
  CheckCircle,
  ArrowLeft,
  Users,
  TrendingUp,
  Bell,
  MessageCircle,
  Sparkles,
  Shield,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import Link from 'next/link';

interface GarageCarFormData {
  // Basic Info
  brand: string;
  model: string;
  year: string;
  vin: string;
  
  // Details
  mileage: string;
  color: string;
  engine: string;
  transmission: string;
  fuelType: string;
}

export default function AddToGaragePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<GarageCarFormData>({
    brand: '',
    model: '',
    year: '',
    vin: '',
    mileage: '',
    color: '',
    engine: '',
    transmission: '',
    fuelType: '',
  });

  const transmissionTypes = ['Manual', 'Automatic', 'Semi-Automatic'];
  const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid'];

  const handleInputChange = (field: keyof GarageCarFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.brand) newErrors.brand = 'Brand is required';
    if (!formData.model) newErrors.model = 'Model is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.mileage) newErrors.mileage = 'Mileage is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // TODO: Replace with actual API call
      console.log('Adding car to garage:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success! Redirect to cars page
      router.push(ROUTES.ACCOUNT_CARS);
    } catch (error) {
      console.error('Error adding car to garage:', error);
      setErrors({ submit: 'Failed to add car. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Users,
      title: 'Owner Community',
      description: 'Connect with other owners of the same model',
      color: 'blue',
    },
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Track your car\'s market value in real-time',
      color: 'purple',
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Get maintenance alerts and service tips',
      color: 'green',
    },
    {
      icon: MessageCircle,
      title: 'Expert Advice',
      description: 'Ask questions and get help from experts',
      color: 'orange',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link 
          href={ROUTES.ACCOUNT_CARS}
          className="mb-2 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Cars
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Add to Garage
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Add your car to unlock community features, insights, and personalized recommendations
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form - 2 columns */}
        <div className="space-y-6 lg:col-span-2">
          {/* Important Notice */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950/30">
            <div className="flex gap-3">
              <Shield className="h-6 w-6 shrink-0 text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="mb-1 font-semibold text-blue-900 dark:text-blue-200">
                  This car will NOT be listed for sale
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Adding a car to your garage is for personal tracking only. You'll get access to community features, market insights, and maintenance tips. Want to sell? Use "List for Sale" instead.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
            <div className="mb-6">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-400">
                <Car className="h-3 w-3" />
                Vehicle Information
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Basic Details
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Tell us about your vehicle
              </p>
            </div>

            <div className="space-y-6">
              {/* Basic Info Grid */}
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

                {/* VIN (Optional) */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    VIN <span className="text-slate-500">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="17-character VIN"
                    maxLength={17}
                    value={formData.vin}
                    onChange={(e) => handleInputChange('vin', e.target.value.toUpperCase())}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-mono transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    For CarVertical reports & detailed history
                  </p>
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

                {/* Color */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Color <span className="text-slate-500">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Black, White, Silver"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Fuel Type <span className="text-slate-500">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Fuel className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <select
                      value={formData.fuelType}
                      onChange={(e) => handleInputChange('fuelType', e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pl-10 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="">Select fuel type</option>
                      {fuelTypes.map(fuel => (
                        <option key={fuel} value={fuel}>{fuel}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Transmission <span className="text-slate-500">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Settings className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <select
                      value={formData.transmission}
                      onChange={(e) => handleInputChange('transmission', e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pl-10 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="">Select transmission</option>
                      {transmissionTypes.map(trans => (
                        <option key={trans} value={trans}>{trans}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Engine */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Engine Size (L) <span className="text-slate-500">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 2.0, 3.5"
                    value={formData.engine}
                    onChange={(e) => handleInputChange('engine', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
                  <p className="flex items-center gap-2 text-sm text-red-700 dark:text-red-300">
                    <AlertCircle className="h-5 w-5" />
                    {errors.submit}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="w-full gap-2"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Adding to Garage...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    Add to Garage
                    <ChevronRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Benefits Sidebar - 1 column */}
        <div className="space-y-6">
          {/* What You'll Get */}
          <div className="rounded-2xl border border-white/20 bg-white/80 p-6 backdrop-blur-xl dark:bg-slate-900/80">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-slate-900 dark:text-white">
                What You'll Get
              </h3>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    benefit.color === 'blue' && 'bg-blue-500/10'
                  } ${
                    benefit.color === 'purple' && 'bg-purple-500/10'
                  } ${
                    benefit.color === 'green' && 'bg-green-500/10'
                  } ${
                    benefit.color === 'orange' && 'bg-orange-500/10'
                  }`}>
                    <benefit.icon className={`h-5 w-5 ${
                      benefit.color === 'blue' && 'text-blue-600 dark:text-blue-400'
                    } ${
                      benefit.color === 'purple' && 'text-purple-600 dark:text-purple-400'
                    } ${
                      benefit.color === 'green' && 'text-green-600 dark:text-green-400'
                    } ${
                      benefit.color === 'orange' && 'text-orange-600 dark:text-orange-400'
                    }`} />
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-semibold text-slate-900 dark:text-white">
                      {benefit.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div className="rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950/30">
            <div className="mb-2 flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
              <h3 className="font-semibold text-green-900 dark:text-green-200">
                Your Privacy
              </h3>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              Your garage vehicles are private by default. You control what information is shared with the community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
