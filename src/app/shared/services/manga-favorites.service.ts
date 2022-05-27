import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MinMangaItemData } from '../models/manga-item.model';

@Injectable({
  providedIn: 'root',
})
export class MangaFavoritesService {
  private mangaFavSource = new BehaviorSubject(this.getStorageFavs());
  currentMangaFavsObservable = this.mangaFavSource.asObservable();

  constructor() {}

  getStorageFavs(): MinMangaItemData[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  private setMangaFavs(favMangas: MinMangaItemData[]) {
    localStorage.setItem('favorites', JSON.stringify(favMangas));
    this.mangaFavSource.next(favMangas);
  }

  addMangaFavs(mangaItem: MinMangaItemData) {
    this.setMangaFavs([...this.getStorageFavs(), mangaItem]);
  }

  removeMangaFromFavs(mangaItem: MinMangaItemData) {
    if (!this.getStorageFavs()) return;

    const updatedFavs = [...this.getStorageFavs(), mangaItem].filter(
      (manga: MinMangaItemData) => manga.mal_id !== mangaItem.mal_id
    );
    this.setMangaFavs(updatedFavs);
  }

  clearAllFavorites() {
    this.setMangaFavs([]);
  }

  checkIsMangaFav(mangaItem: MinMangaItemData): boolean {
    if (!this.getStorageFavs()) return false;
    return this.getStorageFavs().some(
      (manga: MinMangaItemData) => manga.mal_id === mangaItem.mal_id
    );
  }
}
