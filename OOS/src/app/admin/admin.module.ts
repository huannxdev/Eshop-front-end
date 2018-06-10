import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng5BreadcrumbModule, BreadcrumbService} from 'long-ng5-breadcrumb';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Ng2SmartTableModule } from './ng2-smart-table';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyDatePickerModule } from 'mydatepicker';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';

import { AdminPageComponent } from './admin-page/admin-page.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { CategoryDetailComponent } from './categories/category-detail/category-detail.component';
import { EditOrderComponent } from './orders/edit-order/edit-order.component';
import { OverviewCategoriesComponent } from './categories/overview-categories/overview-categories.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { CreateCategoryComponent } from './categories/createcategory/createcategory.component';
import { EditCategoryComponent } from './categories/editcategory/editcategory.component'
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { OverviewUsersComponent } from './users/overview-users/overview-users.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';

//self-services
import { SpinnerService } from '../shared/services/spinner.service';
import { ProductService } from './services/Product.service';
import { OrdersService } from './services/orders.service';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ConfigurationService } from './services/configuration.service';
import { EditorComponent } from './editor/editor.component';
import { AccountService } from './services/account.service';
import {FeedbackService} from './services/feedback.service';

//self-directives
import { CustomerFeedbackComponent } from './customer-feedback/customer-feedback.component';
import { FeedbackDetailComponent } from './customer-feedback/feedback-detail/feedback-detail.component';
import { SocialNetworkComponent } from './social-network/social-network.component';
import { SocialNetworkService } from './services/socialnetwork.service';
import { SharedModule } from '../shared/modules/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    BrowserAnimationsModule,
    Ng5BreadcrumbModule,
    Ng2SmartTableModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    NgbModule,
    MyDatePickerModule,
    SharedModule,
    HttpClientModule
  ],
    
  declarations: [
    AdminPageComponent, 
    CreateCategoryComponent, 
    CategoriesComponent, 
    ProductsComponent, 
    OrdersComponent, 
    UsersComponent, 
    OrderDetailComponent,     
    ProductCreateComponent,
    ProductEditComponent,
    ProductDetailComponent,
    EditOrderComponent,
    OverviewCategoriesComponent,
    CategoryDetailComponent,
    UserCreateComponent, 
    UserEditComponent,
    UserDetailComponent,
    OverviewUsersComponent,
    EditCategoryComponent,
    AdminLoginComponent,
    AdminManagementComponent,
    CreateOrderComponent,
    ConfigurationComponent,
    EditorComponent,
    CustomerFeedbackComponent,
    FeedbackDetailComponent,
    SocialNetworkComponent
  ],
  entryComponents:[
    AdminLoginComponent
  ],
  providers: [
    ProductService,
    CategoryService, 
    UserService,
    OrdersService,
    SpinnerService,
    BreadcrumbService,
    ConfigurationService,
    AccountService,
    FeedbackService,
    SocialNetworkService
  ]
})
export class AdminModule { }
