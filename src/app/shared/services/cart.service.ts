import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private authService: AuthService,
    private afs: AngularFirestore, // Inject Firestore service
    private afAuth: AngularFireAuth
  ) {} // Inject Firebase auth service) { }

  addMangaToCart() {
    const uid = JSON.parse(localStorage.getItem('user')!).uid;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    userRef.update({ shoppingCart: ['Berserk', 'Test2'] });
  }

  
  removeMangaFromCart() {}

  emptyCart() {}
}
