import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) { }

  get(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('assets/data/products.json');
  }

  getProductByCategory(category: string): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`assets/data/products-${category}.json`);
  }

  getProductById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`assets/data/products/${productId}.json`);
  }
}
