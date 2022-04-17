import {RouterModule, Routes} from '@angular/router';

import {CartComponent} from './pages/cart/cart.component';
import {FavoritesComponent} from './pages/favorites/favorites.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginRegisterComponent} from './pages/login-register/login-register.component';
import {MangaDetailComponent} from './pages/manga-detail/manga-detail.component';
import {MangaListComponent} from './components/manga-list/manga-list.component';
import {NgModule} from '@angular/core';
import {ProfileComponent} from "./pages/profile/profile.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'search', component: MangaListComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'cart', component: CartComponent},
  {path: 'search', component: MangaListComponent},
  {path: 'login', component: LoginRegisterComponent},
  {path: 'manga/:mid', component: MangaDetailComponent},

  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
