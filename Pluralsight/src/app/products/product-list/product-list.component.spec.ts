import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';
import { ProductCategoryService } from 'src/app/product-categories/product-category.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;

  beforeEach(() => {
    let produtoCategoriaService = new ProductCategoryService(new HttpClient(null));
    let produtoService = new ProductService(new HttpClient(null), produtoCategoriaService);
    component = new ProductListComponent(produtoService, produtoCategoriaService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
