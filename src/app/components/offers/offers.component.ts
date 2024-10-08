import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss',
})
export class OffersComponent implements OnInit {
  offerProducts: Product[] = [];
  ngOnInit() {
    this.offerProducts = ProductService.getProducts().filter(
      (p) => p.discount > 0
    );
  }

  calcDiscount(price: number, discount: number): number {
    return price - price * (discount / 100);
  }
}
