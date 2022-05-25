import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import {
  formAddressFields,
  formNameFields,
} from 'src/app/shared/utils/form-utils';

import { AuthService } from 'src/app/shared/services/auth.service';
import { CartItem } from 'src/app/shared/models/cart.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { MangaOrder } from 'src/app/shared/models/order.model';
import { OrderService } from 'src/app/shared/services/order.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    public authService: AuthService,
    private fb: FormBuilder,
    private snack: SnackbarService
  ) {}

  studentId = 0;
  userForm!: FormGroup;
  shoppingCartData: Observable<CartItem[]> | undefined = undefined;
  OrderTotal: Observable<number> | undefined = undefined;
  formFieldNames = formNameFields;
  formFieldAddress = formAddressFields;
  selectedIndex = 0;

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.initForm();
      this.shoppingCartData = this.cartService.getCart();
      this.OrderTotal = this.shoppingCartData?.pipe(
        map((item: CartItem[]) => item.map((item) => item.subtotal)),
        map((item) =>
          item.reduce((sum: number, current: number) => sum + current, 0)
        )
      );
    }
  }

  indexChange(event: any) {
    let index = this.selectedIndex;
    console.log('event index', event);
    console.log('selected index', this.selectedIndex);
    this.selectedIndex = index;
    return;
  }

  tabClick(event: any) {
    console.log(event, event.toElement);
  }

  initForm() {
    const { email, firstName, lastName, address } =
      this.authService.getStorageUserData() || {};
    const { streetName, streetNumber, country, plz, ort } = address || {};

    this.userForm = this.fb.group({
      email: [email, [Validators.email, Validators.required]],
      firstName: [firstName, Validators.required],
      lastName: [lastName, Validators.required],
      address: this.fb.group({
        streetName: [streetName, Validators.required],
        streetNumber: [streetNumber, Validators.required],
        country: [country, Validators.required],
        ort: [ort, Validators.required],
        plz: [plz, Validators.required],
      }),
    });
  }

  makeOrder() {
    this.orderService.makeOrder(this.userForm.value, this.studentId);
    this.router.navigateByUrl('orders');
    this.snack.openSnackBar('Your order has been placed');
  }
}
