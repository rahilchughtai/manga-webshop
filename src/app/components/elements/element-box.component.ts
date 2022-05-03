import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-element-box',
  template: `
    <div
      [class]="fullWidth ? 'elementBox fullWidth' : 'elementBox'"
      fxLayout="row wrap"
      fxLayoutAlign="center"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      @use '../../shared/styles/customvars' as *;
      .elementBox {


        border-radius: 5px;
        background-color: $main_color_dark;
        padding: 10px 20px;
        margin: auto;
        width: fit-content;
        max-width: 80%;
        @media (max-width: $mobile_width) {
          width: min-content;
        }

        &.fullWidth {
          @media (min-width: calc($mobile_width + 200px)) {
            max-width: 100%;
            width: 100%;
          }
        }
      }
    `,
  ],
})
export class ElementBoxComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Input() fullWidth?: boolean;
}
