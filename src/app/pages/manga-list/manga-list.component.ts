import { Component, OnInit } from '@angular/core';
import {
  JikanApiResponse,
  Pagination,
} from 'src/app/shared/models/response.model';
import { Observable, filter, first, map, share, take } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { FormControl } from '@angular/forms';
import { MangaApiService } from 'src/app/shared/services/manga-api.service';
import { MangaItem } from 'src/app/shared/models/manga-item.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'home-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.scss'],
})
export class MangaListComponent implements OnInit {
  constructor(private mangaApi: MangaApiService) {}

  JikanApiResponse$!: Observable<JikanApiResponse>;
  public mangaSearchField!: FormControl;
  searchFieldResult!: Observable<string>;
  value = '';
  pageIndex = 0;
  totalRecords = 0;
  pageSize = 24;
  hasNext = false;
  paginationData!: Pagination;

  ngOnInit(): void {
    this.mangaSearchField = new FormControl();
    this.mangaSearchField.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        filter((term) => term.length > 3 || term.length === 0)
      )
      .subscribe((term) => {
        this.fetchMangaApiData(term);
      });
    this.fetchMangaApiData();
  }

  fetchMangaApiData(term?: string, index?: number, limit?: number) {
    this.JikanApiResponse$ = this.mangaApi
      .getJikanMangaData(term, index, limit)
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
    ({ total: this.totalRecords, per_page: this.pageSize } = items);
  }

  pageEvent(pageEvent: PageEvent) {
    const { pageIndex, pageSize } = pageEvent;
    this.fetchMangaApiData(
      this.mangaSearchField.value,
      pageIndex + 1,
      pageSize
    );
  }

  trackByFn(index: number, item: MangaItem) {
    return item.mal_id;
  }
}
