import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard  {

  private cartService = inject(CartService);

  constructor(private router: Router) {}

  @Input() products: Product[] = [];

  navigateToProduct(product: Product) {
    this.router.navigate(['/product', product.id]);
  }

  addToCard(productId : number){
    this.cartService.addToCart(productId, 1);
  }
}
