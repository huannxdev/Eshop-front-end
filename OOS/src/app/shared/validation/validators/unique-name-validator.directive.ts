import { Directive, Input } from '@angular/core';
import { FormControl, ValidationErrors, NG_ASYNC_VALIDATORS, Validator } from '@angular/forms';
import { UserModel } from '../../../admin/models/user';

@Directive({
  selector: '[UniqueNameValidator]',

  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueNameValidatorDirective, multi: true}]
})
export class UniqueNameValidatorDirective implements Validator{

  @Input() listUsers: UserModel[];
  constructor() { }

  validate(c: FormControl): ValidationErrors {
    const message = {
      'uniqueName': {
        'message': 'The name had been used. Please change another name.'
      }
    };

    return new Promise(resolve => {
      setTimeout(() => {
        resolve( this.listUsers.find(x => x.UserName === c.value) ? message : null );
      }, 300);
    });
  }
}
