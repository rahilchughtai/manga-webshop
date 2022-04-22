export function getPriceByPublishingDate(startDate: Date): number {
  const year = new Date(startDate).getFullYear();
  return yearToPrice(year);
}

function yearToPrice(year: number): number {
  switch (true) {
    case year <= 1990:
      return 5.0;
    case year <= 2000:
      return 6.5;
    case year <= 2005:
      return 6.99;
    case year < 2010:
      return 8;
    case year <= 2022:
      return 12;
    default:
      return 7;
  }
}
