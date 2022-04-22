import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { CartService } from 'src/app/shared/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'nav-cart-button',
  template: `
    <button
      [routerLink]="['cart']"
      mat-icon-button
      class="example-icon"
      aria-label="Example icon-button with share icon"
    >
      <mat-icon
        [matBadge]="authState ? (cartItemCount | async) : 0"
        matBadgeColor="warn"
        >shopping_cart
      </mat-icon>
    </button>
  `,
  styles: [],
})
export class CartButtonComponent implements OnInit, OnChanges {
  constructor(public cartService: CartService) {}

  cartItemCount!: Observable<number> | undefined;
  @Input() authState = false;

  ngOnInit(): void {
    this.cartItemCount = this.cartService.getCartCount();
  }

  // This allows for the cart number to react to login changes
  ngOnChanges(): void {
    this.cartItemCount = this.cartService.getCartCount();
  }
}
