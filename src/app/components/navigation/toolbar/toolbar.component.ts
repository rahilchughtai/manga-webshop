import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'nav-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(public authService: AuthService) {}

  @Output() SideNavToggle = new EventEmitter();

  homePage = window.location.href.includes("/home");

  openSidenav() {
    this.SideNavToggle.emit();
  }
}
