import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  headText: string;
  leftChild?: ReactNode;
}
function Header({ headText, leftChild }: Props) {
  return (
    <CustomHeader>
      <div className="head_left">{leftChild}</div>
      <div className="head_center">{headText}</div>
      <div className="head_right" />
    </CustomHeader>
  );
}

export default Header;
const CustomHeader = styled.header`
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.black};
  font-weight: 600;
  font-size: 17px;
  height: 60px;
  div {
    display: flex;
    justify-content: center;
  }
  .head_left {
    width: 15%;
  }
  .head_right {
    width: 15%;
  }
  .head_center {
    width: 70%;
    font-size: 20px;
  }
`;
