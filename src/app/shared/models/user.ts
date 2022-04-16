import { MangaItem } from './manga-item.model';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  favorites?: MangaItem[];
  cart?: MangaItem[];
}
