import { CartIncDec, CartItem } from 'src/app/shared/models/cart.model';
import { Component, OnInit } from '@angular/core';
import { Observable, map, of, reduce, take, tap } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { CartButtonComponent } from 'src/app/components/navigation/toolbar/cart-button.component';
import { CartService } from 'src/app/shared/services/cart.service';
import { MatSelectChange } from '@angular/material/select';
import { makeNumbersArray } from 'src/app/shared/utils/manga-utils';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    public cartService: CartService,
    public authService: AuthService
  ) {}

  makeArray = makeNumbersArray;
  IncDec = CartIncDec;
  shoppingCartData: Observable<CartItem[]> | undefined = undefined;
  OrderTotal: Observable<number> | undefined = undefined;

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.shoppingCartData = this.cartService.getCart();
      this.OrderTotal = this.shoppingCartData?.pipe(
        map((item: CartItem[]) => item.map((item) => item.subtotal)),
        map((item) =>
          item.reduce((sum: number, current: number) => sum + current, 0)
        )
      );
    }
  }

  changeQuantity(index: number, inc: CartIncDec, quantity: number) {
    if (inc == this.IncDec.DEC && quantity === 1) {
      return this.cartService.removeItemFromCart(index);
    }
    this.cartService.setItemQuantityInCart(index, quantity + inc);
  }

  cartQuantityChange(event: MatSelectChange, index: number) {
    this.cartService.setItemQuantityInCart(index, event.value);
  }

  emptyMyCart() {
    this.cartService.emptyCart();
  }
}
