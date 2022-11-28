import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useCarInfoList } from '../context/CarListContext';
import { CarFuelType, CarSegment, ICarBasic } from '../types/car';

type CarTypeParams = {
  segment?: CarSegment | '';
  fuelType?: CarFuelType;
};
type ResponseValues = {
  data: { payload: ICarBasic[] };
  status: number;
};

function useGetCarList() {
  const [isLoading, setIsLoading] = useState(false);
  const { setCarInfo } = useCarInfoList();
  const navigate = useNavigate();

  const getCarList = async (params?: CarTypeParams) => {
    setIsLoading(true);

    const {
      data: { payload },
      status,
    }: ResponseValues = await axiosInstance.get('/cars', { params });

    if (status >= 200 && status < 300) {
      setCarInfo(payload);
      setIsLoading(false);
    } else {
      navigate('/error', { state: { status } });
      setIsLoading(false);
    }
  };
  return { isLoading, getCarList };
}
export default useGetCarList;
