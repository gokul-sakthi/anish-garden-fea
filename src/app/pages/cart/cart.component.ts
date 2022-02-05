import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NetworkResponse } from 'src/app/model/networkresponse.model';
import { AlertService } from 'src/app/services/alert.service';
import { CartItem, CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.shoppingListSubscr = this.cartService.cartItems.subscribe(
      (response) => {
        this.shoppingCartList = response;
      }
    );
  }

  shoppingListSubscr!: Subscription;
  shoppingCartList: any[] = [];
  modalStatus: boolean = false;

  addToCart(cartItem: CartItem) {
    this.cartService.addItem(cartItem, false);
  }

  subtractFromCart(cartIem: CartItem) {
    this.cartService.subtractItem(cartIem);
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeItem(cartItem);
  }

  confirmBuyOrder() {
    let orders: any[] = [];
    this.shoppingCartList.forEach((item) => {
      orders.push({
        productId: item._id,
        quantity: item.quantity,
      });
    });
    this.ordersService
      .createOrder({ orders: orders })
      .subscribe((response: NetworkResponse) => {
        if (response.status === 'OK') {
          this.alertService.successMessage(
            'Please check your orders in Orders Section',
            'Order Successful'
          );
          this.cartService.cartItems.next([]);
        } else {
          if (
            response.status === 'ERR' &&
            response.error.message === 'product out of stock'
          ) {
            this.alertService.warningMessage(
              response.payload.name,
              'Out of Stock'
            );
          }
        }
      });

    this.changeModalStatus(false);
  }

  changeModalStatus(status: boolean) {
    this.modalStatus = status;
  }

  ngOnDestroy() {
    this.shoppingListSubscr.unsubscribe();
  }
}
