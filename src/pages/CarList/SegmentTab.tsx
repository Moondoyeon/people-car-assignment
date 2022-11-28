import { useState } from 'react';
import {} from 'react-router-dom';
import styled, { css } from 'styled-components';
import { flexBox } from '../../styles/mixin';
import { CarSegment } from '../../types/car';
import { CAR_SEGMENT_CATEGORY } from '../../constant/static';
import TagLarge from '../../components/UI/Tag/TagLarge';

type SegmentProps = {
  setSearchParams: (nextInit?: Record<string, string | string[]>) => void;
  segment?: CarSegment | '';
};

function SegmentTab({ setSearchParams, segment }: SegmentProps) {
  const [activeTag, setActiveTag] = useState(segment);

  const handleSegmentTagClick = (tag: CarSegment | '') => () => {
    setActiveTag(tag);
    setSearchParams({ segment: tag });
  };

  return (
    <Container>
      {CAR_SEGMENT_CATEGORY.map((tag) => (
        <TagLarge
          key={tag.id}
          text={tag.text}
          isActive={activeTag === tag.enum}
          onClick={handleSegmentTagClick(tag.enum)}
          customStyle={TagLargeStyle}
        />
      ))}
    </Container>
  );
}

export default SegmentTab;

const Container = styled.nav`
  ${flexBox('row', 'flex-start')};
  width: 100%;
  height: 40px;
  padding: 5px ${({ theme }) => theme.paddingHorizontal};
  overflow-x: auto;
  border-bottom: 1px solid ${({ theme }) => theme.black};
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TagLargeStyle = css`
  flex-grow: 1;
  flex-shrink: 0;

  margin-right: 8px;
  cursor: pointer;
`;
