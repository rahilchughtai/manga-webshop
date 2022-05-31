import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './shared/services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CartButtonComponent } from './components/navigation/toolbar/cart-button.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { ElementBoxComponent } from './components/elements/element-box.component';
import { ElementComponent } from './components/elements/element.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { FilterChipComponent } from './components/manga-filter-form/filter-chip.component';
import { FirebaseServiceModule } from './shared/modules/firebase.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './components/navigation/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { GenreDisplayComponent } from './components/manga-filter-form/genre-display.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { MangaCardComponent } from './components/manga-card/manga-card.component';
import { MangaDateToPricePipe } from './shared/pipes/manga-date-to-price.pipe';
import { MangaDetailComponent } from './pages/manga-detail/manga-detail.component';
import { MangaFavoritesService } from './shared/services/manga-favorites.service';
import { MangaFilterFormComponent } from './components/manga-filter-form/manga-filter-form.component';
import { MangaListComponent } from './pages/manga-list/manga-list.component';
import { MangaListDisplayComponent } from './components/manga-list-display/manga-list-display.component';
import { MaterialModule } from './shared/modules/material.module';
import { NgModule } from '@angular/core';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { SnakeCaseToSpacePipe } from './shared/pipes/snake-case-to-space.pipe';
import { ToolbarComponent } from './components/navigation/toolbar/toolbar.component';
import { UserCommentComponent } from './components/comment-list/user-comment.component';
import { WrapperComponent } from './pages/wrapper.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MangaListComponent,
    MangaCardComponent,
    SidenavListComponent,
    ToolbarComponent,
    FooterComponent,
    HomeComponent,
    LoginRegisterComponent,
    FavoritesComponent,
    CartComponent,
    MangaDetailComponent,
    ProfileComponent,
    WrapperComponent,
    CartButtonComponent,
    MangaListDisplayComponent,
    ElementBoxComponent,
    ElementComponent,
    GenreDisplayComponent,
    MangaFilterFormComponent,
    SnakeCaseToSpacePipe,
    FilterChipComponent,
    MangaDateToPricePipe,
    CheckoutComponent,
    OrdersComponent,
    OrderItemComponent,
    CommentListComponent,
    UserCommentComponent,
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
    ReactiveFormsModule,
  ],
  providers: [AuthService, MangaFavoritesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
