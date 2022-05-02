import {
  AllMangaStatus,
  AllOrderBySortByAttributes,
  GenreItem,
  MangaOrderByAttributeType,
  MangaSortMethod,
  MangaStatusType,
  defaultQueryFormValues,
} from 'src/app/shared/models/filter.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

import { MangaGenresSorted } from 'src/app/shared/utils/genres';
import { MangaPublishingYears } from 'src/app/shared/utils/manga-utils';

@Component({
  selector: 'list-manga-filter-form',
  templateUrl: './manga-filter-form.component.html',
  styleUrls: ['./manga-filter-form.component.scss'],
})
export class MangaFilterFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  @Input() QueryFormGroup!: FormGroup;

  formStatusTypes: MangaStatusType[] = [...AllMangaStatus];
  formPublishingYears = MangaPublishingYears;
  formMangaGenres: GenreItem[] = MangaGenresSorted;
  formOrderByAttributes: MangaOrderByAttributeType[] = [
    ...AllOrderBySortByAttributes,
  ];
  sortMethod: MangaSortMethod = 'desc';

  ngOnInit(): void {}


  btnSortMethodClick() {
    this.sortMethod = this.sortMethod === 'asc' ? 'desc' : 'asc';
    this.QueryFormGroup.get('mangaSortMethod')?.setValue(this.sortMethod);
  }
  get mangaGenre() {
    return this.QueryFormGroup.get('mangaGenre');
  }

  get mangaOrderBy() {
    return this.QueryFormGroup.get('mangaOrderBy');
  }
  get mangaSearchTerm() {
    return this.QueryFormGroup.get('mangaSearchTerm');
  }
  get mangaStatus() {
    return this.QueryFormGroup.get('mangaStatus');
  }

  get mangaSortMethod() {
    return this.QueryFormGroup.get('mangaSortBy');
  }
  clearQueryValues() {
    this.QueryFormGroup.setValue(defaultQueryFormValues);
    this.sortMethod = 'desc';
  }

  get formHasChanged() {
    return (
      JSON.stringify(this.QueryFormGroup.value) !==
      JSON.stringify(defaultQueryFormValues)
    );
  }
}
