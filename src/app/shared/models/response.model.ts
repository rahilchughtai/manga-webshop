import { MangaItem } from './manga-item.model';

export interface Items {
  count: number;
  total: number;
  per_page: number;
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: Items;
}

export interface JikanApiResponse {
  pagination: Pagination;
  data: MangaItem[];
}

export interface JikanMangaByIdResponse {
  data: MangaItem;
}
