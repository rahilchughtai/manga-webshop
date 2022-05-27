import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  getPriceByPublishingDate,
  minifyMangaData,
} from 'src/app/shared/utils/manga-utils';

import { MangaFavoritesService } from 'src/app/shared/services/manga-favorites.service';
import { MangaItem } from 'src/app/shared/models/manga-item.model';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-manga-card',
  templateUrl: './manga-card.component.html',
  styleUrls: ['./manga-card.component.scss'],
})
export class MangaCardComponent implements OnInit {
  constructor(
    private snackService: SnackbarService,
    private router: Router,
    private mangaFavService: MangaFavoritesService
  ) {}

  @Input() mangaData!: MangaItem;
  @Input() hasSynopsis = true;
  @Input() showBadge = true;
  @Input() hasInfoButton = true;
  @Input() maxCardHeight = 300;
  @Input() maxCardWidth = 400;
  @Input() headingEllipsis = true;
  @Input() showPrice = true;

  price: number = 0;
  isFavorite = false;

  ngOnInit(): void {
    this.price = getPriceByPublishingDate(this.mangaData.published.from);
    this.isFavorite = this.mangaFavService.checkIsMangaFav(this.mangaData);
  }

  addMangaToFavorites() {
    this.mangaFavService.addMangaFavs(minifyMangaData(this.mangaData));
    this.snackService.openSnackBar(
      `Added ${this.mangaData.title} to your favorites!`
    );
  }

  removeMangaFromFavorites() {
    this.mangaFavService.removeMangaFromFavs(this.mangaData);
    this.snackService.openSnackBar(
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

  mangaClicked() {
    this.router.navigate([`/manga/${this.mangaData.mal_id}`]);
  }
}
