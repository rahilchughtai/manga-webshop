import { Component, OnChanges, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  constructor(public authService: AuthService) {}

  mangas: any[] | null = [];

  ngOnInit(): void {
    let favs = localStorage.getItem('favorites') || '';
    if (!favs) return;
    this.mangas = JSON.parse(favs);
  }
}
