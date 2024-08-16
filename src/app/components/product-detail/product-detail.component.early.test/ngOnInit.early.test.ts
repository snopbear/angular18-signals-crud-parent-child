
// Unit tests for: ngOnInit
import { IProduct } from '../../../model/porduct/product';


import { input, signal } from "@angular/core";
import { ProductDetailComponent } from '../product-detail.component';

describe('ProductDetailComponent.ngOnInit() ngOnInit method', () => {
  let component: ProductDetailComponent;

  beforeEach(() => {
    component = new ProductDetailComponent();
  });

  describe('ngOnInit', () => {
    // Test to ensure ngOnInit initializes the component correctly
    it('should initialize the component without errors', () => {
      expect(() => component.ngOnInit()).not.toThrow();
    });
  });

  describe('emitProductUpdate', () => {
    // Happy path test: Ensure productUpdated signal is emitted when product is not null
    it('should emit productUpdated signal when product is not null', () => {
      const mockProduct: IProduct = {
        id: 1,
        name: 'Test Product',
        price: 100,
        description: 'A test product',
        imageUrl: 'http://example.com/product.jpg',
      };

      component.product = input<IProduct | null>(() => mockProduct);
      component.productUpdated = signal<IProduct | null>(null);

      component.emitProductUpdate();

      expect(component.productUpdated()).toEqual(mockProduct);
    });

    // Edge case test: Ensure productUpdated signal is not emitted when product is null
    it('should not emit productUpdated signal when product is null', () => {
      component.product = input<IProduct | null>(() => null);
      component.productUpdated = signal<IProduct | null>(null);

      component.emitProductUpdate();

      expect(component.productUpdated()).toBeNull();
    });
  });
});

// End of unit tests for: ngOnInit
