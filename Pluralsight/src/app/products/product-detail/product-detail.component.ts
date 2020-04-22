import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { takeWhile, tap } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnDestroy {
  produtoSelecionado: Product;
  id: number;
  componenteAtivo: boolean;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      this.id = +params.get('id'),
      console.log(this.id)
    });

    this.productService
      .getProduct(this.id)
      .pipe(
        takeWhile(() => this.componenteAtivo),
        tap((prod) => console.log(prod)))
      .subscribe((produto) => (this.produtoSelecionado = produto));
  }

  ngOnDestroy(): void {
    this.componenteAtivo = false;
  }
}
