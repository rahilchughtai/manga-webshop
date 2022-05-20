import { CartItem } from './cart.model';
import { User } from 'firebase/auth';

interface Order {
  orderItems: CartItem[];
  totalAmount: number;
  userData: User;
  orderDate: Date;
}
