import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductDetailsComponent } from './product-details.component';
import { ProductService } from '../product.service';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let mockProductService;
  let mockActivatedRoute;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj(['getProduct']);
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '1' } }  // Simulating route with product ID '1'
    };

    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsComponent ],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;

    // Mock product data
    mockProductService.getProduct.and.returnValue({
      id: 1,
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      category: 'Test Category',
      stock: 10
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product details on init', () => {
    expect(component.product.name).toBe('Test Product');
    expect(mockProductDetails.getProduct).toHaveBeenCalledWith(1);  // Ensure correct ID is passed
  });
});
