import { Component, Input, OnInit } from '@angular/core';

import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'form-filter-chip',
  template: `
    <mat-chip
      *ngIf="filterFormControl?.value && displayCondition"
      (click)="filterFormControl?.setValue(defaultValue)"
      color="primary"
      selected
    >
      <ng-content> </ng-content>
      <mat-icon>close</mat-icon>
    </mat-chip>
  `,
  styles: [
    `
      mat-chip {
        mat-icon {
          display: none;
        }
      }
      mat-chip:hover {
        mat-icon {
          display: block;
        }
      }
    `,
  ],
})
export class FilterChipComponent implements OnInit {
  constructor() {}

  @Input() filterFormControl: AbstractControl | null = null;
  @Input() defaultValue: any = null;
  @Input() displayCondition: any = true;
  ngOnInit(): void {}
}
