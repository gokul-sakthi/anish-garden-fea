import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/card/card.component';
import { CartComponent } from './pages/cart/cart.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { PicksComponent } from './pages/picks/picks.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { ShopComponent } from './pages/shop/shop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './pages/product/product.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { AlertComponent } from './components/alert/alert.component';
import { ModalComponent } from './components/modal/modal.component';
import { ToastrModule } from 'ngx-toastr';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AuthGuard } from './services/guards/auth-guard.service';
import { AuthService } from './services/auth.service';
import { MyInterceptor } from './interceptors/main-interceptor';
import { OrdersComponent } from './pages/orders/orders.component';
import { ContactComponent } from './pages/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    CardComponent,
    CartComponent,
    WishlistComponent,
    PicksComponent,
    DiscountsComponent,
    ShopComponent,
    ProductComponent,
    AuthenticationComponent,
    AlertComponent,
    ModalComponent,
    PaginationComponent,
    CarouselComponent,
    OrdersComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
