import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagingComponent } from '../paging/paging.component';
import { PasswordDirective } from '../validation/validators/password.directive';
import { ConfirmPasswordDirective } from '../validation/validators/confirm-password.directive';
import { EmailValidatorDirective } from '../validation/validators/email-validator.directive';
import { UniqueNameValidatorDirective } from '../validation/validators/unique-name-validator.directive';
import { ShowErrorsComponent } from '../validation/show-errors/show-errors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule, 
    FormsModule, 
    ReactiveFormsModule
  ],

  exports: [
    PagingComponent,
    PasswordDirective,
    ConfirmPasswordDirective,
    EmailValidatorDirective,
    UniqueNameValidatorDirective,
    ShowErrorsComponent
  ],
  
  declarations: [
    PagingComponent,
    PasswordDirective,
    ConfirmPasswordDirective,
    EmailValidatorDirective,
    UniqueNameValidatorDirective,
    ShowErrorsComponent
  ]
})
export class SharedModule { }
