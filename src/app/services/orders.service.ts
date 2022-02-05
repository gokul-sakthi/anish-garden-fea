import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalVariable } from 'src/globalVariable';
import { NetworkResponse } from '../model/networkresponse.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseApiUrl: string = GlobalVariable.baseAPIUrl + '/orders';

  ordersList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  getOrdersList() {
    return this.ordersList.getValue();
  }

  fetchAllOrdersForUser() {
    return this.http.get<NetworkResponse>(this.baseApiUrl + '/user');
  }

  createOrder(data: any) {
    console.log(data);
    return this.http.post<NetworkResponse>(this.baseApiUrl, data);
  }

  cancelOrder(id: string, data: any) {
    return this.http.put<NetworkResponse>(this.baseApiUrl + '/update', data, {
      params: new HttpParams().append('id', id),
    });
  }
}
