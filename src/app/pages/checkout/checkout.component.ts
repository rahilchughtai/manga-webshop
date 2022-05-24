import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { CartItem } from 'src/app/shared/models/cart.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    public authService: AuthService
  ) {}

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

  selectedIndex = 0;

  makeOrder() {
    this.orderService.makeOrder();
    console.log('Making order!');
    this.router.navigateByUrl('orders');
  }
}
