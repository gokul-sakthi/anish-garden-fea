import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { GlobalVariable } from 'src/globalVariable';
import { NetworkResponse } from '../model/networkresponse.model';

export interface Collection {
  _id: string;
  name: string;
  description: string;
  products: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ColllectionsService {
  baseURL: string = GlobalVariable.baseAPIUrl + '/collections';

  constructor(private http: HttpClient) {}

  fetchAll() {
    return this.http.get<NetworkResponse>(this.baseURL);
  }

  fetchProductsFromCollection(id: string) {
    // this.fetchAll().subscribe((response) => console.log(response));
    let params: HttpParams = new HttpParams().append('id', id);
    return this.http.get<NetworkResponse>(this.baseURL + '/products/', {
      params: params,
    });
  }
}
