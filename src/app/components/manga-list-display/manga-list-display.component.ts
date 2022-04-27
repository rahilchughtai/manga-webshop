import { Component, Input, OnInit } from '@angular/core';

import { MangaItem } from 'src/app/shared/models/manga-item.model';

@Component({
  selector: 'list-manga-list-display',
  styles: [``],
  template: `
    <div [fxLayout]="InputfxLayout" [fxLayoutAlign]="InputFxLayoutAlign">
      <div *ngFor="let manga of MangaArray; let i = index; trackBy: trackByFn">
        <app-manga-card [hasSynopsis]="synopsis" [mangaData]="manga">
        </app-manga-card>
      </div>
    </div>
  `,
})
export class MangaListDisplayComponent implements OnInit {
  constructor() {}

  @Input() InputFxLayoutAlign = 'center';
  @Input() InputfxLayout = 'row wrap';
  @Input() MangaArray: MangaItem[] = [];
  @Input() synopsis: boolean = false;

  ngOnInit(): void {}

  trackByFn(index: number, item: MangaItem) {
    return item.mal_id;
  }
}
