import { Component, OnInit } from '@angular/core';
import {
  JikanApiResponse,
} from 'src/app/shared/models/response.model';
import { Observable, share } from 'rxjs';

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
  width = "width: " + this.widthCalc() + "px";
  elementsMoved = 0;
  elementsMoved_style = "left: 0px;";
  elementInBox = Math.min(Math.floor(((window.innerWidth * 0.8) / 312)), 10);

  widthCalc() : number{
    this.elementInBox = Math.min(Math.floor(((window.innerWidth * 0.8) / 312)), 10)
    return this.elementInBox * 312
  }

  listenWidthChange() : void {
    this.width = "width: " + this.widthCalc() + "px";
  }

  moveElementLeft() : void {
    this.elementsMoved --;
    this.elementsMoved_style = "left: " + (this.elementsMoved * -312) + "px";
  }
  moveElementRight() : void {
    this.elementsMoved ++;
    this.elementsMoved_style = "left: " + (this.elementsMoved * -312) + "px";
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
