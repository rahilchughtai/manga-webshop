import { Component, OnInit } from '@angular/core';

import { CartItem } from 'src/app/shared/models/manga-item.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(public cartService: CartService) {}

  shoppingCartData!: Observable<CartItem[]>;

  ngOnInit(): void {
    this.shoppingCartData = this.cartService.getCart();
  }
}
