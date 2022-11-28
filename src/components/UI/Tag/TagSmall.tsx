import { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import TagRaw from './TagRaw';

type TagSmallProps = {
  text: string;
  customStyle?: FlattenInterpolation<ThemeProps<unknown>>;
};

function TagSmall({ text, customStyle }: TagSmallProps) {
  return <TagRaw text={text} customStyle={TagSmallStyle(customStyle)} />;
}

export default TagSmall;

const TagSmallStyle = (customStyle: FlattenInterpolation<ThemeProps<unknown>> | undefined) => css`
  color: blue;
  width: 52px;
  height: 22px;
  padding-top: 1px;
  background-color: ${({ theme }) => theme.blue};
  font-size: 12px;
  color: ${({ theme }) => theme.white};
  ${customStyle && customStyle};
`;
