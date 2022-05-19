import {
  CartFormInformation,
  CartItem,
} from 'src/app/shared/models/cart.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  calculateMangaSubtotal,
  makeNumbersArray,
} from 'src/app/shared/utils/manga-utils';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { MangaApiService } from 'src/app/shared/services/manga-api.service';
import { MangaItem } from 'src/app/shared/models/manga-item.model';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { take } from 'rxjs';
import { getPriceByPublishingDate } from 'src/app/shared/utils/manga-utils';
import { MangaFavoritesService } from 'src/app/shared/services/manga-favorites.service';

@Component({
  selector: 'app-manga-detail',
  templateUrl: './manga-detail.component.html',
  styleUrls: ['./manga-detail.component.scss'],
})
export class MangaDetailComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private route: ActivatedRoute,
    private mangaApi: MangaApiService,
    public auth: AuthService,
    private snack: SnackbarService,
    private mangaFavService: MangaFavoritesService,
  ) {}

  public cartMangaPurchaseForm: FormGroup = this.fb.group({
    volume: ['', Validators.required],
    quantity: ['', Validators.required],
  });

  cartData!: CartItem[];
  loading = true;
  mangaId: string | null = '';
  mangaData!: MangaItem;
  volumeArr: number[] = [];
  quantityMax = makeNumbersArray(100);

  price: number = 0;
  isFavorite = false;


  ngOnInit(): void {
    if (this.auth.isLoggedIn) {
    }
    this.mangaId = this.route.snapshot.paramMap.get('mid');
    this.mangaApi
      .getJikanMangaById(this.mangaId)
      .pipe(take(1))
      .subscribe((mangaItem) => {
        this.mangaData = mangaItem;
        this.price = getPriceByPublishingDate(this.mangaData.published.from)
        this.isFavorite = this.mangaFavService.checkIsMangaFav(this.mangaData);
        this.volumeArr = makeNumbersArray(mangaItem.volumes);
        this.loading = false;
      });
  }

  addMangaToFavorites() {
    this.mangaFavService.addMangaFavs(this.mangaData);
    this.snack.openSnackBar(
      `Added ${this.mangaData.title} to your favorites!`
    );
  }

  removeMangaFromFavorites() {
    this.mangaFavService.removeMangaFromFavs(this.mangaData);
    this.snack.openSnackBar(
      `Removed ${this.mangaData.title} from your favorites!`,
      'snackbar-warn'
    );
  }

  btnFavoriteClick() {
    this.isFavorite = !this.isFavorite;
    return this.isFavorite
      ? this.addMangaToFavorites()
      : this.removeMangaFromFavorites();
  }

  get cartFormData(): CartFormInformation {
    return this.cartMangaPurchaseForm.value;
  }

  addMangaToCart() {
    if (!this.auth.isLoggedIn) {
      return this.snack.openSnackBar(
        'Please login to add items to your cart',
        'snackbar-warn'
      );
    }

    const { quantity, volume } = this.cartFormData;
    const newCartData = {
      mangaData: this.mangaData,
      quantity,
      volume,
      subtotal: calculateMangaSubtotal(quantity, this.mangaData),
    };

    this.cartService.addMangaToCart(newCartData);
    this.snack.openSnackBar(`Added ${this.mangaData.title} to your cart!`);
  }
}
