import { Observable, map } from 'rxjs';

import { CartItem } from '../models/cart.model';

export function mapToCartOrderTotal() {
  return function <T>(source: Observable<CartItem[]>) {
    return source.pipe(
      map((item: CartItem[]) => item.map((item) => item.subtotal)),
      map((item) =>
        item.reduce((sum: number, current: number) => sum + current, 0)
      )
    );
  };
}

export function CartDataToTotal(cart: CartItem[]): number {
  return cart
    .map((item) => item.subtotal)
    .reduce((sum: number, current: number) => sum + current, 0);
}
