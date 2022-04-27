import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MangaItem } from '../models/manga-item.model';

@Injectable({
  providedIn: 'root',
})
export class MangaFavoritesService {
  private mangaFavSource = new BehaviorSubject(this.getStorageFavs());
  currentMangaFavsObservable = this.mangaFavSource.asObservable();

  constructor() {}

  getStorageFavs(): MangaItem[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  private setMangaFavs(favMangas: MangaItem[]) {
    localStorage.setItem('favorites', JSON.stringify(favMangas));
    this.mangaFavSource.next(favMangas);
  }

  addMangaFavs(mangaItem: MangaItem) {
    this.setMangaFavs([...this.getStorageFavs(), mangaItem]);
  }

  removeMangaFromFavs(mangaItem: MangaItem) {
    if (!this.getStorageFavs()) return;

    const updatedFavs = [...this.getStorageFavs(), mangaItem].filter(
      (manga: MangaItem) => manga.mal_id !== mangaItem.mal_id
    );
    this.setMangaFavs(updatedFavs);
  }

  clearAllFavorites() {
    this.setMangaFavs([]);
  }

  checkIsMangaFav(mangaItem: MangaItem): boolean {
    if (!this.getStorageFavs()) return false;
    return this.getStorageFavs().some(
      (manga: MangaItem) => manga.mal_id === mangaItem.mal_id
    );
  }
}
