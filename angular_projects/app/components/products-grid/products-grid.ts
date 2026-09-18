import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products-grid',
  imports: [],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.css',
})
export class ProductsGrid {
  products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      imgUrl:
        'https://fastly.picsum.photos/id/842/200/200.jpg?hmac=RW9iEgAYLKwoinQWSz_zrZHyOwmVEgqvoZTPebkRGMM',
      price: 1200,
      quantity: 10,
      catId: 1,
    },
    {
      id: 2,
      name: 'Mouse',
      imgUrl: 'https://picsum.photos/200?random=2',
      price: 25,
      quantity: 0,
      catId: 1,
    },

    {
      id: 3,
      name: 'T-Shirt',
      imgUrl: 'https://picsum.photos/200?random=3',
      price: 30,
      quantity: 1,
      catId: 2,
    },
    {
      id: 4,
      name: 'Jeans',
      imgUrl: 'https://picsum.photos/200?random=4',
      price: 70,
      quantity: 25,
      catId: 2,
    },

    {
      id: 5,
      name: 'Coffee Mug',
      imgUrl: 'https://picsum.photos/200?random=5',
      price: 12,
      quantity: 0,
      catId: 3,
    },
    {
      id: 6,
      name: 'Notebook',
      imgUrl: 'https://picsum.photos/200?random=6',
      price: 8,
      quantity: 100,
      catId: 3,
    },
  ];
  categories: Category[] = [
    {
      id: 1,
      name: 'Electronics',
    },
    {
      id: 2,
      name: 'Clothing',
    },
    {
      id: 3,
      name: 'Stationery',
    },
  ];
}
