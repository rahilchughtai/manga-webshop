import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';
import { MangaFavoritesService } from 'src/app/shared/services/manga-favorites.service';
import { MangaItem } from 'src/app/shared/models/manga-item.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manga-card',
  templateUrl: './manga-card.component.html',
  styleUrls: ['./manga-card.component.scss'],
})
export class MangaCardComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private auth: AuthService,
    private mangaFavService: MangaFavoritesService
  ) {}

  @Input() mangaData!: MangaItem;
  @Input() hasSynopsis = true;
  @Input() hasInfoButton = true;
  @Input() maxCardHeight = 300;
  @Input() maxCardWidth = 400;
  @Input() headingEllipsis = true;

  price: number = 0;
  isFavorite = false;

  ngOnInit(): void {
    this.price = this.getPrice(this.mangaData.published.from);
    this.isFavorite = this.mangaFavService.checkIsMangaFav(this.mangaData);
  }

  yearToPrice(year: number): number {
    switch (true) {
      case year <= 1990:
        return 5.0;
      case year <= 2000:
        return 6.5;
      case year <= 2005:
        return 6.99;
      case year < 2010:
        return 8;
      case year <= 2022:
        return 12;
      default:
        return 7;
    }
  }

  getPrice(startDate: Date): number {
    const year = new Date(startDate).getFullYear();
    return this.yearToPrice(year);
  }

  addMangaToFavorites() {
    this.mangaFavService.addMangaFavs(this.mangaData);
    this.openSnackBar(
      `Added ${this.mangaData.title} to your favorites!`,
      'Okay'
    );
  }

  removeMangaFromFavorites() {
    this.mangaFavService.removeMangaFromFavs(this.mangaData);
    this.openSnackBar(
      `Removed ${this.mangaData.title} from your favorites!`,
      'Okay',
      'warn'
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

  openSnackBar(message: string, action: string, styleClass?: string) {
    let styling = styleClass ? styleClass : 'success';
    this._snackBar.open(message, action, {
      panelClass: [styling],
      duration: 1000,
    });
  }
}
