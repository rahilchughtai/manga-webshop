import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { FieldValue, serverTimestamp } from 'firebase/firestore';
import { switchMap, take } from 'rxjs';

import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { FirebaseApp } from '@angular/fire/app';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  get userRef(): AngularFirestoreDocument<any> | undefined {
    if (!this.authService.isLoggedIn) {
      return undefined;
    }
    return this.afs.doc(`users/${this.authService.userId}`);
  }

  getAllUserOrders() {
    return this.afs
      .doc(`users/${this.authService.userId}`)
      .collection('orders')
      .valueChanges();
  }

  makeOrder(data?: any) {
    const cartData = this.cartService.getCart();
    cartData?.pipe(take(1)).subscribe((cartData) => {
      try {
        return this.afs
          .doc(`users/${this.authService.userId}`)
          .collection('orders')
          .add({ items: cartData, timestamp: serverTimestamp() });
      } catch (error) {
        console.log(error);
        return;
      }
    });
    this.cartService.emptyCart();
  }
}
