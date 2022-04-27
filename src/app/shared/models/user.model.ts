import {CartItem, MangaItem} from './manga-item.model';

export interface MangaUser {
  uid: string;

  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
  providertype?: string; //google.com / password
  firstName?: string;
  lastName?: string;
  address?: UserAddress;
  favorites?: MangaItem[];
  shoppingCart?: CartItem[];
}

export interface UserAddress {
  streetName: string;
  streetNumber: number;
  plz: number;
  ort: string;
  country: string;
}
