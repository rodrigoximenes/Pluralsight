import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CustomerData } from './customers/customer-data';
import { ProductCategoryData } from './product-categories/product-category-data';
import { ProductData } from './products/product-data';
import { SupplierData } from './suppliers/supplier-data';

export class AppData implements InMemoryDbService {
  createDb() {
    const products = ProductData.products;
    const productCategories = ProductCategoryData.categories;
    const suppliers = SupplierData.suppliers;
    const customers = CustomerData.customers;
    return {products, productCategories, suppliers , customers};
  }
}
