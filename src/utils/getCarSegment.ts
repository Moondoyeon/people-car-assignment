const getCarSegment = (searchParams: URLSearchParams) => {
  switch (searchParams.get('segment')) {
    case 'SUV':
      return 'SUV';
    case 'E':
      return 'E';
    case 'D':
      return 'D';
    case 'C':
      return 'C';
    default:
      return '';
  }
};

export default getCarSegment;
