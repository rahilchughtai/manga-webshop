import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
