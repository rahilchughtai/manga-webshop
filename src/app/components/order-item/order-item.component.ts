import { CartIncDec, CartItem } from 'src/app/shared/models/cart.model';
import { Component, Input, OnInit } from '@angular/core';

import { CartService } from 'src/app/shared/services/cart.service';
import { MatSelectChange } from '@angular/material/select';
import { makeNumbersArray } from 'src/app/shared/utils/manga-utils';

@Component({
  selector: 'list-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
  constructor(public cartService: CartService) {}

  makeArray = makeNumbersArray;
  IncDec = CartIncDec;
  @Input() cartItem!: CartItem;
  @Input() ind: number = 0;

  ngOnInit(): void {}

  changeQuantity(index: number, inc: CartIncDec, quantity: number) {
    if (inc == this.IncDec.DEC && quantity === 1) {
      return this.removeMangaFromCart(index);
    }
    this.cartService.setItemQuantityInCart(index, quantity + inc);
  }

  cartQuantityChange(event: MatSelectChange, index: number) {
    this.cartService.setItemQuantityInCart(index, event.value);
  }

  removeMangaFromCart(index: number) {
    return this.cartService.removeItemFromCart(index);
  }
}
