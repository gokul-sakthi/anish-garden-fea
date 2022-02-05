import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { GlobalVariable } from 'src/globalVariable';
import { NetworkResponse } from '../model/networkresponse.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  baseURL: string = GlobalVariable.baseAPIUrl + '/users/wishlist';

  wishListedProducts: BehaviorSubject<[]> = new BehaviorSubject([]);

  checkIfProductIsWishlisted(id: string) {
    return this.wishListedProducts
      .getValue()
      .find((item: any) => item._id === id) !== undefined
      ? true
      : false;
  }

  getWishlistedProducts() {
    let params = new HttpParams().append('id', this.authService.getUserId());
    return this.http.get<NetworkResponse>(this.baseURL, { params: params });
  }

  updateWishlist(productID: string) {
    if (!this.authService.isAuthenticated()) {
      return new Observable((observer: Observer<any>) => {
        observer.error({ err: { message: 'User is not logged In' } });
      });
    }
    let userID = this.authService.getUserId();
    if (userID !== '' && productID !== '') {
      let operation = this.checkIfProductIsWishlisted(productID)
        ? 'delete'
        : 'add';

      let params = new HttpParams()
        .append('userid', userID)
        .append('id', productID)
        .append('operation', operation);
      return this.http.put(this.baseURL, null, { params: params });
    } else {
      return new Observable((observer: Observer<any>) => {
        observer.error({
          err: { message: 'Invalid Parameters' },
        });
      });
    }
  }
}
