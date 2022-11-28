import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import { ICarBasic } from '../../types/car';
import { ReactComponent as iconBack } from '../../assets/ICON_Back.svg';

import Bar from '../../components/UI/Bar/Bar';
import getCarDetailSections from '../../utils/getCarDetailSections';
import BarSection from './BarSection';
import Header from '../../components/layout/Header/Header';

function CarDetail() {
  const navigate = useNavigate();
  const goPreviousPage = () => navigate(-1);

  const { state }: { state: { car: ICarBasic } } = useLocation();
  const car = state?.car;

  const sections = getCarDetailSections(car);

  return (
    <Container>
      <Header headText="차량상세" leftChild={<BackIconSVG onClick={goPreviousPage} />} />
      <img alt="car" src={car.attribute.imageUrl} />

      <BrandName>
        <div className="brand">{car.attribute.brand}</div>
        <div className="name">{car.attribute.name}</div>
      </BrandName>

      <Bar rightText={`월 ${car.amount?.toLocaleString()}원`} />
      <BarSection sections={sections} />
    </Container>
  );
}

export default CarDetail;
const BackIconSVG = styled(iconBack)`
  width: 24px;
  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 205px;
  }
`;
const BrandName = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  padding-left: 20px;
  .brand {
    font-size: 20px;
    margin-bottom: 5px;
  }
  .name {
    font-size: 24px;
  }
`;
