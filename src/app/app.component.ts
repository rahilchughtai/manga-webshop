import { Component, EventEmitter, Output } from '@angular/core';

import { routes } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  routes = routes;
  title = 'MangaMiracle';
  constructor() {}
  cartNumber = 0;
}
