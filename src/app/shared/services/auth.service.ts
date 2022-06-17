import * as auth from 'firebase/auth';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Injectable, NgZone } from '@angular/core';
import { MangaUser, UserAddress } from '../models/user.model';
import { Observable, of, switchMap, take, throwError } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatPasswordStrengthComponent } from '@angular-material-extensions/password-strength';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData$: Observable<MangaUser | undefined | null>;

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

  private getFireUserDocument(
    uid: string
  ): AngularFirestoreDocument<MangaUser> {
    return this.afs.doc<MangaUser>(`users/${uid}`);
  }

  private setLocalStorageUserData(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  getStorageUserData(): MangaUser | null {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  private extractUserData(user: any): MangaUser {
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
          this.router.navigate([this.redirectHome]);
        });
        this.setUserData(result.user);
        this.mergeLocalStorageData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  get userRef(): AngularFirestoreDocument<any> | undefined {
    if (!this.isLoggedIn) {
      return undefined;
    }
    return this.afs.doc(`users/${this.userId}`);
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

  initProfileData(data: any) {
    const { email, displayName, firstName, lastName, address } = data;
    return {
      email: email || '',
      displayName: displayName || '',
      firstName: firstName || '',
      lastName: lastName || '',
      address: this.initAdress(address),
    };
  }

  initAdress(address: any): UserAddress {
    return {
      streetName: address?.streetName || '',
      streetNumber: address?.streetNumber || '',
      plz: address?.plz || '',
      ort: address?.ort || '',
      country: address?.country || '',
    };
  }

  mergeLocalStorageData(userData: any) {
    this.userData$.pipe(take(1)).subscribe((fireUser) => {
      const newUser = {
        ...(fireUser && { ...fireUser }),
        ...userData,
      };
      delete newUser.shoppingCart;
      this.setLocalStorageUserData(newUser);
    });
  }

  setUserData(userData: any) {
    const { uid, email, displayName, photoURL, firstName, lastName, address } =
      userData;

    console.log('uid of the user', uid);

    const userRef = this.getFireUserDocument(uid);
    const newAddress = this.initAdress(address);
    const data: MangaUser = {
      uid,
      email,
      displayName,
      ...(photoURL && { photoURL }),
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(address && { address: newAddress }),
    };

    console.log(userData);

    this.mergeLocalStorageData(data);
    return userRef.set(data, { merge: true });
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.userData$
            .pipe(take(1))
            .subscribe((val) => this.setLocalStorageUserData(val));
          this.router.navigate([this.redirectHome]);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignUp(userData: any) {
    return this.afAuth
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate([this.redirectHome]);
        });
        const userWithUid = {
          uid: result.user?.uid,
          ...userData,
        };
        const { password, ...user } = userWithUid;
        this.setUserData(user);
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

  /*
   */
}
