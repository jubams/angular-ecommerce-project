import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Cart } from './pages/cart/cart';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Login } from './pages/login/login';
const routes: Routes = [
  {path: 'home', component: Home},
  {path: 'products', component: Products},
  {path: 'cart', component: Cart},
  {path: 'login', component: Login},
  {path: 'product-detail', component: ProductDetail},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
