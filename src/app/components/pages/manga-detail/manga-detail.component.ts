import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MangaApiService } from 'src/app/shared/services/manga-api.service';
import { MangaItem } from 'src/app/shared/models/manga-item.model';

@Component({
  selector: 'app-manga-detail',
  templateUrl: './manga-detail.component.html',
  styleUrls: ['./manga-detail.component.scss'],
})
export class MangaDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private mangaApi: MangaApiService
  ) {}
  mangaId: string | null = '';
  mangaData!: MangaItem;

  

  ngOnInit(): void {
    this.mangaId = this.route.snapshot.paramMap.get('mid');
    this.mangaApi
      .getMockMangaById(this.mangaId)
      .subscribe((data) => (this.mangaData = data));
  }
}
