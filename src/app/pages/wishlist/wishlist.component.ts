import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NetworkResponse } from 'src/app/model/networkresponse.model';
import { AlertService } from 'src/app/services/alert.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  constructor(
    private wishlistService: WishlistService,
    private alertService: AlertService
  ) {}

  wishlistSubscription!: Subscription;
  getWishListSubcription!: Subscription;

  ngOnInit(): void {
    this.wishlistSubscription =
      this.wishlistService.wishListedProducts.subscribe((products: any[]) => {
        this.wishListedProducts = products;
      });

    this.getWishListSubcription = this.wishlistService
      .getWishlistedProducts()
      .subscribe(
        (response: NetworkResponse) => {
          if (response.status === 'OK') {
            this.wishlistService.wishListedProducts.next(
              response.payload.wishlist
            );
          } else
            this.alertService.failureMessage(
              'Something went wrong',
              'Unexpected Error'
            );
          console.log(response);
        },
        (err) => {
          this.alertService.failureMessage(err.message, 'Unexpected Error');
        }
      );
  }

  wishListedProducts: any[] = [];

  ngOnDestroy() {
    this.getWishListSubcription.unsubscribe();
    this.wishlistSubscription.unsubscribe();
  }
}
