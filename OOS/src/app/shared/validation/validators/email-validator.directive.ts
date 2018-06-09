import { Directive, ElementRef } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, FormControl, Validators, NG_VALIDATORS } from '@angular/forms';
import { isString } from 'util';

@Directive({
  selector: '[EmailValidator]',

  providers: [{provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})
export class EmailValidatorDirective implements Validator {

  validate(c: FormControl): ValidationErrors {
    const email = String(c.value);
    const isValid = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(email);
    
    const message = {
      'email': {
        'message': 'This is an invalid email.'
      }
    };
    return isValid ? null : message;
  }
}
