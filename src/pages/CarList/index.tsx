/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useCarInfoList } from '../../context/CarListContext';
import { flexBox } from '../../styles/mixin';

import useGetCarList from '../../hooks/useGetCarList';
import getCarSegment from '../../utils/getCarSegment';
import SegmentTap from './SegmentTab';
import CarListItem from './CarListItem';
import Header from '../../components/layout/Header/Header';

function CarList() {
  const { carInfo } = useCarInfoList();
  const { isLoading, getCarList } = useGetCarList();
  const [searchParams, setSearchParams] = useSearchParams();
  const segment = useMemo(() => getCarSegment(searchParams), [searchParams]);

  useEffect(() => {
    getCarList({ segment: segment });
  }, [segment]);

  return (
    <Container>
      <Header headText="차량목록" />

      <SegmentTap segment={segment} setSearchParams={setSearchParams} />
      {isLoading && <Notice>불러오는 중</Notice>}

      {!isLoading && carInfo?.map((car) => <CarListItem key={car.id} car={car} />)}

      {!isLoading && !carInfo?.length && <Notice>차량이 없습니다.</Notice>}
    </Container>
  );
}

export default CarList;
const Container = styled.div``;

const Notice = styled.div`
  ${flexBox()};
  width: 100%;
  height: calc(100vh - 300px);
  font-size: 17px;
  font-weight: 700;
`;
