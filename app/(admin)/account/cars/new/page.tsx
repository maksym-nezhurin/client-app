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
import { useTypedTranslation } from '@/lib/i18n';
import { CarFormWizard } from '@/components/sections/shared/forms/car';
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
  const { t } = useTypedTranslation('client');
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
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Add to Garage
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Add your car to unlock community features, insights, and personalized recommendations
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main Form - 2 columns */}
        <div className="space-y-6 lg:col-span-3">
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

          <CarFormWizard
              mode="garage"
              redire={null}
              subtitle="Tell us about your vehicle"
              title="Basic Details"
            />
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
