import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  static products: Product[] = [
    {
      name: 'Halawa Croissant',
      image: 'images/products/bakery-1.webp',
      price: 35.0,
      discount: 0,
      amount: 35,
      category: 'bakery',
      id: 'B1',
    },
    {
      name: 'Orange Cake Large',
      image: 'images/products/bakery-2.png',
      price: 155.0,
      discount: 0,
      amount: 35,
      category: 'bakery',
      id: 'B2',
    },
    {
      name: 'Mini Sandwich - 10 Pieces',
      image: 'images/products/bakery-3.png',
      price: 90.0,
      discount: 0,
      amount: 35,
      category: 'bakery',
      id: 'B3',
    },
    {
      name: 'Sesame Baton Sale',
      image: 'images/products/bakery-4.png',
      price: 190.0,
      discount: 0,
      amount: 35,
      category: 'bakery',
      id: 'B4',
    },
    {
      name: 'Sesame & Cumin Baton Sale',
      image: 'images/products/bakery-5.png',
      price: 190.0,
      discount: 0,
      amount: 35,
      category: 'bakery',
      id: 'B5',
    },
    {
      name: 'Cumin Baton Sale',
      image: 'images/products/bakery-6.png',
      price: 190.0,
      discount: 0,
      amount: 35,
      category: 'bakery',
      id: 'B6',
    },
    {
      name: 'White Cheese Paté',
      image: 'images/products/bakery-7.png',
      price: 33.0,
      discount: 0,
      amount: 33,
      category: 'bakery',
      id: 'B7',
    },
    {
      name: 'Roumi Cheese Paté',
      image: 'images/products/bakery-8.png',
      price: 35.0,
      discount: 0,
      amount: 33,
      category: 'bakery',
      id: 'B8',
    },
    {
      name: 'Boghasha',
      image: 'images/products/bakery-9.png',
      price: 36.0,
      discount: 0,
      amount: 33,
      category: 'bakery',
      id: 'B9',
    },
    {
      name: 'Italian Pizza',
      image: 'images/products/bakery-10.png',
      price: 36.0,
      discount: 0,
      amount: 33,
      category: 'bakery',
      id: 'B10',
    },
  ];

  constructor() {}

  // Method to get the list of users
  static getProducts(): Product[] {
    return this.products;
  }

}
