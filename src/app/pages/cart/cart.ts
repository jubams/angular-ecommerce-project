import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { LoginService } from '../../services/login.service';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

interface CartItemWithProduct extends CartItem {
  product: Product;
  total: number;
}

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {
  cartItems: CartItemWithProduct[] = [];
  isLoading = true;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    const cartItems = this.cartService.getCartItems();
    
    if (cartItems.length === 0) {
      this.isLoading = false;
      return;
    }

    this.productService.get().subscribe({
      next: (products) => {
        this.cartItems = cartItems.map(cartItem => {
          const product = products.find(p => p.id === cartItem.productId);
          return {
            ...cartItem,
            product: product!,
            total: product!.price * cartItem.quantity
          };
        }).filter(item => item.product); // Filter out items where product wasn't found
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }

  increaseQuantity(productId: number): void {
    this.cartService.addToCart(productId, 1);
    this.updateCartItemQuantity(productId);
  }

  decreaseQuantity(productId: number): void {
    const cartItem = this.cartItems.find(item => item.productId === productId);
    if (cartItem && cartItem.quantity > 1) {
      this.cartService.reduceCartItemQuantity(productId);
      this.updateCartItemQuantity(productId);
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
  }

  private updateCartItemQuantity(productId: number): void {
    const cartItem = this.cartItems.find(item => item.productId === productId);
    const serviceCartItem = this.cartService.getCartItems().find(item => item.productId === productId);
    
    if (cartItem && serviceCartItem) {
      cartItem.quantity = serviceCartItem.quantity;
      cartItem.total = cartItem.product.price * cartItem.quantity;
    }
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.total, 0);
  }

  getTax(): number {
    return this.getSubtotal() * 0.1; // 10% tax
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  isUserLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  proceedToCheckout(): void {
    if (this.isUserLoggedIn()) {
      // In a real app, this would navigate to checkout
      alert('Checkout functionality would be implemented here!');
    } else {
      this.router.navigate(['/login']);
    }
  }
}
