import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { Product } from '../../interfaces/product';
import { CartService } from '../../Service/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent implements OnInit {
  allProducts: Product[] = [];
  // added: boolean = true;
  // amount: number = 0;
  selectedProduct: Product | null = null;
  quantity: number = 1; // Default quantity
  ngOnInit() {
    this.allProducts = ProductService.getProducts();
  }

  calcDiscount(price: number, discount: number): number {
    return price - price * (discount / 100);
  }

  constructor(private cartService: CartService) {}

  showAdd: boolean = false;
  // Show quantity input when a product is selected
  selectProduct(product: Product) {
    this.selectedProduct = product;
    // this.showAdd = true;
    this.quantity = 1; // Reset quantity to 1 when a new product is selected
  }

  // Add product to cart with the specified quantity
  addToCart(product: Product, quantity: number) {
    this.cartService.addToCart({ ...product, quantity }); // Spread operator to add quantity to the product
    this.selectedProduct = null; // Reset the selected product after adding to cart
  }

  // Method to add product to the cart
  // addToCart(product: Product) {
  //   this.cartService.addToCart(product);
  //   alert(`${product.name} added to cart!`);
  // }
}
