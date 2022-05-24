import { CartIncDec, CartItem } from 'src/app/shared/models/cart.model';
import { Component, Input, OnInit } from '@angular/core';
import {
  MAX_MANGA_LIMIT,
  makeNumbersArray,
} from 'src/app/shared/utils/manga-utils';

import { CartService } from 'src/app/shared/services/cart.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'list-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
  constructor(public cartService: CartService) {}
  @Input() cartItem!: CartItem;
  @Input() ind: number = 0;
  @Input() changable = true;
  @Input() ImgWidth = 150;

  maxManga = MAX_MANGA_LIMIT;
  makeArray = makeNumbersArray;
  IncDec = CartIncDec;

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
