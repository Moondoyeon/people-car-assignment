/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, ReactNode, useContext, useState } from 'react';
import { ICarBasic, ICarInfoContext } from '../types/car';

export const CarInfoListContext = createContext<ICarInfoContext>({
  carInfo: [],
  setCarInfo: () => [],
});
export const useCarInfoList = () => useContext(CarInfoListContext);

interface Props {
  children: ReactNode;
}
function CarInfoProvider({ children }: Props) {
  const [carInfo, setCarInfo] = useState<ICarBasic[]>([]);

  return <CarInfoListContext.Provider value={{ carInfo, setCarInfo }}>{children}</CarInfoListContext.Provider>;
}

export default CarInfoProvider;
