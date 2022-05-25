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
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let cartCount = 0;
    this.cartService
      .getCartCount()
      ?.pipe(take(1))
      .subscribe((count) => (cartCount = count));

    if (!cartCount) {
      this.router.navigateByUrl('/cart');
      return false;
    }
    return true;
  }
}
