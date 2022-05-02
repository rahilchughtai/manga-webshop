import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  JikanApiRequestParam,
  JikanApiResponse,
  Pagination,
} from 'src/app/shared/models/manga-api.model';
import {
  MangaQueryFormData,
  defaultQueryFormValues,
} from 'src/app/shared/models/filter.model';
import {
  Observable,
  filter,
  first,
  map,
  of,
  share,
  startWith,
  take,
} from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MangaApiService } from 'src/app/shared/services/manga-api.service';
import { MangaItem } from 'src/app/shared/models/manga-item.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'home-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.scss'],
})
export class MangaListComponent implements OnInit {
  constructor(private mangaApi: MangaApiService, private fb: FormBuilder) {}

  QueryForm!: FormGroup;

  JikanApiResponse$!: Observable<JikanApiResponse>;
  pageIndex = 0;
  totalRecords = 0;
  pageSize = 24;
  hasNext = false;
  paginationData!: Pagination;

  get mangaSearchTerm() {
    return this.QueryForm.get('mangaSearchTerm');
  }

  ngOnInit(): void {
    this.setFormData();
    this.subscribeToFormChanges();
    this.fetchMangaApiData({});
  }

  private setFormData() {
    const {
      mangaGenre,
      mangaStatus,
      mangaSearchTerm,
      mangaOrderBy,
      mangaSortMethod,
    } = defaultQueryFormValues;

    this.QueryForm = this.fb.group({
      mangaGenre: [mangaGenre],
      mangaStatus: [mangaStatus],
      mangaSearchTerm: [mangaSearchTerm],
      mangaOrderBy: [mangaOrderBy],
      mangaSortMethod: [mangaSortMethod],
    });
  }

  subscribeToFormChanges() {
    this.QueryForm.valueChanges
      .pipe(debounceTime(1200), distinctUntilChanged())
      .subscribe((formData: MangaQueryFormData) => {
        const apiQueryData = this.mangaApi.formDataToSearchQuery(formData);
        this.fetchMangaApiData(apiQueryData);
      });
  }

  fetchMangaApiData(params: JikanApiRequestParam) {
    this.JikanApiResponse$ = this.mangaApi
      .getJikanMangaData(params)
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
    const formQueryData = this.mangaApi.formDataToSearchQuery(
      this.QueryForm.value
    );
    this.fetchMangaApiData({
      page: pageIndex + 1,
      limit: pageSize,
      ...formQueryData,
    });
  }

  trackByFn(index: number, item: MangaItem) {
    return item.mal_id;
  }
}
