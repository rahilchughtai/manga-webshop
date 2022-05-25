import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { Injectable, NgModule } from '@angular/core';

import { AuthService } from './shared/services/auth.service';
import { AuthenticateUser } from './shared/guards/authenticate-user.guard';
import { CartComponent } from './pages/cart/cart.component';
import { CartIsntEmptyGuard } from './shared/guards/cart-isnt-empty.guard';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { MangaDetailComponent } from './pages/manga-detail/manga-detail.component';
import { MangaListComponent } from './pages/manga-list/manga-list.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserIsLoggedIn } from './shared/guards/user-logged.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'search', component: MangaListComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'cart', component: CartComponent },
  { path: 'search', component: MangaListComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthenticateUser, CartIsntEmptyGuard],
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthenticateUser],
  },

  {
    path: 'login',
    component: LoginRegisterComponent,
    canActivate: [UserIsLoggedIn],
  },
  { path: 'manga/:mid', component: MangaDetailComponent },

  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
