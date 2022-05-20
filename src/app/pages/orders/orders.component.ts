import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(private orderService: OrderService) {}

  $UserOrders!: Observable<any[]>;

  ngOnInit(): void {
    this.$UserOrders = this.orderService.getAllUserOrders();
  }
}
