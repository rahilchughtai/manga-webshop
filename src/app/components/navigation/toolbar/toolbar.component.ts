import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'nav-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Output() SideNavToggle = new EventEmitter();
  openSidenav() {
    this.SideNavToggle.emit();
  }
}
