import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'nav-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  @Output() SideNavToggle = new EventEmitter();

  openSidenav() {
    this.SideNavToggle.emit();
  }
}
