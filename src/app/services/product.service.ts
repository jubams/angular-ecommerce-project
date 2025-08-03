import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('assets/data/products.json');
  }

  getProductByCategory(category: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `assets/data/products-${category}.json`
    );
  }

  getProductById(productId: number): Observable<Product> {
    return this.httpClient.get<Product[]>('assets/data/products.json').pipe(
      map((products) => {
        const product = products.find((p) => p.id === productId);
        if (!product) {
          throw new Error(`Product with id ${productId} not found`);
        }
        return product;
      })
    );
  }
}
