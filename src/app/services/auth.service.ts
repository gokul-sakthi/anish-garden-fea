import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalVariable } from 'src/globalVariable';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  baseURL: string = GlobalVariable.baseAPIUrl + '/auth';
  userId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  registerUser(user: any) {
    delete user.confirmpassword;
    return this.http.post(this.baseURL + '/register', user);
  }

  loginUser(user: any) {
    return this.http.post(this.baseURL + '/login', user, {
      withCredentials: true,
    });
  }

  getLoginStatus() {
    return this.http.get(this.baseURL + '/status');
  }

  isAuthenticated() {
    return this.isLoggedIn.getValue();
  }

  getUserId() {
    return this.userId.getValue();
  }

  logoutUser() {
    return this.http.get(this.baseURL + '/logout');
  }

  checkAuthStatusOnServer() {
    return this.http.get(this.baseURL + '/status');
  }
}
