import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { MangaApiService } from 'src/app/shared/services/manga-api.service';
import { MangaItem } from 'src/app/shared/models/manga-item.model';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

interface cartFormInformation {
  quantity: number;
  volumeNumber: number;
}

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
    private auth: AuthService,
    private snack: SnackbarService
  ) {}

  public cartMangaPurchaseForm: FormGroup = this.fb.group({
    volumeNumber: ['', Validators.required],
    quantity: ['', Validators.required],
  });

  private makeArray = (n: number | undefined) => {
    if (n === undefined) {
      n = 1;
    }
    return [...Array(n).keys()].map((i) => i + 1).reverse();
  };

  mangaId: string | null = '';
  mangaData!: MangaItem;
  volumeArr!: number[];
  quantityMax = this.makeArray(10);

  ngOnInit(): void {
    this.mangaId = this.route.snapshot.paramMap.get('mid');
    this.mangaApi.getMockMangaById(this.mangaId).subscribe((data) => {
      this.mangaData = data;
      this.volumeArr = this.makeArray(this.mangaData.volumes);
    });
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

    // TODO pass to cart service
    console.log(this.cartFormData);
    this.cartService.addMangaToCart();
    this.snack.openSnackBar('Added to your cart');
  }
}
