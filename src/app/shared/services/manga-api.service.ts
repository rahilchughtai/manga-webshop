import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { JikanApiResponse } from '../models/response.model';
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

  private createParams(indx = 1, limit = 25) {
    return new HttpParams()
      .append('sfw', true)
      .append('order_by', 'score')
      .append('type', 'manga')
      .append('sort', 'desc')
      .append('page', indx)
      .append('limit', limit);
  }

  /**
   * Current LIVE endpoint for querying data
   * @param pageIndex
   * @param limit
   * @returns
   */
  getJikanMangaData(
    pageIndex?: number,
    limit?: number
  ): Observable<JikanApiResponse> {
    const params = this.createParams(pageIndex, limit);

    return this.http
      .get<any>(`${this.BASE_API_V4}/manga`, {
        params,
      })
      .pipe(catchError(this.errorHandler));
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
    return this.http.get<any>('/assets/response.json').pipe(
      catchError(this.errorHandler),
      map((result) =>
        result.data.find((manga: MangaItem) => manga.mal_id === mal_id)
      )
    );
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      alert(`An error occurred: ${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      alert(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
