import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () =>
      import('./components/product-inline/product-inline.component').then(
        (x) => x.ProductInlineComponent
      ),
  },

  //   { path: '**', component: NotFoundComponent },
];
