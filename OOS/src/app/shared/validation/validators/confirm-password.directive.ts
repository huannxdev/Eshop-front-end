import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, FormControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[ConfirmPassword]',

  providers: [{provide: NG_VALIDATORS, useExisting: ConfirmPasswordDirective, multi: true}]
})
export class ConfirmPasswordDirective implements Validator{
  
  @Input() password: string;

  constructor() { }

  validate(c: FormControl): ValidationErrors {
    const confirmPassword = c.value;

    const message = {
      'confirmPassword': {
        'message': "Password and Confirm Password doesn't match."
      }
    };

    return this.password === confirmPassword ? null : message;
  }
}
