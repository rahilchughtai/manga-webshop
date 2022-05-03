import { Component, OnInit } from '@angular/core';
import { Observable, map, take } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { CartButtonComponent } from 'src/app/components/navigation/toolbar/cart-button.component';
import { CartItem } from 'src/app/shared/models/cart.model';
import { CartService } from 'src/app/shared/services/cart.service';

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

  shoppingCartData: Observable<CartItem[]> | undefined = undefined;

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.shoppingCartData = this.cartService.getCart();
    }
  }

  emptyMyCart() {
    this.cartService.emptyCart();
  }
}
