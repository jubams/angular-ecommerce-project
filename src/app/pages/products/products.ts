import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  products: Product[] = [];

  selectedCategory: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.get().subscribe((products) => {
      this.products = products;
    });

    this.route.queryParams.subscribe((params) => {
      if (params['category']) {
        this.selectedCategory = [params['category']];
      } else {
        this.selectedCategory = [];
      }
    });
  }

  get filteredProducts() {
    if (!this.selectedCategory || this.selectedCategory.length === 0) {
      return this.products;
    }

    return this.products.filter((product: Product) =>
      this.selectedCategory.includes(product.category)
    );
  }
}
