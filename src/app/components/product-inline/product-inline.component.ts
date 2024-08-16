import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from '../../service/product/product.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { NgIf, NgFor } from '@angular/common';
import { IProduct } from '../../model/porduct/product';

@Component({
  selector: 'app-product-inline',
  templateUrl: './product-inline.component.html',
  styleUrls: ['./product-inline.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, ProductDetailComponent],
})
export class ProductInlineComponent implements OnInit, OnDestroy {
  products: WritableSignal<IProduct[]> = this.productService.getProducts(); // Signal to store products
  selectedProduct: WritableSignal<IProduct | null> = signal(null);

  newProduct: IProduct = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
  };
  editIndex: number | null = null;

  private destroy$ = new Subject<void>();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Fetch products on component initialization
    this.productService
      .fetchProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  // Add or update a product
  addOrUpdateProduct() {
    if (this.editIndex === null) {
      // Add new product
      this.productService
        .addProduct(this.newProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.resetForm();
        });
    } else {
      // Update existing product
      this.productService
        .updateProduct(this.newProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.editIndex = null;
          this.resetForm();
        });
    }
  }

  // Edit a product
  editProduct(product: IProduct) {
    this.newProduct = { ...product };
    this.editIndex = product.id;
  }

  // Delete a product
  deleteProduct(id: number) {
    this.productService
      .deleteProduct(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  // Reset form
  resetForm() {
    this.newProduct = {
      id: 0,
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
    };
    this.editIndex = null;
  }

  // View product details
  viewProductDetails(product: IProduct) {
    this.selectedProduct.set(product);
  }

  // Handle the productUpdated signal emitted from the child component
  handleProductUpdate(updatedProduct: IProduct | null) {
    debugger
    if (updatedProduct) {
      // Optionally, you could handle the updated product (e.g., synchronize with the server)
      console.log('Product updated:', updatedProduct);
      // If needed, update the product list
      const currentProducts = this.products();
      const updatedProducts = currentProducts.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      this.products.set(updatedProducts);
    }
  }

  // Lifecycle hook to clean up and unsubscribe from observables
  ngOnDestroy() {
    // Emit a value to complete all the observables
    this.destroy$.next();
    // Complete the subject itself
    this.destroy$.complete();
  }
}
