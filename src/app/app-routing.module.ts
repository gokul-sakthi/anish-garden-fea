import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PicksComponent } from './pages/picks/picks.component';
import { ProductComponent } from './pages/product/product.component';
import { ShopComponent } from './pages/shop/shop.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { AuthGuard } from './services/guards/auth-guard.service';

const routes: Routes = [
  { path: 'picks', component: PicksComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'discounts', component: DiscountsComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'product', component: ProductComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
