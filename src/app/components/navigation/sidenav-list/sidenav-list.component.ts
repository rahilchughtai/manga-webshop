import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'nav-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styles: [],
})
export class SidenavListComponent implements OnInit {
  constructor() {}

  @Output() closeSideNav = new EventEmitter();
  ngOnInit(): void {}

  links = [
    { routerLink: 'login', icon: 'input', title: 'Login/Register' },
    { routerLink: 'home', icon: 'home', title: 'Home' },
    { routerLink: 'search', icon: 'lense', title: 'Mangas' },
    { routerLink: 'favorites', icon: 'star', title: 'Favorites' },
    { routerLink: 'cart', icon: 'shopping_cart', title: 'Cart' },
  ];
  onToggleClose() {
    this.closeSideNav.emit();
  }
}
