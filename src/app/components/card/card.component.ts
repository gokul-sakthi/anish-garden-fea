import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NetworkResponse } from 'src/app/model/networkresponse.model';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { GlobalVariable } from 'src/globalVariable';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  constructor(
    private wishlistService: WishlistService,
    private alertService: AlertService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Product Data', this.productData._id);

    this.isWishListed = this.wishlistService.checkIfProductIsWishlisted(
      this.productData._id
    );
  }

  baseApiURL: string = GlobalVariable.baseAPIUrl;

  @Input()
  usageIn: string = '';

  @Input()
  productData: any = {
    _id: '',
    name: 'undefined name',
    price: 0,
  };

  isWishListed: boolean = false;

  computeDiscountedPrice() {
    return Math.floor(
      +this.productData.price -
        +this.productData.price * (+this.productData.discountedPrice / 100)
    );
  }

  navigateToProduct() {
    this.router.navigate(['/product'], {
      queryParams: { productId: this.productData._id },
    });
  }

  updateWishList() {
    this.wishlistService.updateWishlist(this.productData._id).subscribe(
      (response: NetworkResponse) => {
        if (response.status === 'OK') {
          this.wishlistService.wishListedProducts.next(
            response.payload.wishlist
          );
          this.isWishListed = this.wishlistService.checkIfProductIsWishlisted(
            this.productData._id
          );
          this.alertService.successMessage(
            this.isWishListed ? 'Added to Wishlist' : 'Removed from Wishlist',
            this.productData.name
          );
        } else {
          this.alertService.failureMessage(
            'Something went wrong',
            'Server Error'
          );
          // console.log(response);
        }
      },
      (err) => {
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

  addToCart(productData: any) {
    this.cartService.addItem(productData);
  }
}
