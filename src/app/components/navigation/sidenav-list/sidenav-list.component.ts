import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'nav-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  constructor(public authService: AuthService) {}

  @Output() closeSideNav = new EventEmitter();
  ngOnInit(): void {}

  links = [
    { routerLink: 'home', icon: 'home', title: 'Home' },
    { routerLink: 'profile', icon: 'account_circle', title: 'Profil' },
    { routerLink: 'search', icon: 'auto_stories', title: 'Mangas' },
    { routerLink: 'favorites', icon: 'favorite', title: 'Favoriten' },
    { routerLink: 'cart', icon: 'shopping_cart', title: 'Warenkorb' },
  ];
  onToggleClose() {
    this.closeSideNav.emit();
  }
}
