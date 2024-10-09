import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cake',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cake.component.html',
  styleUrl: './cake.component.scss',
})
export class CakeComponent implements OnInit {
  cakeProducts: Product[] = [];
  ngOnInit() {
    this.cakeProducts = ProductService.getProducts().filter(
      (p) => p.category == 'cake'
    );
  }

  calcDiscount(price: number, discount: number): number {
    return price - price * (discount / 100);
  }
}
