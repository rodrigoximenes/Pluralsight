import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, EMPTY, combineLatest, Subject } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { ProductCategoryService } from 'src/app/product-categories/product-category.service';
import { ProductService } from '../product.service';
import { ProductCategory } from 'src/app/product-categories/product-category';
import { Product } from '../product';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  filteredProducts: Subject<any>;
  _listFilter: string = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products$;
  }

  // performFilter(filterBy: string): any {
  //   filterBy = filterBy.toLocaleLowerCase();

  //   return this.products$.pipe(
  //     filter(
  //     prod =>
  //     prod.productName.toLocaleLowerCase().indexOf(filterBy) !== -1));
  // }

  // Action stream
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  private textTypedSubject = new Subject<string>();
  textTypedAction$ = this.textTypedSubject.asObservable();

  products$ = combineLatest([
    this.productService.productsWithCategory$,
    this.categorySelectedAction$,
    this.textTypedAction$
  ]).pipe(
    map(([products, selectedCategoryId, search]) => {
      products.filter((prod) =>
        selectedCategoryId ? prod.categoryId === selectedCategoryId : true
      ),
      products.filter((prod) => 
      search ? prod.productName.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1)
    }
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
