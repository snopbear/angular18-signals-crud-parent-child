import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IProduct } from '../../model/porduct/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products'; // json-server URL

  // Signal to manage the products
  private productsSignal: WritableSignal<IProduct[]> = signal([]);

  constructor(private http: HttpClient) {}

  // Fetch all products from the API (Read operation)
  fetchProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl).pipe(
      tap((products) => {
        // Set the products in the signal
        this.productsSignal.set(products);
      })
    );
  }

  // Get the current products stored in the signal
  getProducts() {
    return this.productsSignal;
  }

  // Create (Add) a new product
  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.apiUrl, product).pipe(
      tap((newProduct) => {
        debugger
        // Update the signal with the newly added product
        this.productsSignal.update((products) => [...products, newProduct]);
      })
    );
  }

  // Update a product
  updateProduct(product: IProduct): Observable<IProduct> {
    const url = `${this.apiUrl}/${product.id}`;
    return this.http.put<IProduct>(url, product).pipe(
      tap((updatedProduct) => {
        debugger
        this.productsSignal.update((products) =>
          products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
      })
    );
  }

  // Delete a product
  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        // Update the signal to remove the deleted product
        this.productsSignal.update((products) =>
          products.filter((product) => product.id !== id)
        );
      })
    );
  }
}
