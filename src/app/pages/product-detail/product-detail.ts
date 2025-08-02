import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

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
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ){}


  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.productService.getProductById(id).subscribe(product => {
          this.product = product;
        });
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
