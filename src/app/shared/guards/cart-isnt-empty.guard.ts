import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, take } from 'rxjs';

import { CartService } from '../services/cart.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartIsntEmptyGuard implements CanActivate {
  constructor(private cartService: CartService, private router: Router) {}
  canActivate(): Observable<boolean> {
    return new Observable<boolean>((obs) => {
      this.cartService
        .getCartCount()
        ?.pipe(take(1))
        .subscribe((count) => {
          if (!count) {
            this.router.navigateByUrl('/cart');
            return obs.next(false);
          } else {
            return obs.next(true);
          }
        });
    });
  }
}
