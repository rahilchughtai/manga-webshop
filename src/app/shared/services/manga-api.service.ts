import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import {
  JikanApiRequestParam,
  JikanApiResponse,
  JikanMangaByIdResponse,
  MangaQueryFormData,
} from '../models/response.model';
import { Observable, catchError, map, throwError } from 'rxjs';

import { GenreItem } from '../utils/genres';
import { Injectable } from '@angular/core';
import { MangaItem } from '../models/manga-item.model';

@Injectable({
  providedIn: 'root',
})
export class MangaApiService {
  constructor(private http: HttpClient) {}

  private BASE_API_V4 = 'https://api.jikan.moe/v4';

  private get standardParams(): JikanApiRequestParam {
    return {
      type: 'manga',
      sfw: true,
      genres_exclude: '9,49,12',
      page: 1,
      limit: 24,
      order_by: 'score',
      sort: 'desc',
    };
  }

  private overwriteParams(params: JikanApiRequestParam) {
    return {
      ...this.standardParams,
      ...params,
    };
  }

  private mangaStatusToParam() {}

  private mangaGenreToParam(genres: GenreItem[]): string {
    if (!genres.length) return '';
    let genreParams = '';
    genres.forEach((genre, idx) => {
      genreParams += genre.mal_id;
      if (idx !== genres.length - 1) genreParams += ',';
    });

    return genreParams;
  }

  formDataToSearchQuery(formData: MangaQueryFormData): JikanApiRequestParam {
    const {
      mangaGenre,
      mangaStatus,
      mangaSearchTerm,
      mangaOrderBy,
      mangaSortMethod,
    } = formData;

    const requestData: JikanApiRequestParam = {
      q: mangaSearchTerm,
      genres: this.mangaGenreToParam(mangaGenre),
      ...(mangaStatus !== null && { status: mangaStatus }),
      ...(mangaOrderBy !== null && { order_by: mangaOrderBy }),
      sort: mangaSortMethod,
    };
    return requestData;
  }

  getJikanMangaData(
    requestParams: JikanApiRequestParam
  ): Observable<JikanApiResponse> {
    const jikanParams = this.overwriteParams(requestParams);
    return this.http
      .get<any>(`${this.BASE_API_V4}/manga`, { params: jikanParams })
      .pipe(catchError(this.errorHandler));
  }

  getJikanMangaById(mid: any): Observable<MangaItem> {
    const mal_id = parseInt(mid);
    console.log(mal_id);
    return this.http
      .get<JikanMangaByIdResponse>(`${this.BASE_API_V4}/manga/${mal_id}`)
      .pipe(map((data) => data.data));
  }

  private errorHandler(error: HttpErrorResponse) {
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

  /*Mock Service Functions
  getMockMangaData(): Observable<MangaItem[]> {
    console.log('Using mockMangaData!');
    return this.http
      .get<any>('/assets/response.json')
      .pipe(map((data) => data.data));
  }

  getMangaData() {
    return this.http
      .get<any>(`${this.BASE_API_V3}/genre/manga/1/1`, {
        headers: this.myHeaders,
      })
      .pipe(map((data) => data.manga));
  }

  getMockMangaById(mid: any) {
    const mal_id = parseInt(mid);
    return this.http.get<any>('/assets/response.json').pipe(
      catchError(this.errorHandler),
      map((result) =>
        result.data.find((manga: MangaItem) => manga.mal_id === mal_id)
      )
    );
  }*/
}
