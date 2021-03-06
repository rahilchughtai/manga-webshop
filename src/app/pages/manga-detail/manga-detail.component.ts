import {
  CartFormInformation,
  CartItem,
} from 'src/app/shared/models/cart.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAX_MANGA_LIMIT,
  calculateMangaSubtotal,
  makeNumbersArray,
  minifyMangaData,
} from 'src/app/shared/utils/manga-utils';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { MangaApiService } from 'src/app/shared/services/manga-api.service';
import { MangaItem } from 'src/app/shared/models/manga-item.model';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { getPriceByPublishingDate } from 'src/app/shared/utils/manga-utils';
import { take } from 'rxjs';

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
    private snack: SnackbarService
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
  quantityMax = makeNumbersArray(MAX_MANGA_LIMIT);

  price: number = 0;

  ngOnInit(): void {
    if (this.auth.isLoggedIn) {
    }
    this.mangaId = this.route.snapshot.paramMap.get('mid');
    this.mangaApi
      .getJikanMangaById(this.mangaId)
      .pipe(take(1))
      .subscribe((mangaItem) => {
        this.mangaData = mangaItem;
        this.price = getPriceByPublishingDate(this.mangaData.published.from);
        this.volumeArr = makeNumbersArray(mangaItem.volumes);
        this.loading = false;
      });
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
    const minMangaData = minifyMangaData(this.mangaData);
    const newCartData = {
      mangaData: minMangaData,
      quantity,
      volume,
      subtotal: calculateMangaSubtotal(quantity, minMangaData),
    };

    this.cartService.addMangaToCart(newCartData);
    this.snack.openSnackBar(`Added ${this.mangaData.title} to your cart!`);
  }
}
