import { Component, Input, OnInit } from '@angular/core';

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
        [matBadge]="cartItemCount"
        matBadgeColor="warn"
        >shopping_cart
      </mat-icon>
    </button>
  `,
  styles: [],
})
export class CartButtonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() cartItemCount: number = 0;
}
