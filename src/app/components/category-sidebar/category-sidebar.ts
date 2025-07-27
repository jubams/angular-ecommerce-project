import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-sidebar',
  standalone: false,
  templateUrl: './category-sidebar.html',
  styleUrl: './category-sidebar.scss',
})
export class CategorySidebar  {
  categories: Category[] = [];

  @Input() selectedCategories: string[] = [];
  @Output() selectedCategoriesChange = new EventEmitter<string[]>();

  constructor(private categoryService: CategoryService) {
    this.categoryService.getCategories().subscribe((categories) => {
        this.categories = categories;
      }
    );
  }



  onCategoryChange(category: string, checked: boolean) {
    if (checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(
        (c) => c !== category
      );
    }
    this.selectedCategoriesChange.emit(this.selectedCategories);
  }
}
