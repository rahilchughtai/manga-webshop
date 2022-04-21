import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CartItem, MangaItem } from 'src/app/shared/models/manga-item.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

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
    private auth: AuthService,
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

  cartSubscription!: Subscription;
  cartData!: CartItem[];

  mangaId: string | null = '';
  mangaData!: MangaItem;
  volumeArr!: number[];
  quantityMax = this.makeArray(10);

  ngOnInit(): void {
    this.cartSubscription = this.cartService
      .getCart()
      .subscribe((data) => (this.cartData = data));

    this.mangaId = this.route.snapshot.paramMap.get('mid');
    this.mangaApi.getMockMangaById(this.mangaId).subscribe((data) => {
      this.mangaData = data;
      this.volumeArr = this.makeArray(this.mangaData.volumes);
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
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
