import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-wrapper',
  template: `
    <style>
      h1 {
        font-size: 3rem;
      }
      .content {
        display: flex;
        margin: 10px auto 32px;
        padding: 0 16px;
        max-width: 960px;
        flex-direction: column;
        align-items: center;
      }
    </style>

    <div class="content">
      <ng-content></ng-content>
    </div>
  `,
  styles: [],
})
export class WrapperComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
