import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductCategoryService } from 'src/app/product-categories/product-category.service';
import { ProductService } from '../product.service';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  selectedValue: string;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

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

  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError((err) => {
      //this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  colunasTabela: string[] = [
    'productName',
    'productCode',
    'category',
    'price',
    'actions',
  ];
  dataASource = this.products$;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {}

  ngOnInit(): void {}

  deleteProduct(elemento) {
    console.log(elemento);
  }

  openDetailsProduct(elemento){
    console.log(elemento);
  }

  onSelected(categoryId: string): void {
    // this.categorySelectedSubject.next(+categoryId);
    console.log(categoryId);
  }
}
