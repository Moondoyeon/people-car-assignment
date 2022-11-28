import { ICarBasic } from '../types/car';
import { CAR_SEGMENT, CAR_FUELTYPE } from '../constant/static';
import parseDate from './parseDate';

const getCarDetailSections = (car: ICarBasic) => [
  {
    title: '차량정보',
    data: [
      {
        subTitle: '차종',
        key: '차종',
        content: CAR_SEGMENT[car.attribute.segment],
      },
      {
        subTitle: '연료',
        key: '연료',
        content: CAR_FUELTYPE[car.attribute.fuelType],
      },
      {
        subTitle: '이용 가능일',
        key: '이용 가능일',
        content: `${parseDate(car.startDate)}`,
      },
    ],
  },
  {
    title: '보험',
    data: car.insurance?.map((insurance) => ({
      subTitle: insurance.name,
      key: insurance.name,
      content: insurance.description,
    })),
  },
  {
    title: '추가상품',
    data: car.additionalProducts?.map((product) => ({
      subTitle: product.name,
      key: product.name,
      content: `월 ${product.amount.toLocaleString()} 원`,
    })),
  },
];
export default getCarDetailSections;
