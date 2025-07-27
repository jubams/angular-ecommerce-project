import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail implements OnInit {

  private cartService = inject(CartService);
  quantity: number = 1;

  product : Product = {
    id : 0,
    name:'sd',
    description:'',
    price : 0,
    image: '',
    category:''
  }
  constructor(private route: ActivatedRoute){}


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.product = {
          id: +params['id'], // Convert string to number
          name: params['name'] || '',
          description: params['description'] || '',
          price: +params['price'] || 0, // Convert string to number
          image: params['image'] || '',
          category: params['category'] || ''
        };
      }
    });
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  onQuantityChange(event: any) {
    const value = parseInt(event.target.value);
    if (value && value > 0) {
      this.quantity = value;
    } else {
      this.quantity = 1;
      event.target.value = 1;
    }
  }

  addToCart(productId: number, quantity: number) {
    this.cartService.addToCart(productId, quantity);
  }
}
