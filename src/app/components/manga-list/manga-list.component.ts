import { Component, OnInit } from '@angular/core';

import { MangaApiService } from 'src/app/shared/services/manga-api.service';
import { MangaItem } from 'src/app/shared/models/manga-item.model';
import { Observable } from 'rxjs';
import data from 'src/assets/response.json';

@Component({
  selector: 'home-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.scss'],
})
export class MangaListComponent implements OnInit {
  constructor(private mangaApi: MangaApiService) {}
  mockMangaData: Observable<MangaItem[]> = this.mangaApi.getMockMangaData();
  gridColumns = 5;
  value = '';

  ngOnInit(): void {}
  /**
   * Using trackby improves ngFor loop performance in angular
   */
  trackByFn(index: number, item: MangaItem) {
    return item.mal_id;
  }
}
