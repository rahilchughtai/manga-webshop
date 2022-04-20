import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { MangaApiService } from 'src/app/shared/services/manga-api.service';
import { MangaItem } from 'src/app/shared/models/manga-item.model';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-manga-detail',
  templateUrl: './manga-detail.component.html',
  styleUrls: ['./manga-detail.component.scss'],
})
export class MangaDetailComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private mangaApi: MangaApiService,
    private auth: AuthService,
    private snack: SnackbarService
  ) {}

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
  quantityValue = 0;
  formIsValid = false;

  ngOnInit(): void {
    this.mangaId = this.route.snapshot.paramMap.get('mid');
    this.mangaApi.getMockMangaById(this.mangaId).subscribe((data) => {
      this.mangaData = data;
      this.volumeArr = this.makeArray(this.mangaData.volumes);
    });
  }

  addMangaToCart() {
    if (!this.auth.isLoggedIn) {
      return this.snack.openSnackBar(
        'Please login to add items to your cart',
        'snackbar-warn'
      );
    }

    // TODO
    this.cartService.addMangaToCart();
  }
}
