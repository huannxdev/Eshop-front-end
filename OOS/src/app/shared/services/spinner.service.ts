import { Injectable } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()
export class SpinnerService {

  name: string;

  constructor(
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  startLoadingSpinner() {
    this.spinnerService.show();
  }

  turnOffSpinner() {
    setTimeout(function () {
      this.spinnerService.hide();
    }.bind(this), 500
    );
  }
}
