export interface ICarAttribute {
  brand: string;
  name: string;
  segment: string;
  fuelType: string;
  imageUrl: string;
}
export interface ICarInsurance {
  name: string;
  description: string;
}
export interface ICarAdditionalProducts {
  name: string;
  amount: number;
}
export interface ICarBasic {
  id: number | undefined;
  amount: number | undefined;
  attribute: ICarAttribute;
  startDate: Date;
  createdAt: Date;
  insurance: ICarInsurance[] | undefined;
  additionalProducts: ICarAdditionalProducts[] | undefined;
}

export interface ICarsContext {
  cars: ICarBasic[];
  setCars: React.Dispatch<React.SetStateAction<ICarBasic[]>>;
}

export type CarSegment = 'C' | 'D' | 'E' | 'SUV';
export type CarFuelType = 'gasoline' | 'hybrid' | 'ev';

export interface ISegmentValues {
  id: number;
  enum: CarSegment | '';
  text: string;
}
