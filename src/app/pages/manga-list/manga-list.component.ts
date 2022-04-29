import {
  AllMangaStatusTypes,
  JikanApiRequestParam,
  JikanApiResponse,
  Pagination,
} from 'src/app/shared/models/response.model';
import { Component, OnInit } from '@angular/core';
import {
  GenreItem,
  MangaGenresSorted,
} from '../../shared/utils/genres';
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

  formStatusTypes = AllMangaStatusTypes;
  formMangaGenres = MangaGenresSorted;
  formPublishingYears = this.publishingYears();

  JikanApiResponse$!: Observable<JikanApiResponse>;
  mangaSearchField!: FormControl;
  searchFieldResult!: Observable<string>;
  value = '';
  pageIndex = 0;
  totalRecords = 0;
  pageSize = 24;
  hasNext = false;
  paginationData!: Pagination;

  myControl = new FormControl();
  filteredGenre!: Observable<GenreItem[]>;

  ngOnInit(): void {
    this.setFilteredGenre();
    this.mangaSearchField = new FormControl();
    this.mangaSearchField.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        filter((term) => term.length > 3 || term.length === 0)
      )
      .subscribe((term: string) => {
        this.fetchMangaApiData({ q: term });
      });
    this.fetchMangaApiData({});
  }

  private publishingYears() {
    const years = [];
    for (let year = 2023; year >= 1945; year--) {
      years.push(year);
    }
    return years;
  }

  setFilteredGenre() {
    this.filteredGenre = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.formMangaGenres.slice()))
    );
  }

  displayFn(item: GenreItem): string {
    return item && item.name ? item.name : '';
  }

  private _filter(value: string): GenreItem[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.formMangaGenres.filter((genreItem) =>
      genreItem.name.toLowerCase().startsWith(filterValue)
    );
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
    this.fetchMangaApiData({
      q: this.mangaSearchField.value,
      page: pageIndex + 1,
      limit: pageSize,
    });
  }

  trackByFn(index: number, item: MangaItem) {
    return item.mal_id;
  }
}
