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

export type MangaStatusType = typeof AllMangaStatus[number];
export type MangaOrderByAttributeType = typeof AllOrderBySortByAttributes[number];
