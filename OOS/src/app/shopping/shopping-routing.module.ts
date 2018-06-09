import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { HomePageComponent } from './home-page/home-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCartComponent } from './cart/shopping-cart/shopping-cart.component';
import { OrderComponent } from './order/order.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { PaymentComponent } from './cart/payment/payment.component';
import { ThankyouComponent } from './cart/thankyou/thankyou.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { CategoryDetailComponent } from '../admin/categories/category-detail/category-detail.component';
import { ContactComponent } from './contact/contact.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { SearchComponent } from './search/search.component'
import { PaypalComponent } from './cart/paypal/paypal.component';
import { ShippingReturnComponent } from './shipping-return/shipping-return.component';
import { ShippingGuideComponent } from './shipping-guide/shipping-guide.component';
import { FaqComponent } from './faq/faq.component';
import { CartOverviewComponent } from './cart/cart-overview/cart-overview.component';
import { CreateAccountComponent, InformCreateSucces } from './account/create-account/create-account.component';
import { LoginAccountComponent } from './account/login-account/login-account.component';
import { ProfileAccountComponent } from './account/profile-account/profile-account.component';
import { OrderHistoryComponent } from './account/order-history/order-history.component';
import { OrderHistoryDetailComponent } from './account/order-history/order-history-detail/order-history-detail.component';
import { OrderDetailsComponent } from './order-details/order-details.component';



const shoppingRoutes: Routes = [
  {
    path: '',
    component: ShoppingComponent,
    children: [
      { path: 'paypal', component: PaypalComponent },
      { path: '', component: HomePageComponent, pathMatch: 'full' },
      {
        path: 'cart',
        component: CartOverviewComponent,
        data: { step: 5 },
        children: [
          { path: '', component: ShoppingCartComponent, data: { step: 1 } },
          { path: 'payment', component: PaymentComponent, data: { step: 2 } },
          { path: 'thankyou', component: ThankyouComponent, data: { step: 3 } },
        ]
      },
      {
        path: 'category',
        children: [
          { path: ':id', component: CategoryDetailsComponent }
        ]
      },
      {
        path: 'product',
        children: [
          { path: ':id', component: ProductDetailComponent },
        ]
      },
      {
        path: 'contact',
        children: [
          { path: '', component: ContactComponent },
        ]
      },
      { path: 'search', component: SearchComponent },
      { path: 'shipping-return', component: ShippingReturnComponent },
      { path: 'shipping-guide', component: ShippingGuideComponent },
      { path: 'faq', component: FaqComponent },
      {
        path: 'account',
        children: [
          { path: 'profile', component: ProfileAccountComponent },
          { path: 'register', component: CreateAccountComponent },
          { path: 'login', component: LoginAccountComponent },
          { path: 'order-history', component: OrderHistoryComponent },
          { path: 'order-history/:id', component: OrderHistoryDetailComponent },
          { path: 'inform-create', component: InformCreateSucces }
        ]
      },
      {path: 'order-details/:id', component: OrderDetailsComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(shoppingRoutes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
