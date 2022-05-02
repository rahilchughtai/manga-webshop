import { Component, Input } from '@angular/core';

import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'form-genre-display',
  template: `
    {{
      this.mangaGenre?.value?.length > 0 ? this.mangaGenre?.value[0].name : ''
    }}
    <span
      *ngIf="this.mangaGenre?.value?.length > 1"
      class="example-additional-selection"
    >
      (+{{ this.mangaGenre?.value?.length - 1 }}
      {{ this.mangaGenre?.value?.length === 2 ? 'other' : 'others' }})
    </span>
  `,
  styles: [],
})
export class GenreDisplayComponent {
  constructor() {}

  @Input() mangaGenre: AbstractControl | null = null;
}
