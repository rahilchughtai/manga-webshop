import { Component, Input } from '@angular/core';

import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'form-genre-display',
  template: `
    {{
      mangaGenre?.value?.length > 0 ? mangaGenre?.value[0].name : ''
    }}
    <span
      *ngIf="mangaGenre?.value?.length > 1"
      class="example-additional-selection"
    >
      (+{{ mangaGenre?.value?.length - 1 }}
      {{ mangaGenre?.value?.length === 2 ? 'other' : 'others' }})
    </span>
  `,

})
export class GenreDisplayComponent {
  constructor() {}

  @Input() mangaGenre: AbstractControl | null = null;
}
