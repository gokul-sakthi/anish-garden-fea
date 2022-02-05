import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from 'src/globalVariable';
import { NetworkResponse } from '../model/networkresponse.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseURL: string = GlobalVariable.baseAPIUrl + '/products';
  constructor(private http: HttpClient) {}

  getProductsByQuery(query: object) {
    return this.http.post<NetworkResponse>(this.baseURL + '/query', query);
  }
}
