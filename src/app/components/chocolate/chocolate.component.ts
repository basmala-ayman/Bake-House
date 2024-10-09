import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../Service/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chocolate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chocolate.component.html',
  styleUrl: './chocolate.component.scss',
})
export class ChocolateComponent implements OnInit {
  chocolateProducts: Product[] = [];
  ngOnInit() {
    this.chocolateProducts = ProductService.getProducts().filter(
      (p) => p.category === 'chocolate'
    );
  }
  calcDiscount(price: number, discount: number): number {
    return price - price * (discount / 100);
  }
}
