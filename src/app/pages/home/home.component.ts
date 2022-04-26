import { Component, OnInit } from '@angular/core';
import { Observable, share } from 'rxjs';

import { JikanApiResponse } from 'src/app/shared/models/response.model';
import { MangaApiService } from 'src/app/shared/services/manga-api.service';
import { MangaItem } from 'src/app/shared/models/manga-item.model';

enum ShiftDirection {
  NOMOVE = 0,
  LEFT = -1,
  RIGHT = 1,
}

@Component({
  selector: 'page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private mangaApi: MangaApiService) {}

  JikanApiResponse$!: Observable<JikanApiResponse>;

  direction = ShiftDirection;

  loadedElements = 15;
  width = this.widthCalc();
  elementsMoved = 0;
  leftStyleValue = 0;
  elementInBox = Math.min(
    Math.floor((window.innerWidth * 0.8) / 312),
    this.loadedElements
  );

  linkButtons = [
    { routeLink: '/search', buttonText: 'Alle Mangas' },
    { routeLink: '/favorites', buttonText: 'Favoriten' },
    { routeLink: '/cart', buttonText: 'Warenkorb' },
  ];

  widthCalc(): number {
    this.elementInBox = Math.max(
      Math.min(
        Math.floor((window.innerWidth * 0.8) / 312),
        this.loadedElements
      ),
      1
    );
    return this.elementInBox * 312;
  }

  listenWidthChange(): void {
    this.width = this.widthCalc();
    this.moveElement(ShiftDirection.NOMOVE);
  }

  moveElement(shift: ShiftDirection): void {
    this.elementsMoved = Math.max(
      Math.min(
        this.elementsMoved + shift,
        this.loadedElements - this.elementInBox
      ),
      0
    );
    const offset = this.elementsMoved * -312;
    this.leftStyleValue = offset;
  }

  ngOnInit(): void {
    const _ = undefined;
    this.JikanApiResponse$ = this.mangaApi
      .getJikanMangaData(_, _, this.loadedElements)
      .pipe(share());
  }

  /*   fetchMangaApiData(term?: string, index?: number, limit?: number) {
    this.JikanApiResponse$ = this.mangaApi
      .getJikanMangaData(term, index, this.loadedElements)
      .pipe(share());
  } */
}
