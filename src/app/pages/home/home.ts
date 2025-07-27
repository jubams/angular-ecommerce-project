import { Component } from '@angular/core';
import { Category } from '../../models/category.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  categories: Category[] = [{
      "id": 1,
      "name": "Smartphones",
      "image": "assets/images/1.jpg"
    },
    {
      "id": 2,
      "name": "Laptops",
      "image": "assets/images/1.jpg"
    },
    {
      "id": 3,
      "name": "Tablets",
      "image": "assets/images/1.jpg"
    },
    {
      "id": 4,
      "name": "Chargers",
      "image": "assets/images/1.jpg"
    },
    {
      "id": 5,
      "name": "Headphones",
      "image": "assets/images/1.jpg"
    },
    {
      "id": 6,
      "name": "Smartwatches",
      "image": "assets/images/1.jpg"
    },
    {
      "id": 7,
      "name": "Cables",
      "image": "assets/images/1.jpg"
    },
    {
      "id": 8,
      "name": "Accessories",
      "image": "assets/images/1.jpg"
    }];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  navigateToProducts() {
    this.router.navigate(['/products']);
  }
}
