import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Injectable } from '@angular/core';
import { MangaItem } from '../models/manga-item.model';

@Injectable({
  providedIn: 'root',
})
export class MangaApiService {
  constructor(private http: HttpClient) {}

  private BASE_API_V3 = 'https://jikan1.p.rapidapi.com';
  private BASE_API_V4 = 'https://api.jikan.moe/v4';

  private myHeaders = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-RapidAPI-Host', 'jikan1.p.rapidapi.com')
    .set(
      'X-RapidAPI-Key',
      '7ef1c787c1mshb98412eba5e164ep19d4f9jsna1f4519e52e1'
    );

  getMangaData() {
    return this.http
      .get<any>(`${this.BASE_API_V3}/genre/manga/1/1`, {
        headers: this.myHeaders,
      })
      .pipe(map((data) => data.manga));
  }

  getMangaDataV4() {
    return this.http
      .get<any>(
        `${this.BASE_API_V4}/manga?sfw=true&order_by=score&sort=desc&limit=50`
      )
      .pipe(map((data) => data.data));
  }

  /*Mock Service Functions*/

  getMockMangaData(): Observable<MangaItem[]> {
    console.log('Using mockMangaData!');
    return this.http
      .get<any>('/assets/response.json')
      .pipe(map((data) => data.data));
  }

  getMockMangaById(mid: any) {
    const mal_id = parseInt(mid);
    return this.http
      .get<any>('/assets/response.json')
      .pipe(
        map((result) =>
          result.data.find((manga: MangaItem) => manga.mal_id === mal_id)
        )
      );
  }
}
