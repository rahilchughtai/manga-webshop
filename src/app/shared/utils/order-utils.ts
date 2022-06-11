import { Observable, map, tap } from 'rxjs';

import { CartItem } from '../models/cart.model';

export function mapToCartOrderTotal() {
  return function <T>(source: Observable<CartItem[]>) {
    console.log(source);
    return source.pipe(
      map(item=>item==null ? [] : item),
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
