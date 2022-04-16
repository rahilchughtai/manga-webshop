import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MangaFavoritesService {
  private mangaFavoritesSource: any = new BehaviorSubject([]);

  currentMangaFavorites = this.mangaFavoritesSource.asObservable();

  constructor() {}

  updateFavorites(message: any[]) {
    this.mangaFavoritesSource.next(message);
  }
}
