
// Unit tests for: ngOnInit






import { IProduct } from '../model/porduct/product';

import { AppComponent } from '../app.component';


class MockProductService {
  fetchProducts = jest.fn();
  getProducts = jest.fn().mockReturnValue([] as IProduct[]);
  addProduct = jest.fn();
  updateProduct = jest.fn();
  deleteProduct = jest.fn();
}

describe('AppComponent.ngOnInit() ngOnInit method', () => {
  let component: AppComponent;
  let mockProductService: MockProductService;

  beforeEach(() => {
    mockProductService = new MockProductService();
    component = new AppComponent(mockProductService as any);
  });

  describe('Happy Path', () => {
    it('should fetch products on initialization', () => {
      // Arrange
      const fetchProductsSpy = jest.spyOn(mockProductService, 'fetchProducts').mockReturnValue({
        subscribe: jest.fn(),
      } as any);

      // Act
      component.ngOnInit();

      // Assert
      expect(fetchProductsSpy).toHaveBeenCalled();
    });

    it('should initialize products from the service', () => {
      // Arrange
      const products: IProduct[] = [
        { id: 1, name: 'Product 1', price: 100, description: 'Description 1', imageUrl: 'url1' },
        { id: 2, name: 'Product 2', price: 200, description: 'Description 2', imageUrl: 'url2' },
      ];
      jest.spyOn(mockProductService, 'getProducts').mockReturnValue(products as any);

      // Act
      component.ngOnInit();

      // Assert
      expect(component.products).toEqual(products);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty product list', () => {
      // Arrange
      jest.spyOn(mockProductService, 'getProducts').mockReturnValue([] as any);

      // Act
      component.ngOnInit();

      // Assert
      expect(component.products).toEqual([]);
    });

    it('should handle fetchProducts error gracefully', () => {
      // Arrange
      const fetchProductsSpy = jest.spyOn(mockProductService, 'fetchProducts').mockReturnValue({
        subscribe: jest.fn((success, error) => error('Error fetching products')),
      } as any);

      // Act
      component.ngOnInit();

      // Assert
      expect(fetchProductsSpy).toHaveBeenCalled();
      // Additional assertions can be added here to check error handling logic
    });
  });
});

// End of unit tests for: ngOnInit
