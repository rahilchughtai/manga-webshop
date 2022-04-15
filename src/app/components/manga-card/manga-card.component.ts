import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';
import { MangaItem } from 'src/app/shared/models/manga-item.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manga-card',
  templateUrl: './manga-card.component.html',
  styleUrls: ['./manga-card.component.scss'],
})
export class MangaCardComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private auth: AuthService
  ) {}

  @Input() mangaData!: MangaItem;
  @Input() hasSynopsis = true;
  @Input() hasInfoButton = true;

  price: number = 0;
  isFavorite = false;

  ngOnInit(): void {
    this.price = this.getPrice(this.mangaData.published.from);
  }

  ngOnChanges() {
    //   this.price = this.getPrice(this.mangaData.published.from);
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

  addToFavorites(mangaTitle: string) {
    if (!this.auth.isLoggedIn)
      return this.openSnackBar(
        'Please login to add favorites to your profile',
        'Okay',
        'warn'
      );

    this.openSnackBar(
      `Successfully added ${mangaTitle} to your favorites`,
      'Dismiss'
    );
  }
  mangaClicked() {
    this.router.navigate([`/manga/${this.mangaData.mal_id}`]);
  }

  openSnackBar(message: string, action: string, styleClass?: string) {
    let styling = 'success';

    if (typeof styleClass !== 'undefined') {
      styling = styleClass;
    }

    this._snackBar.open(message, action, {
      panelClass: [styling],
      duration: 2000,
    });
  }
}
