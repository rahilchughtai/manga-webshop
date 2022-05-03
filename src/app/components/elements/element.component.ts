import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-element',
  template: `
    <div class="element">
      <mat-icon *ngIf="icon" aria-hidden="false" aria-label="icon">{{
        icon
      }}</mat-icon>
      <h2 *ngIf="headingMain">{{ headingMain }}</h2>
      <h3 *ngIf="headingSub">{{ headingSub }}</h3>
      <img *ngIf="imgPath" [src]="imgPath" />
    </div>
  `,

  styles: [
    `
      @use '../../shared/styles/customvars' as *;

      .element {
        border-radius: 5px;
        box-shadow: 0px 5px 6px -3px rgb(0 0 0 / 20%),
          0px 9px 12px 1px rgb(0 0 0 / 14%), 0px 3px 16px 2px rgb(0 0 0 / 12%);
        background-color: $main_color;
        padding: 20px;
        margin: 15px;
        width: 250px;
        text-align: center;

        mat-icon {
          width: 40px;
          height: 40px;
          font-size: 40px;
          margin-bottom: 5px;
          border-radius: 100px;
          padding: 10px;
          background-color: $primary_marking_color_dark;
        }

        h2 {
          margin-bottom: 20px;
          font-family: 'Montserrat', sans-serif;
        }

        h3 {
          margin-bottom: 0px;
          line-height: 1.3;
        }

        img {
          max-width: 200px;
          max-height: 50px;
          border-radius: 5px;
          padding: 10px 20px;
          background-color: white;
        }
      }
    `,
  ],
})
export class ElementComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Input() icon = '';
  @Input() headingMain = '';
  @Input() headingSub = '';
  @Input() imgPath = '';
}
