export type Market = 'ua' | 'pl' | 'sk';
export type RegistrationCountry = 'UA' | 'PL' | 'SK';
export type CarStatus = 'draft' | 'active' | 'sold' | 'archived';
export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid' | 'lpg' | 'cng' | 'other';
export type TransmissionType = 'automatic' | 'manual' | 'cvt' | 'robot' | 'other';
export type BodyType = 'sedan' | 'suv' | 'hatchback' | 'coupe' | 'wagon' | 'pickup' | 'van' | 'other';
export type CurrencyCode = 'UAH' | 'PLN' | 'EUR' | 'USD';

export interface InsuranceInfo {
  provider?: string;
  policyNumber?: string;
  validFrom?: string;
  validTo?: string;
  status?: 'active' | 'expired' | 'unknown';
}

export interface ICar {
  id: string;
  ownerId: string;
  brand: string;
  model: string;
  vin: string;
  complectation?: string;
  trim?: string;
  licensePlate?: string;
  market?: Market;
  registrationCountry?: RegistrationCountry;
  status?: CarStatus;
  isPrimary?: boolean;
  type?: BodyType;
  fuelType?: FuelType;
  transmission?: TransmissionType;
  engine?: number;
  year?: number;
  mileage?: string | number;
  price?: number;
  currency?: CurrencyCode;
  description?: string;
  color?: string;
  images?: string[];
  createdAt?: string;
  isRentable?: boolean;
  rentPricePerDay?: number;
  insurance?: InsuranceInfo;
}

export interface ICarModel {
  id: string;
  makeId: string;
  makeDisplay: string;
  makeCountry: string;
  name: string; // model name
  trim: string;
  year: string;
  body?: string;
  co2?: string;
  doors?: string;
  drive?: string;
  engineBoreMm?: string;
  engineCc?: string;
  engineCompression?: string;
  engineCylinders?: string;
  engineFuel?: string;
  enginePosition?: string;
  enginePowerPs?: string;
  enginePowerRpm?: string;
  engineStrokeMm?: string;
  engineTorqueNm?: string;
  engineTorqueRpm?: string;
  engineType?: string;
  engineValvesPerCylinder?: string;
  fuelCapL?: string;
  heightMm?: string;
  lengthMm?: string;
  lkmCity?: string;
  lkmHwy?: string;
  lkmMixed?: string;
  seats?: string;
  soldInUs: boolean;
  topSpeedKph?: string;
  transmissionType?: string;
  weightKg?: string;
  wheelbaseMm?: string;
  widthMm?: string;
  zeroTo100Kph?: string;
}