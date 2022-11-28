/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';

interface Props {
  color: 'blue' | 'default';
  leftText?: string;
  rightText?: string | number;
}
const Container = styled.div<{ barColor: string }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: ${({ barColor }) => (barColor === 'blue' ? '#0094FF' : 'white')};
  color: ${({ barColor }) => (barColor === 'blue' ? 'white' : '#000000')};
  font-size: 17px;
  div {
    display: flex;
  }
  .bar_left {
    width: 50%;
    justify-content: flex-start;
    padding-left: 20px;
    font-weight: 500;
  }
  .bar_right {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
  }
`;

function Bar({ color, leftText, rightText }: Props) {
  const barColor: string = color;
  return (
    <Container barColor={barColor}>
      <div className="bar_left">{leftText}</div>
      <div className="bar_right">{rightText}</div>
    </Container>
  );
}
Bar.defaultProps = {
  color: 'default',
};
export default Bar;
