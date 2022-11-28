import { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import TagRaw from './TagRaw';

type TagLargeProps = {
  text: string;
  isActive?: boolean;
  onClick: () => void;
  customStyle: FlattenInterpolation<ThemeProps<unknown>>;
};
function Tag({ text, isActive = false, customStyle, onClick }: TagLargeProps) {
  return <TagRaw text={text} customStyle={TagLargeStyle(isActive, customStyle)} onClick={onClick} />;
}
const TagLargeStyle = (isActive: boolean, customStyle: FlattenInterpolation<ThemeProps<unknown>> | undefined) => css`
  color: blue;
  width: 62px;
  height: 27px;
  padding-top: 1px;
  background-color: ${({ theme }) => (isActive ? theme.black : theme.gray)};
  font-size: 14px;
  color: ${({ theme }) => (isActive ? theme.white : theme.black)};
  ${customStyle && customStyle};
`;
export default Tag;
