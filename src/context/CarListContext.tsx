/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, ReactNode, useContext, useState } from 'react';
import { ICarBasic, ICarsContext } from '../types/car';

export const CarsContext = createContext<ICarsContext>({
  cars: [],
  setCars: () => [],
});
export const useCars = () => useContext(CarsContext);

interface Props {
  children: ReactNode;
}
function CarsProvider({ children }: Props) {
  const [cars, setCars] = useState<ICarBasic[]>([]);

  return <CarsContext.Provider value={{ cars, setCars }}>{children}</CarsContext.Provider>;
}

export default CarsProvider;
