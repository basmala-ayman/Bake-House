import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bakery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bakery.component.html',
  styleUrl: './bakery.component.scss',
})
export class BakeryComponent implements OnInit {
  bakeryProducts: Product[] = [];
  ngOnInit() {
    this.bakeryProducts = ProductService.getProducts().filter(
      (p) => p.category === 'bakery'
    );
  }
  calcDiscount(price: number, discount: number): number {
    return price - price * (discount / 100);
  }
}
