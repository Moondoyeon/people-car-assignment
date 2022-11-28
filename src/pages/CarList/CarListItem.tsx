/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import TagSmall from '../../components/UI/Tag/TagSmall';
import { ICarBasic } from '../../types/car';
import isWithinADay from '../../utils/isWithinADay';

type Props = {
  car: ICarBasic;
};

function CarListItem({ car }: Props) {
  const navigate = useNavigate();
  const goCarDetailPage = () => {
    navigate(`/cars/${car.id}`, { state: { car } });
  };

  return (
    <Container onClick={goCarDetailPage}>
      <InfoWrapper>
        <MainInfo>
          <div className="main-info">{car.attribute.brand}</div>
          <div className="main-info">{car.attribute.name}</div>
        </MainInfo>
        <SubInfo>
          <div className="sub-info">
            {car.attribute.segment} / {car.attribute.fuelType}
          </div>
          <div className="sub-info">월 {car.amount?.toLocaleString()} 원 부터</div>
        </SubInfo>
      </InfoWrapper>
      <ImgWrapper>
        <img alt="car" src={car.attribute.imageUrl} />

        {isWithinADay(car.createdAt) && <TagSmall text="신규" customStyle={TagSmallStyle} />}
      </ImgWrapper>
    </Container>
  );
}

export default CarListItem;
const Container = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  height: 120px;
  width: 100%;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.black};
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const MainInfo = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
  div {
    margin-bottom: 2px;
  }
`;
const SubInfo = styled.div`
  font-size: 12px;
  div {
    margin-bottom: 2px;
  }
`;
const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  padding-right: 20px;
  img {
    width: 152px;
    height: 80px;
  }
`;

const TagSmallStyle = css`
  position: absolute;

  bottom: 70px;
  right: 8px;
`;
