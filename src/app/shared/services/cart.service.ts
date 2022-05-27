import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { CartIncDec, CartItem } from '../models/cart.model';
import {
  MAX_MANGA_LIMIT,
  calculateMangaSubtotal,
  getMangaPrice,
} from '../utils/manga-utils';
import { Observable, catchError, map, of, take } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { FieldValue } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { arrayUnion } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private snackBar: SnackbarService
  ) {}

  addMangaToCart(newCartItem: CartItem) {
    return this.getCart()
      ?.pipe(take(1))
      .subscribe((cartData: CartItem[]) => {
        const itemIsInCart = this.isItemInCart(cartData, newCartItem);
        if (itemIsInCart === false) {
          return this.updateShoppingCart(arrayUnion(newCartItem));
        }
        const itemIndex = +itemIsInCart;
        try {
          return this.addToExistingCart(cartData, newCartItem, itemIndex);
        } catch (error) {
          return this.snackBar.openSnackBar(
            `Du kannst nicht mehr als ${MAX_MANGA_LIMIT} Stück eines Produktes bestellen`,
            'snackbar-warn',
            'Verstanden',
            3000
          );
        }
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
    if (newItem.quantity > MAX_MANGA_LIMIT) {
      throw new Error('Quantity Exceeded');
    }
    currentCart[index] = newItem;
    return this.updateShoppingCart(currentCart);
  }

  get userRef(): AngularFirestoreDocument<any> | undefined {
    return this.authService.userRef;
  }

  getCart(): Observable<CartItem[]> | undefined {
    return this.userRef?.valueChanges().pipe(this.mapToCart());
  }

  emptyCart() {
    this.updateShoppingCart(null);
  }

  checkLimitExceed() {}

  removeItemFromCart(index: number) {
    this.getCart()
      ?.pipe(take(1))
      .subscribe((cartData: CartItem[]) => {
        cartData.splice(index, 1);
        const newCartData = cartData.length ? cartData : null;
        return this.updateShoppingCart(newCartData);
      });
  }

  setItemQuantityInCart(index: number, newQuantity: number) {
    this.getCart()
      ?.pipe(take(1))
      .subscribe((cartData: CartItem[]) => {
        const item = cartData[index];
        item.quantity = newQuantity;
        item.subtotal = calculateMangaSubtotal(item.quantity, item.mangaData);
        return this.updateShoppingCart(cartData);
      });
  }

  getCartCount(): Observable<number> | undefined {
    return this.getCart()?.pipe(map((data) => (data || []).length));
  }

  private mapToCart = () => map((data: any) => data.shoppingCart);

  private updateShoppingCart(newCart: CartItem[] | FieldValue | null) {
    return this.userRef?.update({ shoppingCart: newCart });
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
}
