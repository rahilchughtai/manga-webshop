import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './shared/services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CartComponent } from './pages/cart/cart.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { FirebaseServiceModule } from './shared/modules/firebase.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { MangaCardComponent } from './components/manga-card/manga-card.component';
import { MangaDetailComponent } from './pages/manga-detail/manga-detail.component';
import { MangaFavoritesService } from './shared/services/manga-favorites.service';
import { MangaListComponent } from './components/manga-list/manga-list.component';
import { MaterialModule } from './shared/modules/material.module';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { ToolbarComponent } from './components/navigation/toolbar/toolbar.component';
import { WrapperComponent } from './pages/wrapper.component';
import { environment } from '../environments/environment';

export const routes = [
  { path: 'accounts', label: 'Accounts' },
  { path: 'contacts', label: 'Contacts' },
  { path: 'activities', label: 'Activities' },
];

@NgModule({
  declarations: [
    AppComponent,
    MangaListComponent,
    MangaCardComponent,
    SidenavListComponent,
    ToolbarComponent,
    HomeComponent,
    LoginRegisterComponent,
    FavoritesComponent,
    CartComponent,
    MangaDetailComponent,
    ProfileComponent,
    WrapperComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    FirebaseServiceModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [AuthService, MangaFavoritesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
