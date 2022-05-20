import { CartItem } from './cart.model';
import { User } from 'firebase/auth';

export interface Order {
  orderItems: CartItem[];
  totalAmount: number;
  userData: User;
  orderDate: Date;
}
