import { Component, OnInit } from '@angular/core';

import { MangaOrder } from 'src/app/shared/models/order.model';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(private orderService: OrderService) {}

  $UserOrders!: Observable<MangaOrder[]> | undefined;

  ngOnInit(): void {
    this.$UserOrders = this.orderService.getAllUserOrders();
    this.$UserOrders?.subscribe((orders) =>
      console.log(typeof orders[0].orderDate)
    );
  }
}
