import { Component, OnInit } from '@angular/core';
import {
  JikanApiResponse,
  Pagination,
} from 'src/app/shared/models/response.model';
import { Observable, first, map, share, take } from 'rxjs';

import { MangaApiService } from 'src/app/shared/services/manga-api.service';
import { MangaItem } from 'src/app/shared/models/manga-item.model';
import { PageEvent } from '@angular/material/paginator';
import data from 'src/assets/response.json';

@Component({
  selector: 'home-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.scss'],
})
export class MangaListComponent implements OnInit {
  constructor(private mangaApi: MangaApiService) {}

  JikanApiResponse$!: Observable<JikanApiResponse>;
  gridColumns = 5;
  value = '';

  pageIndex = 0;
  totalRecords = 0;
  pageSize = 0;
  hasNext = false;
  paginationData!: Pagination;

  ngOnInit(): void {
    this.fetchMangaApiData();
  }

  fetchMangaApiData(index?: number, limit?: number) {
    this.JikanApiResponse$ = this.mangaApi
      .getJikanMangaData(index,limit)
      .pipe(share());
    this.mapToPageValue();
  }

  mapToPageValue() {
    this.JikanApiResponse$.pipe(
      map((resp) => resp.pagination),
      take(1)
    ).subscribe((pag: Pagination) => {
      this.initializePageValues(pag);
    });
  }

  initializePageValues(pag: Pagination) {
    console.log(pag);
    const { items } = pag;
    ({ current_page: this.pageIndex } = pag);
    ({ total: this.totalRecords, count: this.pageSize } = items);
  }

  pageEvent(pageEvent: PageEvent) {
    const { pageIndex, pageSize } = pageEvent;
    this.fetchMangaApiData(pageIndex + 1, pageSize);
  }

  trackByFn(index: number, item: MangaItem) {
    return item.mal_id;
  }
}
