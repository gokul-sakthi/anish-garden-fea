import { Location } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NetworkResponse } from 'src/app/model/networkresponse.model';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { GlobalVariable } from 'src/globalVariable';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
    private wishlistService: WishlistService,
    private alertService: AlertService,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}

  productItem: any;
  selectedImage!: string;
  baseApiURL: string = GlobalVariable.baseAPIUrl;
  modalStatus: boolean = false;
  isWishListed: boolean = false;

  ngOnInit(): void {
    // alert(this.activatedRoute.snapshot.queryParams['productId']);
    this.http
      .get<NetworkResponse>(GlobalVariable.baseAPIUrl + '/products/one', {
        params: new HttpParams().append(
          'id',
          this.activatedRoute.snapshot.queryParams['productId']
        ),
      })
      .subscribe((response: NetworkResponse) => {
        if (response.status === 'OK') {
          if (response.payload) {
            this.productItem = response.payload;
            this.selectedImage = this.productItem.images[0].filename;
            console.log(this.selectedImage);

            this.isWishListed = this.wishlistService.checkIfProductIsWishlisted(
              this.productItem._id
            );
          }
        }
      });
  }

  updateWishList() {
    this.wishlistService.updateWishlist(this.productItem._id).subscribe(
      (response: NetworkResponse) => {
        if (response.status === 'OK') {
          this.wishlistService.wishListedProducts.next(
            response.payload.wishlist
          );
          this.isWishListed = this.wishlistService.checkIfProductIsWishlisted(
            this.productItem._id
          );
          this.alertService.successMessage(
            this.isWishListed ? 'Added to Wishlist' : 'Removed from Wishlist',
            this.productItem.name
          );
        } else {
          console.log(response.error);

          this.alertService.failureMessage(
            'Something went wrong',
            'Server Error'
          );
          // console.log(response);
        }
      },
      (err) => {
        console.log(err.message);

        if (err.err.message === 'User is not logged In') {
          this.alertService.warningMessage(
            'You need to be signed in to do this',
            'Please Login'
          );
        } else {
          this.alertService.failureMessage(
            'Something went wrong',
            'Server Error'
          );
        }

        // console.log('[Card Wishlist button][Observable] error', err);
      }
    );
  }

  goBack() {
    this.location.back();
  }

  changeModalStatus(status: boolean) {
    this.modalStatus = status;
  }

  addToCart() {
    this.cartService.addItem(this.productItem);
  }

  confirmBuyOrder() {
    let orders = [];
    orders.push({
      productId: this.productItem._id,
      quantity: 1,
    });

    this.ordersService
      .createOrder({ orders: orders })
      .subscribe((response: NetworkResponse) => {
        if (response.status === 'OK') {
          this.alertService.successMessage(
            'Please check your orders in Orders Section',
            'Order Successful'
          );
        } else {
          if (
            response.status === 'ERR' &&
            response.error.message === 'product out of stock'
          ) {
            this.alertService.warningMessage(
              'Cannot Place the order',
              'Out of Stock'
            );
          }
        }
        this.changeModalStatus(false);
      });
  }
}
