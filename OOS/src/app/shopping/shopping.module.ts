import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCartComponent } from './cart/shopping-cart/shopping-cart.component';
import { OrderComponent } from './order/order.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { CategoryService } from './services/category.service';
import { WidgetProductsComponent } from './widget-products/widget-products.component';
import { WidgetBoxComponent } from './widget-box/widget-box.component';
import { CartService } from './services/cart.service';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { ProductService } from './services/product.service';
import { CartComponent } from './home-page/cart/cart.component';
import { PaymentComponent } from './cart/payment/payment.component';
import { ThankyouComponent } from './cart/thankyou/thankyou.component';
import { SearchComponent } from './search/search.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { ContactComponent } from './contact/contact.component';
import { EmailService } from './services/email.service';
import { PaypalComponent } from './cart/paypal/paypal.component';
import { CarouselComponent } from './home-page/carousel/carousel.component';
import { ShippingReturnComponent } from './shipping-return/shipping-return.component';
import { ShippingGuideComponent } from './shipping-guide/shipping-guide.component';
import { FaqComponent } from './faq/faq.component';
import { OrderService } from './services/order.service';
import { CreateAccountComponent, InformCreateSucces } from './account/create-account/create-account.component';
import { AccountService } from './services/account.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule } from 'angular2-toaster';
import { ConfigurationService } from './services/configuration.service';
import { CarouselProductComponent } from './product-detail/carousel-product/carousel-product.component';
import { LoginAccountComponent } from './account/login-account/login-account.component';
import { ProfileAccountComponent } from './account/profile-account/profile-account.component';
import { CartOverviewComponent } from './cart/cart-overview/cart-overview.component';
import { ProductBoxComponent } from './category-details/product-box/product-box.component';
import { MyDatePickerModule } from 'mydatepicker';
import { MetaDataService } from './services/meta-data.service';
import { OrderHistoryComponent } from './account/order-history/order-history.component';
import { OrderHistoryDetailComponent } from './account/order-history/order-history-detail/order-history-detail.component';
import { SharedModule } from '../shared/modules/shared.module';
import { WishlistAccountComponent } from './account/wishlist-account/wishlist-account.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NouisliderModule } from 'ng2-nouislider';

//self-services
//import { SpinnerService } from '../shared/services/spinner.service';

@NgModule({
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    MyDatePickerModule,
    SharedModule,
    NouisliderModule
  ],
  declarations: [
    HomePageComponent, 
    ProductDetailComponent, 
    ShoppingCartComponent, 
    OrderComponent, 
    OrderConfirmComponent, 
    ProductListComponent, 
    ShoppingComponent, 
    ListCategoriesComponent,
    WidgetProductsComponent,
    WidgetBoxComponent,
    SearchComponent,
    CartComponent,
    PaymentComponent,
    ThankyouComponent,
    CategoryDetailsComponent,
    ContactComponent,
    PaypalComponent,
    CarouselComponent,
    ShippingReturnComponent,
    ShippingGuideComponent,
    FaqComponent,
    CarouselProductComponent,
    CartOverviewComponent,
    CreateAccountComponent,
    CarouselProductComponent,
    LoginAccountComponent,
    ProfileAccountComponent,
    ProductBoxComponent,
    OrderHistoryComponent,
    OrderHistoryDetailComponent,
    WishlistAccountComponent,
    InformCreateSucces,
    OrderDetailsComponent
  ],
  providers: [
    CategoryService, 
    ProductService, 
    CartService,
    EmailService,
    OrderService,
    AccountService,
    ConfigurationService,
    MetaDataService,  
  ]
})
export class ShoppingModule { }
