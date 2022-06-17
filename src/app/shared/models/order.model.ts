import { CartItem } from './cart.model';
import { MangaUser } from './user.model';
import { Timestamp } from 'firebase/firestore';

export interface MangaOrder {
  orderItems: CartItem[];
  totalAmount: number;
  userData: MangaUser;
  orderIBAN: string;
  orderDate: Timestamp;
}
