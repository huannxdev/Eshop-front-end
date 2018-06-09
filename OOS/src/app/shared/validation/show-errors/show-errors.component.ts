import { Component, OnInit, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'show-errors',
  templateUrl: './show-errors.component.html',
  styleUrls: ['./show-errors.component.css']
})
export class ShowErrorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private static readonly errorMessages = {
    'required': () => 'Please fill this field.',
    'minlength': (params) => 'The min number of characters is ' + params.requiredLength + '.',
    'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength + '.',
    'pattern': (params) => 'The required pattern is: ' + params.requiredPattern + '.',
    'email': (params) => params.message,
    'uniqueName': (params) => params.message,
    'password': (params) => params.message,
    'confirmPassword': (params) => params.message
  };

  @Input() private control: AbstractControlDirective | AbstractControl;

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return ShowErrorsComponent.errorMessages[type](params);
  }
}
