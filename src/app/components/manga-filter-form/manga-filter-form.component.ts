import {
  AllMangaStatus,
  AllOrderBySortByAttributes,
  MangaOrderByAttributeType,
  MangaSortMethod,
  MangaStatusType,
} from 'src/app/shared/models/filter.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GenreItem, MangaGenresSorted } from 'src/app/shared/utils/genres';
import { Observable, map, startWith } from 'rxjs';

import { MangaPublishingYears } from 'src/app/shared/utils/manga-utils';
import { MangaQueryFormData } from 'src/app/shared/models/response.model';

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

  defaultQueryFormValues: MangaQueryFormData = {
    mangaGenre: [],
    mangaStatus: null,
    mangaSearchTerm: '',
    mangaOrderBy: null,
    mangaSortMethod: 'desc',
  };

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
    this.QueryFormGroup.setValue(this.defaultQueryFormValues);
    this.sortMethod = 'desc';
  }

  get formHasChanged() {
    return (
      JSON.stringify(this.QueryFormGroup.value) !==
      JSON.stringify(this.defaultQueryFormValues)
    );
  }
}
