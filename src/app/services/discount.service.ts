import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalVariable } from 'src/globalVariable';
import { NetworkResponse } from '../model/networkresponse.model';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  constructor(private http: HttpClient) {}

  baseURL: string = GlobalVariable.baseAPIUrl + '/discounts';

  getAllDataExpanded() {
    let params = new HttpParams().append('populateproducts', 'true');
    return this.http.get<NetworkResponse>(this.baseURL, { params: params });
  }
}
