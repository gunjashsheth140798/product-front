import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { LoginComponent } from './login/login.component';
import { AuthguardGuard } from './authguard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    component: HeaderComponent,
    children: [
      { path: '', component: ProductsComponent, canActivate: [AuthguardGuard] },
    ],
  },
  {
    path: 'product-details/:id',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: ProductDetailsComponent,
        canActivate: [AuthguardGuard],
      },
    ],
  },
  {
    path: 'addproduct',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: AddProductsComponent,
        canActivate: [AuthguardGuard],
      },
    ],
  },
  {
    path: 'editproduct/:id',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: AddProductsComponent,
        canActivate: [AuthguardGuard],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
];
// canActivate: [AuthGuard]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
