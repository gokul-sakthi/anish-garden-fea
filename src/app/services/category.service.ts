import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalVariable } from 'src/globalVariable';
import { NetworkResponse } from '../model/networkresponse.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseURL: string = GlobalVariable.baseAPIUrl + '/category';
  allCategories: BehaviorSubject<[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  getCategoryValues() {
    return this.allCategories;
  }

  getAllCategories() {
    return this.http.get<NetworkResponse>(this.baseURL);
  }
}
