import { CartItem, MangaItem } from 'src/app/shared/models/manga-item.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, take } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { MangaApiService } from 'src/app/shared/services/manga-api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { getPriceByPublishingDate } from 'src/app/shared/utils/manga-utils';

interface cartFormInformation {
  quantity: number;
  volume: number;
}

@Component({
  selector: 'app-manga-detail',
  templateUrl: './manga-detail.component.html',
  styleUrls: ['./manga-detail.component.scss'],
})
export class MangaDetailComponent implements OnInit, OnDestroy {
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

  private makeArray = (n: number | undefined) => {
    if (n === undefined) {
      n = 1;
    }
    return [...Array(n).keys()].map((i) => i + 1).reverse();
  };

  cartSubscription!: Subscription | undefined;
  cartData!: CartItem[];
  loading = true;
  mangaId: string | null = '';
  mangaData!: MangaItem;
  volumeArr!: number[];
  quantityMax = this.makeArray(10);

  ngOnInit(): void {
    if (this.auth.isLoggedIn) {
      this.cartSubscription = this.cartService
        .getCart()
        ?.pipe(take(1))
        ?.subscribe((data) => (this.cartData = data));
    }
    this.mangaId = this.route.snapshot.paramMap.get('mid');
    this.mangaApi
      .getJikanMangaById(this.mangaId)
      .pipe(take(1))
      .subscribe((mangaItem) => {
        this.mangaData = mangaItem;
        this.volumeArr = this.makeArray(mangaItem.volumes);
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    if (this.auth.isLoggedIn) {
      this.cartSubscription?.unsubscribe();
    }
  }

  get cartFormData(): cartFormInformation {
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
    };

    this.cartService.addMangaToCart(this.cartData, newCartData);
    this.snack.openSnackBar(`Added ${this.mangaData.title} to your cart!`);
  }
}
