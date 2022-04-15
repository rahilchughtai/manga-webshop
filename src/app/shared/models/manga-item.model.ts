export interface MangaItem {
  mal_id: number;
  url: string;
  title: string;
  title_english: string;
  title_japanese: string;
  images: ImageType;
  synopsis: string;
  type?: string;
  published: Published;
  status?: string;
  volumes?: number;
  members: number;
  authors: any[];
  score: number;
  serialization: any[];
  popularity: number;
  favorites: number;
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
