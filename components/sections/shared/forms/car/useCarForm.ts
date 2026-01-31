import { useState } from 'react';
import { CarFormData, CarFormMode } from './CarFormTypes';

export function useCarForm(mode: CarFormMode = 'listing') {
  const [formData, setFormData] = useState<CarFormData>({
    // Basic Info
    brand: '',
    model: '',
    year: '',
    vin: '',
    
    // Details
    type: '',
    color: '',
    mileage: '',
    engine: '',
    transmission: '',
    fuelType: '',
    complectation: '',
    
    // Pricing (listing only)
    ...(mode === 'listing' && { price: '' }),
    
    // Description (listing only)
    ...(mode === 'listing' && { 
      description: '',
      images: [] as File[]
    }),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof CarFormData, value: string | File[]) => {
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
      // Basic Info
      if (!formData.brand) newErrors.brand = 'Brand is required';
      if (!formData.model) newErrors.model = 'Model is required';
      if (!formData.year) newErrors.year = 'Year is required';
      if (!formData.vin) newErrors.vin = 'VIN is required';
    } else if (step === 2) {
      // Details
      if (!formData.type) newErrors.type = 'Vehicle type is required';
      if (!formData.mileage) newErrors.mileage = 'Mileage is required';
      if (!formData.fuelType) newErrors.fuelType = 'Fuel type is required';
      if (!formData.transmission) newErrors.transmission = 'Transmission is required';
    } else if (step === 3 && mode === 'listing') {
      // Pricing (listing only)
      if (!formData.price) newErrors.price = 'Price is required';
      if (formData.price && isNaN(Number(formData.price))) {
        newErrors.price = 'Price must be a number';
      }
    }
    // Step 4 (description) has no required fields

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
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
      ...(mode === 'listing' && { 
        price: '',
        description: '',
        images: [] as File[]
      }),
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    setErrors,
    handleInputChange,
    validateStep,
    resetForm,
  };
}
