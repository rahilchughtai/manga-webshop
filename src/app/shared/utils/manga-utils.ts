import { MangaItem } from '../models/manga-item.model';

export const MAX_MANGA_LIMIT = 50;

export function getPriceByPublishingDate(startDate: Date): number {
  const year = new Date(startDate).getFullYear();
  return yearToPrice(year);
}

function publishingYears() {
  const years = [];
  for (let year = 2023; year >= 1945; year--) {
    years.push(year);
  }
  return years;
}

export const MangaPublishingYears = publishingYears();

function yearToPrice(year: number): number {
  switch (true) {
    case year <= 1990:
      return 5.0;
    case year <= 2000:
      return 6.5;
    case year <= 2005:
      return 7;

    case year < 2010:
      return 8;
    case year <= 2022:
      return 12;
    default:
      return 7;
  }
}

/**
 *
 * @param manga
 * @returns The price of a given Manga
 */
export function getMangaPrice(manga: MangaItem): number {
  return getPriceByPublishingDate(manga.published.from);
}

export function calculateMangaSubtotal(quantity: number, manga: MangaItem) {
  return quantity * getMangaPrice(manga);
}

export function makeNumbersArray(n: number | undefined): number[] {
  if (n === undefined) {
    n = 1;
  }
  return [...Array(n).keys()].map((i) => i + 1).reverse();
}
