import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalVariable } from 'src/globalVariable';
import { NetworkResponse } from '../model/networkresponse.model';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { CategoryService } from './category.service';
import { Collection, ColllectionsService } from './colllections.service';
import { DiscountService } from './discount.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  baseURL: string = GlobalVariable.baseAPIUrl;
  baseHomepageRoutesURL: string = this.baseURL + '/others/homepagedata';

  onInitExecute() {
    console.log('Global Init');

    this.authService.checkAuthStatusOnServer().subscribe(
      (response: any) => {
        console.log(response);

        if (response.statuscheck === true) {
          this.authService.isLoggedIn.next(true);
          this.authService.userId.next(response.userId);
          // alert(this.authService.isAuthenticated());
        }
      },
      (err) => {
        this.alertService.failureMessage(
          'Something went wrong',
          'Unexpected Error'
        );
      }
    );
  }

  getFeaturedProducts() {
    return this.http.get<NetworkResponse>(this.baseURL + '/products/featured');
  }

  getHomepageData() {
    return this.http.get<NetworkResponse>(this.baseHomepageRoutesURL);
  }

  showPopUp: Subject<string> = new Subject();
}
