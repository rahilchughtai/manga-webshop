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

export type OrderMethod = 'asc' | 'desc';
export type OrderAttribute =
  | 'mal_id'
  | 'title'
  | 'start_date'
  | 'end_date'
  | 'chapters'
  | 'volumes'
  | 'score'
  | 'scored_by'
  | 'rank'
  | 'popularity'
  | 'members'
  | 'favorites';

export interface JikanApiRequestParam {
  type?: string;
  sfw?: boolean;
  genres_exclude?: string;
  page?: number;
  limit?: number;
  sort?: OrderMethod;
  q?: string;
  genres?: string;
  order_by?: OrderAttribute;
}
