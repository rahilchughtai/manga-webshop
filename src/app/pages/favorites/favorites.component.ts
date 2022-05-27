import { Component, OnInit } from '@angular/core';
import { Observable, map, take } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { MangaFavoritesService } from 'src/app/shared/services/manga-favorites.service';
import { MinMangaItemData } from 'src/app/shared/models/manga-item.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private mangaFav: MangaFavoritesService
  ) {}

  favoriteMangas: Observable<MinMangaItemData[]> =
    this.mangaFav.currentMangaFavsObservable;

  clearFavorites() {
    this.mangaFav.clearAllFavorites();
  }

  get userHasFavorites(): Observable<boolean> {
    return this.favoriteMangas.pipe(
      take(1),
      map((favs: MinMangaItemData[]) => favs.length !== 0)
    );
  }

  ngOnInit(): void {}
}
