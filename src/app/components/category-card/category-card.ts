import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-card',
  standalone: false,
  templateUrl: './category-card.html',
  styleUrl: './category-card.scss'
})
export class CategoryCard {
  @Input() categories: Category[] = [];

  constructor(private router: Router) {}

  navigateToCategory(categoryName: string) {
    // Navigate to products page with category filter
    this.router.navigate(['/products'], {
      queryParams: { category: categoryName }
    });
  }
}
