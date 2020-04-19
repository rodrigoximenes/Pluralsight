import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY } from 'rxjs';
import { catchError, debounceTime, map } from 'rxjs/operators';
import { ProductCategory } from 'src/app/product-categories/product-category';
import { ProductCategoryService } from 'src/app/product-categories/product-category.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  textoDigitado: string;

  // Action stream
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  private textTypedSubject = new BehaviorSubject<string>('');
  textTypedAction$ = this.textTypedSubject.asObservable();

  productsWithSelection$ = combineLatest([
    this.productService.productsWithCategory$,
    this.categorySelectedAction$,
    this.textTypedAction$
  ]).pipe(
    map(([products, selectedCategoryId, search]) =>
      products.filter((prod) =>
        selectedCategoryId ? prod.categoryId === selectedCategoryId : true
      )
    )
  );

  productsWithSearch$ = combineLatest([
    this.productService.productsWithCategory$,
    this.textTypedAction$,
    this.categorySelectedAction$
  ]).pipe(
    debounceTime(1000),
    map(([products, search, selectedCategoryId]) =>
      products.filter(
        (prod) =>
          prod.productName
            .toLocaleLowerCase()
            .indexOf(search.toLocaleLowerCase()) !== -1
      )
    )
  );

  products$ = combineLatest([
    this.productsWithSelection$,
    this.textTypedAction$,
  ]).pipe(
    debounceTime(1000),
    map(([products, search]) =>
      products.filter(
        (prod) =>
          prod.productName
            .toLocaleLowerCase()
            .indexOf(search.toLocaleLowerCase()) !== -1
      )
    )
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

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {}

  ngOnInit(): void {}

  deleteProduct(elemento) {
    console.log(elemento);
  }

  openDetailsProduct(elemento) {
    console.log(elemento);
  }

  onSelected(categoryId: ProductCategory): void {
    this.categorySelectedSubject.next(+categoryId.id);
    console.log(categoryId.id);
  }

  onKeyUp(text: string): void {
    this.textTypedSubject.next(text);
    console.log(text);
  }
}
