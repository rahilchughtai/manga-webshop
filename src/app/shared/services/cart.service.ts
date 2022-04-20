import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private afs: AngularFirestore, // Inject Firestore service
    private afAuth: AngularFireAuth
  ) {} // Inject Firebase auth service) { }

  addMangaToCart() {}

  removeMangaFromCart() {}

  emptyCart() {}
}
