// ============================================================================
// CAR FORM TYPES - Shared across all car forms
// ============================================================================

export interface CarBasicInfo {
  brand: string;
  model: string;
  year: string;
  vin: string;
}

export interface CarDetails {
  type: string;
  color: string;
  mileage: string;
  engine: string;
  transmission: string;
  fuelType: string;
  complectation?: string;
}

export interface CarPricing {
  price: string;
}

export interface CarDescription {
  description: string;
  images: File[];
}

export interface CarFormData extends CarBasicInfo, CarDetails, Partial<CarPricing>, Partial<CarDescription> {}

export enum CarFormMode {
  LISTING = 'listing',
  GARAGE = 'garage',
}

export interface CarFormStep {
  id: number;
  name: string;
  icon: any;
  isRequired: boolean;
}

export const CAR_TYPES = ['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Wagon', 'Convertible', 'Truck', 'Van'];
export const TRANSMISSION_TYPES = ['Manual', 'Automatic', 'Semi-Automatic'];
export const FUEL_TYPES = ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid'];
