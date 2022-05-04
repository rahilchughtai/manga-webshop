import { CartIncDec, CartItem } from 'src/app/shared/models/cart.model';
import { Component, OnInit } from '@angular/core';
import { Observable, map, of, reduce, take, tap } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { CartButtonComponent } from 'src/app/components/navigation/toolbar/cart-button.component';
import { CartService } from 'src/app/shared/services/cart.service';
import { MatSelectChange } from '@angular/material/select';
import { makeNumbersArray } from 'src/app/shared/utils/manga-utils';

const ELEMENT_DATA = [
  { image: 1, name: 'Hydrogen', quantity: 1.0079, total: 'H' },
  { image: 2, name: 'Helium', quantity: 4.0026, total: 'He' },
  { image: 3, name: 'Lithium', quantity: 6.941, total: 'Li' },
  { image: 4, name: 'Beryllium', quantity: 9.0122, total: 'Be' },
  { image: 5, name: 'Boron', quantity: 10.811, total: 'B' },
  { image: 6, name: 'Carbon', quantity: 12.0107, total: 'C' },
  { image: 7, name: 'Nitrogen', quantity: 14.0067, total: 'N' },
  { image: 8, name: 'Oxygen', quantity: 15.9994, total: 'O' },
  { image: 9, name: 'Fluorine', quantity: 18.9984, total: 'F' },
  { image: 10, name: 'Neon', quantity: 20.1797, total: 'Ne' },
];

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
  initialQuantities: number[] = [];
  displayedColumns: string[] = ['', 'name', 'quantity', 'total'];
  dataSource = ELEMENT_DATA;
  initialQuantity = 5;
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
