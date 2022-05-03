import {} from '../models/manga-item.model';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { CartIncDec, CartItem } from '../models/cart.model';
import { Observable, map, of, take } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { MangaUser } from '../models/user.model';
import { arrayUnion } from '@angular/fire/firestore';
import { getMangaPrice } from '../utils/manga-utils';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private authService: AuthService,
    private afs: AngularFirestore
  ) {}
  addMangaToCart(newCartItem: CartItem) {
    this.userRef
      ?.valueChanges()
      .pipe(
        take(1),
        map((data: any) => data.shoppingCart)
      )
      .subscribe((cartData: CartItem[]) => {
        // Check if the same Manga Volume is already in the cart...
        const itemIsInCart = this.isItemInCart(cartData, newCartItem);
        if (itemIsInCart === false) {
          return this.userRef?.update({
            shoppingCart: arrayUnion(newCartItem),
          });
        }
        // Otherwise, add it by increasing quantity
        const itemIndex = +itemIsInCart;
        return this.addToExistingCart(cartData, newCartItem, itemIndex);
      });
  }

  private addToExistingCart(
    currentCart: CartItem[],
    newCartItem: CartItem,
    index: number
  ) {
    const item = currentCart[index];
    const newItem = {
      ...item,
      quantity: item.quantity + newCartItem.quantity,
      subtotal: item.subtotal + newCartItem.subtotal,
    };
    currentCart[index] = newItem;
    this.userRef?.update({ shoppingCart: currentCart });
  }

  get userRef(): AngularFirestoreDocument<any> | undefined {
    if (!this.authService.isLoggedIn) {
      return undefined;
    }
    return this.afs.doc(`users/${this.authService.userId}`);
  }

  getCart(): Observable<CartItem[]> | undefined {
    return this.userRef?.valueChanges().pipe(map((data) => data.shoppingCart));
  }

  incrementItemQuantityInCart(index: number, incOrDec: CartIncDec) {
    this.userRef
      ?.valueChanges()
      .pipe(
        take(1),
        map((data: any) => data.shoppingCart)
      )
      .subscribe((cartData: CartItem[]) => {
        const item = cartData[index];
        item.quantity = item.quantity += incOrDec;
        item.subtotal = item.subtotal +=
          incOrDec * getMangaPrice(item.mangaData);
        return this.userRef?.update({
          shoppingCart: cartData,
        });
      });
  }

  getCartCount(): Observable<number> | undefined {
    return this.getCart()?.pipe(map((data) => (data || []).length));
  }

  /**
   *
   * @param currentCart The Current User Cart
   * @param newCartItem The new Item the user is adding
   * @returns The index of the cart item if it is found or false if not
   */
  private isItemInCart(
    currentCart: CartItem[],
    newCartItem: CartItem
  ): boolean | number {
    console.log(currentCart, newCartItem);
    if (!currentCart) {
      return false;
    }
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

  emptyCart() {
    this.userRef?.update({ shoppingCart: null });
  }
}
