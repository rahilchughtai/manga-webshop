import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './components/pages/cart/cart.component';
import { FavoritesComponent } from './components/pages/favorites/favorites.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginRegisterComponent } from './components/pages/login-register/login-register.component';
import { MangaDetailComponent } from './components/pages/manga-detail/manga-detail.component';
import { MangaListComponent } from './components/manga-list/manga-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: MangaListComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'cart', component: CartComponent },
  { path: 'search', component: MangaListComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'manga/:mid', component: MangaDetailComponent },

  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
