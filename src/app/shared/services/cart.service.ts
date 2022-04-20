import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, map, take } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { arrayUnion } from '@angular/fire/firestore';
import { cartItem } from '../models/manga-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private authService: AuthService,
    private afs: AngularFirestore
  ) {}

  addMangaToCart(currentCart: cartItem[], newCartItem: cartItem) {
    const inCart = this.isItemInCart(currentCart, newCartItem);
    if (inCart) {
      return;
    }
    this.userRef.update({ shoppingCart: arrayUnion(newCartItem) });
  }

  get userRef(): AngularFirestoreDocument<any> {
    return this.afs.doc(`users/${this.authService.userId}`);
  }

  getCart(): Observable<cartItem[]> {
    return this.userRef.valueChanges().pipe(map((data) => data.shoppingCart));
  }

  getCartCount(): Observable<number> {
    return this.userRef
      .valueChanges()
      .pipe(map((data) => data.shoppingCart.length));
  }

  isItemInCart(currentCart: cartItem[], newCartItem: cartItem): boolean {
    const { volume, mangaData } = newCartItem;

    const sameItem = (cartItem: cartItem) =>
      cartItem.volume === volume &&
      cartItem.mangaData.mal_id === mangaData.mal_id;

    return currentCart.some(sameItem);
  }

  removeMangaFromCart() {}
  emptyCart() {}
}
