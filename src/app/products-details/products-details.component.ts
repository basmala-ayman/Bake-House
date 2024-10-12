import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetails } from '../product.service';  

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute, private productService: ProductDetails) {}

  ngOnInit(): void {
    // Get the product ID from the route parameter
    const productId = +this.route.snapshot.paramMap.get('id')!;
    // Fetch the product details using the product ID
    this.product = this.productService.getProduct(productId);
  }
}
