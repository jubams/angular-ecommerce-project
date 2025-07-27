import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemCountSubject = new BehaviorSubject<number>(0);

  constructor() {}

  get cartItemCount$(): Observable<number> {
    return this.cartItemCountSubject.asObservable();
  }

  private updateCartItemCount(): void {
    const count = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.cartItemCountSubject.next(count);
  }

  getCartItems(): CartItem [] {
    return this.cartItems;
  }

  addToCart(productId: number, quantity: number): void {
    const existingItem = this.cartItems.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ productId, quantity });
    }

    console.log('Cart items:', this.cartItems);
    this.updateCartItemCount();
  }

  reduceCartItemQuantity(productId: number): void {
    const existingItem = this.cartItems.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity--;
    }
    this.updateCartItemCount();
  }


  getCartItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    this.updateCartItemCount();
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCartItemCount();
  }
}
