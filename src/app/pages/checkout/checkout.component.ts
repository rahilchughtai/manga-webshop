import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/shared/services/cart.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  selectedIndex=0;

  makeOrder() {
    this.orderService.makeOrder();
    console.log('Making order!');
    this.router.navigateByUrl('orders');
  }
}
