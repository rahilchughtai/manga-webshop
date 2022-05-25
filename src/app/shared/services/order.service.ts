import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { CartDataToTotal, mapToCartOrderTotal } from '../utils/order-utils';
import { FieldValue, Timestamp, serverTimestamp } from 'firebase/firestore';
import { Observable, filter, map, mapTo, switchMap, take } from 'rxjs';

import { AuthService } from './auth.service';
import { CartItem } from '../models/cart.model';
import { CartService } from './cart.service';
import { FirebaseApp } from '@angular/fire/app';
import { Injectable } from '@angular/core';
import { MangaOrder } from '../models/order.model';
import { MangaUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  private get userRef(): AngularFirestoreDocument<any> | undefined {
    return this.authService.userRef;
  }

  private get userOrderCollection():
    | AngularFirestoreCollection<MangaOrder>
    | undefined {
    return this.userRef?.collection('orders');
  }
  getAllUserOrders(): Observable<MangaOrder[]> | undefined {
    return this.userRef?.collection('orders').valueChanges() as Observable<
      MangaOrder[]
    >;
  }

  makeOrder(userData: MangaUser, studentId: number) {
    this.cartService
      .getCart()
      ?.pipe(take(1))
      .subscribe((cartData) => {
        try {
          const UserOrder: MangaOrder = {
            userData,
            studentId,
            orderItems: cartData,
            orderDate: Timestamp.now(),
            totalAmount: CartDataToTotal(cartData),
          };
          return this.userOrderCollection?.add(UserOrder);
        } catch (error) {
          // TODO
          console.log(error);
          return;
        }
      });
    this.cartService.emptyCart();
  }
}
