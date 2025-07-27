import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit, OnDestroy {
  private loginService = inject(LoginService);
  private cartService = inject(CartService);
  private router = inject(Router);
  currentUser: User | null = null;
  cartItemCount$: Observable<number>;
  private subscription: Subscription = new Subscription();

  constructor() {
    this.cartItemCount$ = this.cartService.cartItemCount$;
  }

  ngOnInit() {
    this.subscription = this.loginService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  getCartItemCount(): number {
    return this.cartService.getCartItemCount();
  }
}
