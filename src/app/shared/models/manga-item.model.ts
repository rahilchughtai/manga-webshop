import { GenreItem } from './filter.model';

export interface MinMangaItemData {
  mal_id: number;
  title: string;
  title_english: string;
  title_japanese: string;
  published: Published;
  volumes?: number;
  images: ImageType;
}
export interface MangaItem extends MinMangaItemData {
  url?: string;
  synopsis?: string;
  type?: string;
  published: Published;
  status?: string;
  members?: number;
  authors?: any[];
  score?: number;
  serialization?: any[];
  popularity?: number;
  favorites?: number;
  genres?: GenreItem[];
}

export interface Published {
  from: Date;
  to?: Date;
  string: string;
}

export interface ImageType {
  jpg: ImageJPG;
}

export interface ImageJPG {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}
