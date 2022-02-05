import { Component, OnInit } from '@angular/core';
import { NetworkResponse } from 'src/app/model/networkresponse.model';
import { AlertService } from 'src/app/services/alert.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(
    private globalService: GlobalService,
    private alertService: AlertService
  ) {}

  featuredProductsList: any[] = [];

  discountSectionText: any;

  ngOnInit(): void {
    this.globalService
      .getFeaturedProducts()
      .subscribe((response: NetworkResponse) => {
        if (response.status === 'OK') {
          this.featuredProductsList = response.payload;
        }
      });

    this.globalService.getHomepageData().subscribe(
      (response: NetworkResponse) => {
        this.discountSectionText =
          response.payload.homepage.discountSection.text;
      },
      (err) => {
        this.alertService.failureMessage(
          'Something went wrong',
          'Unexpected Error'
        );
      }
    );
  }
}
