import React from 'react';
import Bar from '../../components/UI/Bar/Bar';
type dataKeyValue = {
  subTitle: string;
  key: string;
  content: string;
};
type SectionsValues = {
  title: string;
  data: dataKeyValue[] | undefined;
};

type SectionListProps = {
  sections: SectionsValues[];
};

function BarSection({ sections }: SectionListProps) {
  return (
    <>
      {sections?.map((section) => (
        <React.Fragment key={section.title}>
          <Bar key={section.title} leftText={section.title} color="blue" />
          {section.data?.map((item) => (
            <Bar key={item.key} leftText={item.subTitle} rightText={item.content} />
          ))}
        </React.Fragment>
      ))}
    </>
  );
}

export default BarSection;
