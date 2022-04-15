import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'nav-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styles: [],
})
export class SidenavListComponent implements OnInit {
  constructor(public authService: AuthService) {}

  @Output() closeSideNav = new EventEmitter();
  ngOnInit(): void {}

  links = [
    { routerLink: 'home', icon: 'home', title: 'Home' },
    { routerLink: 'search', icon: 'auto_stories', title: 'Mangas' },
    { routerLink: 'favorites', icon: 'star', title: 'Favorites' },
    { routerLink: 'cart', icon: 'shopping_cart', title: 'Cart' },
  ];
  onToggleClose() {
    this.closeSideNav.emit();
  }
}
