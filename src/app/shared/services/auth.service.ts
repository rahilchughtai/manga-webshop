import * as auth from 'firebase/auth';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Injectable, NgZone } from '@angular/core';
import { Observable, of, switchMap, take, throwError } from 'rxjs';
import { User, UserAddress } from '../models/user';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData$: Observable<User | undefined | null>;

  // See https://www.positronx.io/full-angular-firebase-authentication-system/
  private redirectHome = 'home';
  private redirectLog = 'login';

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.userData$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          this.setLocalStorageUserData(user);
          return this.getFireUserDocument(user.uid).valueChanges();
        } else {
          this.setLocalStorageUserData(null);
          return of(null);
        }
      })
    );
  }

  /**
   * Helper functions here
   */

  private getFireUserDocument(uid: string): AngularFirestoreDocument<User> {
    return this.afs.doc<User>(`users/${uid}`);
  }

  private setLocalStorageUserData(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  getStorageUserData(): User | null {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  private extractUserData(user: any): User {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  }

  private AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  get userId(): number {
    return JSON.parse(localStorage.getItem('user')!).uid;
  }

  /**
   * Helper functions END
   */

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate([this.redirectHome]);
      }
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  updateUserData(data: any) {
    const user = this.getStorageUserData();
    const newUser = {
      ...(user && user),
      ...data,
    };
    this.setUserData(newUser);
  }

  private initAdress(address: any): UserAddress {
    return {
      streetName: address?.streetName || '',
      streetNumber: address?.streetNumber || 0,
      plz: address?.plz || 0,
      ort: address?.ort || '',
      country: address?.country || '',
    };
  }

  mergeLocalStorageData(userData: any) {
    const user = this.userData$.pipe(take(1)).subscribe((fireUser) => {
      const newUser = {
        ...(fireUser && { ...fireUser }),
        ...userData,
      };

      this.setLocalStorageUserData(newUser);
    });
  }

  setUserData(userData: any) {
    const { uid, email, displayName, photoURL, firstName, lastName, address } =
      userData;
    const userRef = this.getFireUserDocument(uid);
    const newAddress = this.initAdress(address);
    const data: User = {
      uid,
      email,
      displayName,
      photoURL,
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(address && { address: newAddress }),
    };

    this.mergeLocalStorageData(data);
    return userRef.set(data, { merge: true });
  }

  /*
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate([this.redirectHome]);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  */
}
