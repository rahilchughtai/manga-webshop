

export type MangaSortMethod = 'asc' | 'desc';

export const AllOrderBySortByAttributes = [
  'mal_id',
  'title',
  'start_date',
  'end_date',
  'chapters',
  'volumes',
  'score',
  'scored_by',
  'rank',
  'popularity',
  'members',
  'favorites',
] as const;

export const AllMangaStatus = [
  'publishing',
  'complete',
  'hiatus',
  'discontinued',
  'upcoming',
] as const;


export interface GenreItem {
  mal_id: number;
  name: string;
}


export type MangaStatusType = typeof AllMangaStatus[number];
export type MangaOrderByAttributeType =
  typeof AllOrderBySortByAttributes[number];

export interface MangaQueryFormData {
  mangaStatus: MangaStatusType | null;
  mangaSearchTerm: string;
  mangaGenre: GenreItem[];
  mangaOrderBy: MangaOrderByAttributeType | null;
  mangaSortMethod: MangaSortMethod;
}

export const defaultQueryFormValues: MangaQueryFormData = {
  mangaGenre: [],
  mangaStatus: null,
  mangaSearchTerm: '',
  mangaOrderBy: null,
  mangaSortMethod: 'desc',
};
