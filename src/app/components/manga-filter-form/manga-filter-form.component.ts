import {
  AllMangaStatusTypes,
  MangaQueryFormData,
} from 'src/app/shared/models/response.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GenreItem, MangaGenresSorted } from 'src/app/shared/utils/genres';
import {
  MangaPublishingYears,
  defaultQueryForm,
} from 'src/app/shared/utils/manga-utils';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'list-manga-filter-form',
  templateUrl: './manga-filter-form.component.html',
  styleUrls: ['./manga-filter-form.component.scss'],
})
export class MangaFilterFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  @Input() QueryFormGroup!: FormGroup;

  formStatusTypes = AllMangaStatusTypes;
  formPublishingYears = MangaPublishingYears;
  formMangaGenres = MangaGenresSorted;

  ngOnInit(): void {}

  defaultQueryFormValues: MangaQueryFormData = {
    mangaGenre: [],
    mangaStatus: null,
    mangaSearchTerm: '',
  };

  get mangaGenre() {
    return this.QueryFormGroup.get('mangaGenre');
  }

  get mangaSearchTerm() {
    return this.QueryFormGroup.get('mangaSearchTerm');
  }
  get mangaStatus() {
    return this.QueryFormGroup.get('mangaStatus');
  }

  clearQueryValues() {
    this.QueryFormGroup.setValue(this.defaultQueryFormValues);
  }

  get formHasChanged() {
    return (
      JSON.stringify(this.QueryFormGroup.value) !==
      JSON.stringify(this.defaultQueryFormValues)
    );
  }
}
