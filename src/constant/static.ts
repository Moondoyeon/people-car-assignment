import { ISegmentValues } from '../types/car';

export const CAR_SEGMENT: { [key: string]: string } = {
  SUV: 'SUV',
  E: '대형',
  D: '중형',
  C: '소형',
};

export const CAR_SEGMENT_CATEGORY: ISegmentValues[] = [
  { id: 1, enum: '', text: '전체' },
  { id: 2, enum: 'C', text: 'SUV' },
  { id: 3, enum: 'D', text: '대형' },
  { id: 4, enum: 'E', text: '중형' },
  { id: 5, enum: 'SUV', text: '소형' },
];

export const CAR_FUELTYPE: { [key: string]: string } = {
  gasoline: '가솔린',
  ev: '전기',
  hybrid: '하이브리드',
};

export const CAR_FUELTYPE_CATEGORY = [
  { id: 1, enum: 'gasoline', text: '가솔린' },
  { id: 2, enum: 'ev', text: '전기' },
  { id: 3, enum: 'hybrid', text: '하이브리드' },
];
