import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from './alert.service';

export interface CartItem {
  _id: string;
  name: string;
  price: string;
  discount: string;
  quantity: number;
  stock: number;
  imageURL: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private alertService: AlertService) {}

  cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(
    this.getItemsFromStorage()
  );

  getCartItemsValue() {
    return this.cartItems.getValue();
  }

  getItemsFromStorage() {
    let cartItemsFromLS = localStorage.getItem('cartItems');
    if (cartItemsFromLS !== null) {
      return JSON.parse(cartItemsFromLS);
    } else return [];
  }

  addItem(productItem: CartItem, showNotifForQuan: boolean = true) {
    let foundCartItem = this.getCartItemsValue().find(
      (item: CartItem) => item._id === productItem._id
    );
    if (foundCartItem) {
      foundCartItem.quantity += 1;
      this.cartItems.next(
        this.getCartItemsValue().filter((item: CartItem) => {
          return item._id === foundCartItem?._id ? foundCartItem : item;
        })
      );
    } else {
      productItem.quantity = 1;
      this.cartItems.next([...this.getCartItemsValue(), productItem]);
    }
    if (showNotifForQuan) {
      this.alertService.successMessage(
        'Product Added to Cart',
        productItem.name
      );
    }

    localStorage.setItem('cartItems', JSON.stringify(this.getCartItemsValue()));
  }

  subtractItem(productItem: CartItem) {
    if (productItem.quantity === 1) {
      this.removeItem(productItem);
    } else {
      productItem.quantity -= 1;
      this.cartItems.next(
        this.getCartItemsValue().filter((item: CartItem) => {
          return item._id === productItem?._id ? productItem : item;
        })
      );
    }

    localStorage.setItem('cartItems', JSON.stringify(this.getCartItemsValue()));
  }

  removeItem(productItem: CartItem) {
    this.cartItems.next(
      this.getCartItemsValue().filter((item: CartItem) => {
        return item._id !== productItem._id;
      })
    );
    localStorage.setItem('cartItems', JSON.stringify(this.getCartItemsValue()));
    this.alertService.successMessage(
      'Product removed from the cart',
      productItem.name
    );
  }
}
