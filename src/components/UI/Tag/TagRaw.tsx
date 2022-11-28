import styled, { FlattenInterpolation, ThemeProps } from 'styled-components';
import { flexBox } from '../../../styles/mixin';

type TagRawProps = {
  text: string;
  customStyle: FlattenInterpolation<ThemeProps<unknown>>;
  onClick?: () => void;
};
function Tag({ text, customStyle, onClick }: TagRawProps) {
  return (
    <Container customStyle={customStyle} onClick={onClick}>
      {text}
    </Container>
  );
}
const Container = styled.div<{ customStyle: FlattenInterpolation<ThemeProps<unknown>> }>`
  ${flexBox()};
  border-radius: 50px;
  font-weight: 700;
  ${({ customStyle }) => customStyle};
`;
export default Tag;
