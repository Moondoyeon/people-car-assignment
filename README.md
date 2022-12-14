# ๐ B2C ์ฐจ๋๋์ฌ ์๋น์ค ๊ตฌํ

> ๊ธฐ๊ฐ: 2022๋ 10์29์ผ-31์ผ, 11์27์ผ-29์ผ (6์ผ)
> <br/> <a href="http://people-car-assignment.s3-website.ap-northeast-2.amazonaws.com">๐๋งํฌ ๋ฐ๋ก๊ฐ๊ธฐ</a>

## ๐ฌ ๋ฏธ๋ฆฌ๋ณด๊ธฐ

![demo-peoplecar](https://user-images.githubusercontent.com/102936206/204457923-5e794c64-2b5d-44c9-978f-91a6cb2ea2b9.gif)

## โก๏ธ ์คํ

<div>
  
![TypeScript](https://img.shields.io/badge/TypeScript-2F74C0.svg?&style=for-the-badge&logo=TypeScript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![axios](https://camo.githubusercontent.com/23392fa4fc3ffb6ade29cba7aaffa7741daeb97012c70a062cf2370187d6519e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6178696f732d4646434132383f7374796c653d666f722d7468652d6261646765266c6f676f3d6178696f73266c6f676f436f6c6f723d7768697465)
![react-router-dom](https://camo.githubusercontent.com/59772064d7f01d32dfc280518690c95d858dce068a58be142b2ac003ef31642c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163745f726f757465725f646f6d2d4341343234353f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374726f75746572266c6f676f436f6c6f723d7768697465)
  
</div>

## ๐ ๊ธฐ๋ฅ์๊ตฌ์ฌํญ

- ์ง์ ๋ ์กฐ๊ฑด(segment)์ ๋ง๊ฒ ๋ฐ์ดํฐ ์์ฒญ ๋ฐ ํ์
- ์นดํ๊ณ ๋ฆฌ ์ข์ฐ ์ฌ๋ผ์ด๋
- ์ ๊ท์ฐจ๋ํ์(์์ฑ์ผ ๊ธฐ์ค 1์ผ ์ด๋ด)
- ์ฐจ๋ ๋ฆฌ์คํธ(์ฐจ๋ ์์ ๋, ์ฐจ๋ ๋ถ๋ฌ์ค๋ ์ค ์ฒ๋ฆฌ), ์ฐจ๋ ์์ธ
- ๋ชจ๋ฐ์ผ ์น ๊ธฐ์ค์ผ๋ก ์ ์

## ๐ป ์์ธ๋ด์ฉ

### 1.์ถ์ํ

### 1-1. CarList(์ฐจ๋๋ชฉ๋ก) ์ปดํฌ๋ํธ

- api ์์ฒญ ๋ก์ง์ hook(`useGetCarList`)์ผ๋ก ๋ถ๋ฆฌํ์ฌ ์ปดํฌ๋ํธ ๋ด์์๋ api ์์ฒญ ๊ณผ์ ์ด ๋๋ฌ๋์ง ์์
- `getCarList` ํจ์๋ง์ผ๋ก ์ด ์ปดํฌ๋ํธ ๋ด์์ cars(์ฐจ๋ ๋ชฉ๋ก)๋ฅผ ๊ฐ์ ธ์จ๋ค๋ ์ฌ์ค์ ๋ช์
- `getCarSegment` ํจ์์ `searchParams`๋ฅผ ์ ๋ฌํ์ฌ ์ปดํฌ๋ํธ ๋ด์์ ์ฐจ์ข์ ์นํํ๋ ๊ณผ์ ์ด ๋๋ฌ๋์ง ์์

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
      <Header headText="์ฐจ๋๋ชฉ๋ก" />

      <SegmentTap segment={segment} setSearchParams={setSearchParams} />

      {isLoading && <Notice>๋ถ๋ฌ์ค๋ ์ค</Notice>}

      {!isLoading && cars?.map((car) => <CarListItem key={car.id} car={car} />)}

      {!isLoading && !cars?.length && <Notice>์ฐจ๋์ด ์์ต๋๋ค.</Notice>}
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

### 1-2. CarDetail(์ฐจ๋ ์์ธ) ์ปดํฌ๋ํธ

`BarSection` ์ปดํฌ๋ํธ๋ฅผ ๋ง๋ค์ด list์ item๋ค์ ๋ ๋๋งํ๋ ๊ณผ์ ์ด ๋๋ฌ๋์ง ์์

```jsx
function CarDetail() {
  const navigate = useNavigate();
  const goPreviousPage = () => navigate(-1);

  const { state }: { state: { car: ICarBasic } } = useLocation();
  const car = state?.car;

  const sections = getCarDetailSections(car);

  return (
    <Container>
      <Header headText="์ฐจ๋์์ธ" leftChild={<BackIconSVG onClick={goPreviousPage} />} />
      <img alt="car" src={car.attribute.imageUrl} />

      <BrandName>
        <div className="brand">{car.attribute.brand}</div>
        <div className="name">{car.attribute.name}</div>
      </BrandName>

      <Bar rightText={`์ ${car.amount?.toLocaleString()}์`} />
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

### 2. ์ฐจ๋๋ชฉ๋ก ์๋ต๋ฐ์ดํฐ ์ํ๊ด๋ฆฌ

- context API๋ก cars state๋ฅผ ์ ์ธ, ์ฐจ๋๋ชฉ๋ก ์ปดํฌ๋ํธ๋ก๋ถํฐ ์ฟผ๋ฆฌํ๋ผ๋ฏธํฐ(segment) ๋ฅผ ์ ๋ฌ๋ฐ์ ์๋ฒ์ ์์ฒญํ ํ, ์๋ต ๋ฐ์ดํฐ๋ฅผ setCarInfo์ ์ ๋ฌํด state๋ฅผ ๊ฐฑ์ 
  ๊ฐฑ์ ๋ state๋ ์ฐจ๋๋ชฉ๋ก ์ปดํฌ๋ํธ(CarList.tsx)์ ๋ณด์ฌ์ง๊ฒ ๋จ

```jsx
function useGetCarList() {
  const [isLoading, setIsLoading] = useState(false);
  const { setCars } = useCars(); // ์ ์ญ state ๊ฐฑ์ ํจ์ ๋ถ๋ฌ์ด
  const navigate = useNavigate();

  const getCarList = async (params?: CarTypeParams) => {
    // ์ฐจ๋๋ชฉ๋ก ์ปดํฌ๋ํธ๋ก๋ถํฐ ์ฟผ๋ฆฌํ๋ผ๋ฏธํฐ ์ ๋ฌ๋ฐ์
    setIsLoading(true);

    const {
      data: { payload },
      status,
    }: ResponseValues = await axiosInstance.get('/cars', { params }); // ๋ฐ์ดํฐ ์์ฒญ

    if (status >= 200 && status < 300) {
      setCars(payload); // state ๊ฐฑ์ 
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
  const { cars } = useCars(); // ์ฐจ๋๋ชฉ๋ก state
  const { isLoading, getCarList } = useGetCarList();
  const [searchParams, setSearchParams] = useSearchParams();
  const segment = useMemo(() => getCarSegment(searchParams), [searchParams]);

  useEffect(() => {
    getCarList({ segment }); // ์ฟผ๋ฆฌํ๋ผ๋ฏธํฐ ์ ๋ฌ
  }, [segment]);

  return (
    <Container>
      <Header headText="์ฐจ๋๋ชฉ๋ก" />

      <SegmentTap segment={segment} setSearchParams={setSearchParams} />

      {isLoading && <Notice>๋ถ๋ฌ์ค๋ ์ค</Notice>}

      {!isLoading && cars?.map((car) => <CarListItem key={car.id} car={car} />)}

      {!isLoading && !cars?.length && <Notice>์ฐจ๋์ด ์์ต๋๋ค.</Notice>}
    </Container>
  );
}
```

### 3. UI ์ปดํฌ๋ํธ ์ฌ์ฌ์ฉ

- Tag: ๊ณตํต์ ์ธ ๋ถ๋ถ์ TagRaw ์ปดํฌ๋ํธ์ ์์ฑํ๊ณ  customStyle์ prop์ผ๋ก ๋ฐ์ ์ฌ์ฉ

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
// TagLarge.tsx ์ฌ์ฉ
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

### 4. ์คํ์ผ - GlobalStyle, theme

- styles ํด๋์์ Styled Components ์ ์ญ ์คํ์ผ๋ง์ ์ฌ์ฉํ์ฌ ์ค๋ณต๋๋ ์คํ์ผ ์ฝ๋ ๊ด๋ฆฌ
- mixin ํ์ผ์์ ๊ธฐ๋ณธ์ ์ธ flex ์คํ์ผ๊ณผ ํ๋ฉด ํฌ๊ธฐ ์กฐ์ 
- theme ์ ์ฌ์ฉํ์ฌ ์ปฌ๋ฌ์ padding ๊ด๋ฆฌ

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

## ๐ฆ ํ์ผ๊ตฌ์กฐ

```
๐ฆsrc
 โฃ ๐api
 โ โ ๐axiosInstance.ts
 โฃ ๐assets
 โ โ ๐ICON_Back.svg
 โฃ ๐components
 โ โฃ ๐UI
 โ โ โฃ ๐Bar
 โ โ โ โ ๐Bar.tsx
 โ โ โ ๐Tag
 โ โ โ โฃ ๐TagLarge.tsx
 โ โ โ โฃ ๐TagRaw.tsx
 โ โ โ โ ๐TagSmall.tsx
 โ โ ๐layout
 โ โ โ ๐Header
 โ โ โ โ ๐Header.tsx
 โฃ ๐constant
 โ โ ๐static.ts
 โฃ ๐context
 โ โ ๐CarListContext.tsx
 โฃ ๐hooks
 โ โ ๐useGetCarList.tsx
 โฃ ๐pages
 โ โฃ ๐CarDetail
 โ โ โฃ ๐BarSection.tsx
 โ โ โ ๐index.tsx
 โ โ ๐CarList
 โ โ โฃ ๐CarListItem.tsx
 โ โ โฃ ๐SegmentTab.tsx
 โ โ โ ๐index.tsx
 โฃ ๐styles
 โ โฃ ๐GlobalStyle.ts
 โ โฃ ๐mixin.ts
 โ โ ๐theme.ts
 โฃ ๐types
 โ โ ๐car.ts
 โฃ ๐utils
 โ โฃ ๐getCarDetailSections.ts
 โ โฃ ๐getCarSegment.ts
 โ โฃ ๐isWithinADay.ts
 โ โ ๐parseDate.ts
 โฃ ๐App.tsx
 โฃ ๐index.tsx
 โ ๐react-app-env.d.ts

```

## ๐ข ํ๋ก์ ํธ ์คํ๋ฐฉ๋ฒ

```
// .env.local (์ต์๋จ)
REACT_APP_BASE_URL="<https://preonboarding.platdev.net/api/>"

```

```
npm install // ์ค์น
npm start // ์คํ

```

## ๐ ๋ฌธ์

- <a href="https://www.notion.so/b729cf6d305a4d6a85497446348b3115">์๋ฌ๊ธฐ๋ก</a>
