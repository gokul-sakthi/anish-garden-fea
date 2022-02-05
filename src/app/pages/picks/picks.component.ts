import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NetworkResponse } from 'src/app/model/networkresponse.model';
import { AlertService } from 'src/app/services/alert.service';
import {
  ColllectionsService,
  Collection,
} from 'src/app/services/colllections.service';

@Component({
  selector: 'app-picks',
  templateUrl: './picks.component.html',
  styleUrls: ['./picks.component.scss'],
})
export class PicksComponent implements OnInit {
  constructor(
    private cService: ColllectionsService,
    private alertService: AlertService
  ) {}

  collectionsList: Collection[] = [];
  productsFromSelectedCollections: any = [];
  selectedCollection: Collection = {
    name: '',
    _id: '',
    description: '',
    products: [],
  };

  ngOnInit(): void {
    this.cService.fetchAll().subscribe(
      (response: NetworkResponse) => {
        if (response.status === 'OK') {
          this.collectionsList = response.payload;
          if (this.collectionsList.length > 0)
            this.selectCollection(this.collectionsList[0]._id);
        } else
          this.alertService.failureMessage(
            'Something went wrong',
            'Unexpected error'
          );
      },
      (err) => {
        this.alertService.failureMessage(
          'Something went wrong',
          'Unexpected error'
        );
      }
    );
  }

  selectCollection(id: string) {
    this.cService.fetchProductsFromCollection(id).subscribe(
      (response: NetworkResponse) => {
        console.log(response.payload);

        if (response.status === 'OK') {
          this.selectedCollection = response.payload;
          this.productsFromSelectedCollections = response.payload.products;
        } else {
          this.alertService.failureMessage(
            'Something went wrong',
            'Unexecpted Error'
          );
        }
      },
      (err) => {
        this.alertService.failureMessage(
          'Something went wrong',
          'Unexecpted Error'
        );
      }
    );
  }
}
