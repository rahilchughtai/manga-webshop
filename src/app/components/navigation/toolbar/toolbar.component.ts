import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { CartService } from 'src/app/shared/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'nav-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(private cartService: CartService) {}

  cartItemCount!: Observable<number>;



  ngOnInit(): void {
    this.cartItemCount = this.cartService.getCartCount();
  }


  @Output() SideNavToggle = new EventEmitter();
  openSidenav() {
    this.SideNavToggle.emit();
  }
}
