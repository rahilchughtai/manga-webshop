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
import { CartComponent } from './pages/cart/cart.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { MangaDetailComponent } from './pages/manga-detail/manga-detail.component';
import { MangaListComponent } from './pages/manga-list/manga-list.component';
import { ProfileComponent } from './pages/profile/profile.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isLoggedIn) {
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }
}

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'search', component: MangaListComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'cart', component: CartComponent },
  { path: 'search', component: MangaListComponent },
  {
    path: 'login',
    component: LoginRegisterComponent,
    canActivate: [AuthGuard],
  },
  { path: 'manga/:mid', component: MangaDetailComponent },

  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
