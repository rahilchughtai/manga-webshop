import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, map, of, take } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { CartItem } from '../models/manga-item.model';
import { Injectable } from '@angular/core';
import { __makeTemplateObject } from 'tslib';
import { arrayUnion } from '@angular/fire/firestore';
import { resourceUsage } from 'process';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private authService: AuthService,
    private afs: AngularFirestore
  ) {}

  addMangaToCart(currentCart: CartItem[], newCartItem: CartItem) {
    const inCart = this.isItemInCart(currentCart, newCartItem);
    if (inCart !== false) {
      return this.addToExistingCart(currentCart, newCartItem, +inCart);
    }
    this.userRef?.update({ shoppingCart: arrayUnion(newCartItem) });
  }

  addToExistingCart(
    currentCart: CartItem[],
    newCartItem: CartItem,
    index: number
  ) {
    const item = currentCart[index];
    const newItem = { ...item, quantity: item.quantity + newCartItem.quantity };
    currentCart[index] = newItem;
    this.userRef?.update({ shoppingCart: currentCart });
  }

  get userRef(): AngularFirestoreDocument<any> | null {
    if (!this.authService.isLoggedIn) {
      return null;
    }
    return this.afs.doc(`users/${this.authService.userId}`);
  }

  getCart(): Observable<CartItem[]> | undefined {
    return this.userRef?.valueChanges().pipe(map((data) => data.shoppingCart));
  }

  getCartCount(): Observable<number> | undefined {
    console.log("Getting called!!")
    return this.getCart()?.pipe(map((data) => data.length));
  }

  isItemInCart(
    currentCart: CartItem[],
    newCartItem: CartItem
  ): boolean | number {
    const { volume, mangaData } = newCartItem;
    let itemIndex = -1;
    const sameItem = (cartItem: CartItem, index: number) => {
      const condition =
        cartItem.volume === volume &&
        cartItem.mangaData.mal_id === mangaData.mal_id;
      if (condition) {
        itemIndex = index;
      }
      return condition;
    };
    const result = currentCart.some((cartitem, index) =>
      sameItem(cartitem, index)
    );
    return result ? itemIndex : false;
  }

  removeMangaFromCart() {}
  emptyCart() {}
}
