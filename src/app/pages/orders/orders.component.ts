import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NetworkResponse } from 'src/app/model/networkresponse.model';
import { AlertService } from 'src/app/services/alert.service';
import { OrdersService } from 'src/app/services/orders.service';
import { GlobalVariable } from 'src/globalVariable';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private ordersService: OrdersService
  ) {}

  ordersList: any[] = [];

  baseApiURL: string = GlobalVariable.baseAPIUrl;

  ngOnInit(): void {
    this.ordersService
      .fetchAllOrdersForUser()
      .subscribe((response: NetworkResponse) => {
        if (response.status === 'OK') {
          this.ordersList = response.payload;
        } else {
          this.alertService.failureMessage(
            'Failed to get orders',
            'Unknown Error'
          );
        }
      });
  }

  cancelOrder(id: string) {
    this.ordersService.cancelOrder(id, { status: 'CANCELLED' }).subscribe(
      (response: NetworkResponse) => {
        if (response.status === 'OK') {
          console.log(response.payload);
          console.log(id);

          this.ordersService
            .fetchAllOrdersForUser()
            .subscribe((response: NetworkResponse) => {
              if (response.status === 'OK') {
                this.ordersList = response.payload;
              } else {
                this.alertService.failureMessage(
                  'Failed to get orders',
                  'Unknown Error'
                );
              }
            });
          this.alertService.successMessage(
            'Order has been cancelled on your request',
            'Cancellation Successful'
          );
        }
      },
      (err) => {
        this.alertService.failureMessage(
          'Something went wrong',
          'Unknown error'
        );
      }
    );
  }
}
