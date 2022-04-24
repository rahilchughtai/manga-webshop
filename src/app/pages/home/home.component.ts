import { Component, OnInit } from '@angular/core';
import {
  JikanApiResponse,
  Pagination,
} from 'src/app/shared/models/response.model';
import { Observable, filter, first, map, share, take } from 'rxjs';

import { MangaApiService } from 'src/app/shared/services/manga-api.service';
import { MangaItem } from 'src/app/shared/models/manga-item.model';


@Component({
  selector: 'page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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

  fetchMangaApiData(term?: string, index?: number, limit?: number) {
    this.JikanApiResponse$ = this.mangaApi
      .getJikanMangaData(term, index, 10)
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
    const { items } = pag;
    ({ current_page: this.pageIndex } = pag);
    ({ total: this.totalRecords, count: this.pageSize } = items);
  }

  trackByFn(index: number, item: MangaItem) {
    return item.mal_id;
  }
}
