import { Component, OnInit } from '@angular/core';
import { combineLatest, BehaviorSubject, EMPTY } from 'rxjs';
import { ProductCategoryService } from 'src/app/product-categories/product-category.service';
import { ProductService } from '../product.service';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  products$ = combineLatest([
    this.productService.productsWithAdd$,
    this.categorySelectedAction$,
  ]).pipe(
    map(([products, selectedCategoryId]) =>
      products.filter((product) =>
        selectedCategoryId ? product.categoryId === selectedCategoryId : true
      )
    ),
    catchError((err) => {
      // this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );
  
  colunasTabela: string[] = ['productName', 'productCode', 'category', 'price'];
  dataASource = this.products$;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {}

  ngOnInit(): void {
  }
}
