import { Component, OnInit } from '@angular/core';
import { Observable, share } from 'rxjs';

import { JikanApiResponse } from 'src/app/shared/models/response.model';
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

  loadedElements = 15;
  width = 'width: ' + this.widthCalc() + 'px';
  elementsMoved = 0;
  leftStyleProperty = 0;
  shiftValue = 312;

  elementInBox = Math.max(
    Math.min(Math.floor((window.innerWidth * 0.8) / 312), 10),
    1
  );

  widthCalc(): number {
    this.elementInBox = Math.max(
      Math.min(Math.floor((window.innerWidth * 0.8) / 312), 10),
      1
    );
    return this.elementInBox * 312;
  }

  listenWidthChange(): void {
    this.width = 'width: ' + this.widthCalc() + 'px';
  }

  moveElement(right: boolean) {
    const shift = right ? 1 : -1;
    this.elementsMoved += shift;
    this.leftStyleProperty = this.elementsMoved * -312;
  }
  ngOnInit(): void {
    this.fetchMangaApiData();
  }

  fetchMangaApiData(term?: string, index?: number, limit?: number) {
    this.JikanApiResponse$ = this.mangaApi
      .getJikanMangaData(term, index, this.loadedElements)
      .pipe(share());
  }

  trackByFn(index: number, item: MangaItem) {
    return item.mal_id;
  }
}
