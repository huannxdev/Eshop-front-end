import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AdminModule } from './admin/admin.module';
import { ShoppingModule } from './shopping/shopping.module';
import { AppRoutingModule } from './app-routing.module';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng5BreadcrumbModule, BreadcrumbService} from 'long-ng5-breadcrumb';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthHttpService } from './auth/auth-http.service'

import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './not-found.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NouisliderModule } from 'ng2-nouislider';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MyToastModule } from './shared/my-toast.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AdminModule,
    ShoppingModule,
    AppRoutingModule,    
    AngularFontAwesomeModule,
    NouisliderModule,
    Ng4LoadingSpinnerModule,
    MyToastModule,
    Ng5BreadcrumbModule.forRoot(),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [
    AuthService, 
    AuthGuardService, 
    AuthHttpService,
    BreadcrumbService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
