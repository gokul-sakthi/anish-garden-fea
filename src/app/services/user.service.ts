import { HttpClient, HttpParams } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalVariable } from 'src/globalVariable';
import { NetworkResponse } from '../model/networkresponse.model';

export interface ShoppingCartItem {
  productID: String;
  name: string;
  price: string;
  discountedPrice: string;
  quantity: number;
  stocks: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL: string = GlobalVariable.baseAPIUrl + '/users';

  // Wishlist ****************

  populatedWishList: Subject<string[]> = new Subject();

  constructor(private http: HttpClient) {}

  populateWishList(userId: string) {
    return this.http.get<NetworkResponse>(this.baseURL + '/wishlist', {
      params: new HttpParams().append('id', userId),
    });
  }

  updateWishList(userID: string, productId: string, operation: string = 'add') {
    let params = new HttpParams()
      .append('userid', userID)
      .append('id', productId)
      .append('operation', operation);
    return this.http.put<NetworkResponse>(this.baseURL + '/wishlist', null, {
      params: params,
    });
  }

  // Cart **************************
}
