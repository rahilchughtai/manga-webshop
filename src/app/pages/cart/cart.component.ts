import { Component, OnInit } from '@angular/core';
import { Observable, map, of, reduce, take, tap } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { CartItem } from 'src/app/shared/models/cart.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { Router } from '@angular/router';
import { mapToCartOrderTotal } from 'src/app/shared/utils/order-utils';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    public router: Router,
    public cartService: CartService,
    public authService: AuthService
  ) {}

  shoppingCartData: Observable<CartItem[]> | undefined = undefined;
  OrderTotal: Observable<number> | undefined = undefined;

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.shoppingCartData = this.cartService.getCart();
      this.OrderTotal = this.shoppingCartData?.pipe(mapToCartOrderTotal());
    }
  }
  emptyMyCart() {
    this.cartService.emptyCart();
  }
}
