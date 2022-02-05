import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { NetworkResponse } from 'src/app/model/networkresponse.model';
import { AlertService } from 'src/app/services/alert.service';
import { DiscountService } from 'src/app/services/discount.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss'],
})
export class DiscountsComponent implements OnInit {
  constructor(
    private discountService: DiscountService,
    private alertSerivce: AlertService
  ) {}

  ngOnInit(): void {
    this.discountService.getAllDataExpanded().subscribe(
      (response: NetworkResponse) => {
        if (response.status === 'OK') {
          this.discountList = response.payload;
        } else {
          this.alertSerivce.failureMessage(
            'something went wrong',
            'UnExpected Error'
          );
        }
      },
      (err) => {
        this.alertSerivce.failureMessage(
          'something went wrong',
          'UnExpected Error'
        );
      }
    );
  }

  discountList: any[] = [];
}
