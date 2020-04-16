import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/auth.guard';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { SelectiveStrategy } from './selective-strategy.service';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: 'home', component: HomeComponent },
        { path: 'login', component: LoginComponent },
        {
          path: 'products',
          //canActivate: [AuthGuard],
          //canLoad: [AuthGuard],
          data: { preload: true },
          loadChildren: () =>
            import('./products/product.module').then((m) => m.ProductModule),
        },
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: '**', component: PageNotFoundComponent },
      ],
      { preloadingStrategy: SelectiveStrategy }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
