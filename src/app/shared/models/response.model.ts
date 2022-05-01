import {
  MangaOrderByAttributeType,
  MangaSortMethod,
  MangaStatusType,
} from './filter.model';

import { GenreItem } from '../utils/genres';
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

export interface JikanApiRequestParam {
  type?: string;
  sfw?: boolean;
  genres_exclude?: string;
  page?: number;
  limit?: number;
  sort?: MangaSortMethod;
  q?: string;
  status?: MangaStatusType;
  genres?: string;
  order_by?: MangaOrderByAttributeType;
}

export interface MangaQueryFormData {
  mangaStatus: MangaStatusType | null;
  mangaSearchTerm: string;
  mangaGenre: GenreItem[];
  mangaOrderBy: MangaOrderByAttributeType | null;
  mangaSortMethod: MangaSortMethod;
}
