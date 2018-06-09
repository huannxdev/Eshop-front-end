import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[Password]',

  providers: [{provide: NG_VALIDATORS, useExisting: PasswordDirective, multi: true}]
})
export class PasswordDirective implements Validator{

  constructor() { }

  validate(c: FormControl): ValidationErrors {
    const password = String(c.value);
    const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}/.test(password);
    const message = {
      'password': {
        'message': 'Password has to at least 1 number, 1 letter and contain from 8 - 20 character.'
      }
    };
    return isValid ? null : message;
  }
}
