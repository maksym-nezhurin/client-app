export interface ICar {
  id: string,
  ownerId: string,
  brand: string,
  complectation: string,
  engine: number,
  model: string,
  type: string,
  price: number,
  year: number,
  mileage: string | number,
  description: string;
  color?: string;
  createdAt?: string;
  isRentable?: boolean;
  rentPricePerDay?: number;
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