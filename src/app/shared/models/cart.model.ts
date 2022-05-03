import { MangaItem } from './manga-item.model';

export interface CartFormInformation {
  quantity: number;
  volume: number;
}

export interface CartItem extends CartFormInformation {
  mangaData: MangaItem;
  subtotal:number;
}



export enum CartIncDec {
  INC = 1,
  DEC = -1,
}
