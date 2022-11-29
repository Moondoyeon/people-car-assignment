# 📖 B2C 차량대여 서비스 구현

> 기간: 2022년 10월29일-31일, 11월27일-29일 (6일)
> <br/> <a href="http://people-car-assignment.s3-website.ap-northeast-2.amazonaws.com">📎링크 바로가기</a>

## 🎬 미리보기

![demo-peoplecar](https://user-images.githubusercontent.com/102936206/204457923-5e794c64-2b5d-44c9-978f-91a6cb2ea2b9.gif)

## ⚡️ 스택

<div>
  
![TypeScript](https://img.shields.io/badge/TypeScript-2F74C0.svg?&style=for-the-badge&logo=TypeScript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![axios](https://camo.githubusercontent.com/23392fa4fc3ffb6ade29cba7aaffa7741daeb97012c70a062cf2370187d6519e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6178696f732d4646434132383f7374796c653d666f722d7468652d6261646765266c6f676f3d6178696f73266c6f676f436f6c6f723d7768697465)
![react-router-dom](https://camo.githubusercontent.com/59772064d7f01d32dfc280518690c95d858dce068a58be142b2ac003ef31642c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163745f726f757465725f646f6d2d4341343234353f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374726f75746572266c6f676f436f6c6f723d7768697465)
  
</div>

## 🚀 기능요구사항

- 지정된 조건(segment)에 맞게 데이터 요청 및 표시
- 카테고리 좌우 슬라이드
- 신규차량표시(생성일 기준 1일 이내)
- 차량 리스트(차량 없을 때, 차량 불러오는 중 처리), 차량 상세
- 모바일 웹 기준으로 제작

## 💻 상세내용

### 1.추상화

### 1-1. CarList(차량목록) 컴포넌트

- api 요청 로직을 hook(`useGetCarList`)으로 분리하여 컴포넌트 내에서는 api 요청 과정이 드러나지 않음
- `getCarList` 함수만으로 이 컴포넌트 내에서 cars(차량 목록)를 가져온다는 사실을 명시
- `getCarSegment` 함수에 `searchParams`를 전달하여 컴포넌트 내에서 차종을 치환하는 과정이 드러나지 않음

```jsx
function CarList() {
  const { cars } = useCars();
  const { isLoading, getCarList } = useGetCarList();
  const [searchParams, setSearchParams] = useSearchParams();
  const segment = useMemo(() => getCarSegment(searchParams), [searchParams]);

  useEffect(() => {
    getCarList({ segment });
  }, [segment]);

  return (
    <Container>
      <Header headText="차량목록" />

      <SegmentTap segment={segment} setSearchParams={setSearchParams} />

      {isLoading && <Notice>불러오는 중</Notice>}

      {!isLoading && cars?.map((car) => <CarListItem key={car.id} car={car} />)}

      {!isLoading && !cars?.length && <Notice>차량이 없습니다.</Notice>}
    </Container>
  );
}
```

```jsx
function useGetCarList() {
  const [isLoading, setIsLoading] = useState(false);
  const { setCars } = useCars();
  const navigate = useNavigate();

  const getCarList = async (params?: CarTypeParams) => {
    setIsLoading(true);

    const {
      data: { payload },
      status,
    }: ResponseValues = await axiosInstance.get('/cars', { params });

    if (status >= 200 && status < 300) {
      setCars(payload);
      setIsLoading(false);
    } else {
      navigate('/error', { state: { status } });
      setIsLoading(false);
    }
  };
  return { isLoading, getCarList };
}
```

### 1-2. CarDetail(차량 상세) 컴포넌트

`BarSection` 컴포넌트를 만들어 list의 item들을 렌더링하는 과정이 드러나지 않음

```jsx
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
```

```jsx
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
```

### 2. 차량목록 응답데이터 상태관리

- context API로 cars state를 선언, 차량목록 컴포넌트로부터 쿼리파라미터(segment) 를 전달받아 서버에 요청한 후, 응답 데이터를 setCarInfo에 전달해 state를 갱신
  갱신된 state는 차량목록 컴포넌트(CarList.tsx)에 보여지게 됨

```jsx
function useGetCarList() {
  const [isLoading, setIsLoading] = useState(false);
  const { setCars } = useCars(); // 전역 state 갱신함수 불러옴
  const navigate = useNavigate();

  const getCarList = async (params?: CarTypeParams) => {
    // 차량목록 컴포넌트로부터 쿼리파라미터 전달받음
    setIsLoading(true);

    const {
      data: { payload },
      status,
    }: ResponseValues = await axiosInstance.get('/cars', { params }); // 데이터 요청

    if (status >= 200 && status < 300) {
      setCars(payload); // state 갱신
      setIsLoading(false);
    } else {
      navigate('/error', { state: { status } });
      setIsLoading(false);
    }
  };
  return { isLoading, getCarList };
}
```

```jsx
function CarList() {
  const { cars } = useCars(); // 차량목록 state
  const { isLoading, getCarList } = useGetCarList();
  const [searchParams, setSearchParams] = useSearchParams();
  const segment = useMemo(() => getCarSegment(searchParams), [searchParams]);

  useEffect(() => {
    getCarList({ segment }); // 쿼리파라미터 전달
  }, [segment]);

  return (
    <Container>
      <Header headText="차량목록" />

      <SegmentTap segment={segment} setSearchParams={setSearchParams} />

      {isLoading && <Notice>불러오는 중</Notice>}

      {!isLoading && cars?.map((car) => <CarListItem key={car.id} car={car} />)}

      {!isLoading && !cars?.length && <Notice>차량이 없습니다.</Notice>}
    </Container>
  );
}
```

### 3. UI 컴포넌트 재사용

- Tag: 공통적인 부분을 TagRaw 컴포넌트에 작성하고 customStyle을 prop으로 받아 사용

```jsx
function TagRaw({ text, customStyle, onClick }: TagRawProps) {
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

```

```jsx
function TagLarge({ text, isActive = false, customStyle, onClick }: TagLargeProps) {
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
```

```jsx
// TagLarge.tsx 사용
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

const TagLargeStyle = css`
  flex-grow: 1;
  flex-shrink: 0;

  margin-right: 8px;
  cursor: pointer;
`;
```

### 4. 스타일 - GlobalStyle, theme

- styles 폴더에서 Styled Components 전역 스타일링을 사용하여 중복되는 스타일 코드 관리
- mixin 파일에서 기본적인 flex 스타일과 화면 크기 조정
- theme 을 사용하여 컬러와 padding 관리

```js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* <http://meyerweb.com/eric/tools/css/reset/>
   v2.0 | 20110126
   License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
  	margin: 0;
  	padding: 0;
  	border: 0;
  	font-size: 100%;
  	font: inherit;
  	vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
  	display: block;
  }
  body {
  	line-height: 1;
  }
	...

export default GlobalStyle;

```

```jsx
export const flexBox = (direction = 'row', justify = 'center', align = 'center') => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
`;

export const responsive = (device: 'phone' | 'desktop') => {
  switch (device) {
    case 'phone':
      return `@media screen and (max-width: 450px)`;
    case 'desktop':
      return `@media screen and (min-width: 451px)`;
    default:
      return '';
  }
};
```

```js
export const colors = {
  black: '#000000',
  gray: '#D9D9D9',
  blue: '#0094FF',
  white: '#FFFFFF',
};

export const padding = {
  paddingHorizontal: '20px',
  paddingVertical: '20px',
};
```

## 📦 파일구조

```
📦src
 ┣ 📂api
 ┃ ┗ 📜axiosInstance.ts
 ┣ 📂assets
 ┃ ┗ 📜ICON_Back.svg
 ┣ 📂components
 ┃ ┣ 📂UI
 ┃ ┃ ┣ 📂Bar
 ┃ ┃ ┃ ┗ 📜Bar.tsx
 ┃ ┃ ┗ 📂Tag
 ┃ ┃ ┃ ┣ 📜TagLarge.tsx
 ┃ ┃ ┃ ┣ 📜TagRaw.tsx
 ┃ ┃ ┃ ┗ 📜TagSmall.tsx
 ┃ ┗ 📂layout
 ┃ ┃ ┗ 📂Header
 ┃ ┃ ┃ ┗ 📜Header.tsx
 ┣ 📂constant
 ┃ ┗ 📜static.ts
 ┣ 📂context
 ┃ ┗ 📜CarListContext.tsx
 ┣ 📂hooks
 ┃ ┗ 📜useGetCarList.tsx
 ┣ 📂pages
 ┃ ┣ 📂CarDetail
 ┃ ┃ ┣ 📜BarSection.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂CarList
 ┃ ┃ ┣ 📜CarListItem.tsx
 ┃ ┃ ┣ 📜SegmentTab.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂styles
 ┃ ┣ 📜GlobalStyle.ts
 ┃ ┣ 📜mixin.ts
 ┃ ┗ 📜theme.ts
 ┣ 📂types
 ┃ ┗ 📜car.ts
 ┣ 📂utils
 ┃ ┣ 📜getCarDetailSections.ts
 ┃ ┣ 📜getCarSegment.ts
 ┃ ┣ 📜isWithinADay.ts
 ┃ ┗ 📜parseDate.ts
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┗ 📜react-app-env.d.ts

```

## 📢 프로젝트 실행방법

```
// .env.local (최상단)
REACT_APP_BASE_URL="<https://preonboarding.platdev.net/api/>"

```

```
npm install // 설치
npm start // 실행

```

## 📚 문서

- <a href="https://www.notion.so/b729cf6d305a4d6a85497446348b3115">에러기록</a>
