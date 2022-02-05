import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private location: Location
  ) {}

  canActivate(
    activatedRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('Auth Guard');
    

    if (this.authService.isAuthenticated() === true) {
      if (activatedRoute.url[0].path === 'authentication') {
        this.location.back();
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/authentication']);
      return false;
    }
  }
}
