import {MangaItem} from './manga-item.model';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;


  firstName?: string;
  lastName?: string;
  address?: UserAddress;
  favorites?: MangaItem[];
  shoppingCart?: MangaItem[];
}

export interface UserAddress {
  streetName: string;
  streetNumber: number;
  plz: number;
  ort: string;
  country: string;
}
