import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(
    private categoryService: CategoryService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  allCategoriesSubscription!: Subscription;

  navAuthStatus!: boolean;
  navAuthStatusSubscr!: Subscription;

  ngOnInit(): void {
    this.allCategoriesSubscription = this.categoryService
      .getCategoryValues()
      .subscribe((response) => {
        this.allCategories = response;
      });

    this.navAuthStatusSubscr = this.authService.isLoggedIn.subscribe(
      (response) => {
        this.navAuthStatus = response;
      }
    );
  }

  allCategories: any[] = [];

  navigationItems: any[] = [
    {
      name: 'Shop',
      path: '/shop',
    },
    {
      name: 'Picks',
      path: '/picks',
    },
    {
      name: 'Discounts',
      path: '/discounts',
    },
    {
      name: 'Contact',
      path: '/contact',
    },
  ];

  showDropdown: boolean = false;

  logoutUser() {
    this.authService.logoutUser().subscribe((response: any) => {
      this.authService.isLoggedIn.next(false);
      this.router.navigateByUrl('/');
      this.alertService.successMessage('User logged out', 'Logout Successful');
    });
  }

  ngOnDestroy() {
    this.allCategoriesSubscription.unsubscribe();
    this.navAuthStatusSubscr.unsubscribe();
  }
}
