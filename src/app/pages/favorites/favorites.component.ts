import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable, Subscription, take } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { MangaFavoritesService } from 'src/app/shared/services/manga-favorites.service';
import { MangaItem } from 'src/app/shared/models/manga-item.model';

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

  favoriteMangas: Observable<MangaItem[]> = this.mangaFav.currentMangaFavsObservable;

  ngOnInit(): void {}
}
