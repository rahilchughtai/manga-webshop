import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'nav-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(public authService: AuthService, public router: Router) {}

  @Output() SideNavToggle = new EventEmitter();

  openSidenav() {
    console.log(this.router.url);
    this.SideNavToggle.emit();
  }
}
