import { Component, OnInit } from '@angular/core';
import { NetworkResponse } from 'src/app/model/networkresponse.model';
import { AlertService } from 'src/app/services/alert.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  constructor(
    private globalService: GlobalService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.globalService.getHomepageData().subscribe(
      (response: NetworkResponse) => {
        this.carouselImages = response.payload.homepage.carousel.images;
      },
      (err) => {
        this.alertService.failureMessage(
          'Something went wrong',
          'Unexpected Error'
        );
      }
    );
  }

  carouselImages: any[] = [];
}
