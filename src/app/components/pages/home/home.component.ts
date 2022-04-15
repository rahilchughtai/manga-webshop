import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-home',
  template: `
    <h1 style="text-align: center;">
      Wilkommen zum MangaMiracle, dem besten Manga Webshop der Welt!
    </h1>
    <p>Finde über die Suche deine Liblingsmangas!</p>
    <a routerLink="/search">Hier gehts zur Suche</a>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
