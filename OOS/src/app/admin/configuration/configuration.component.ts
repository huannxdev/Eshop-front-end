import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
import { ConfigurationModel, Currency } from '../models/configuration';
import { SpinnerService } from '../../shared/services/spinner.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  configuration = new ConfigurationModel();
  Currency = Currency;
  currency: string[];
  checkUnique: boolean = false;
  constructor(private configService: ConfigurationService, private spinnerService: SpinnerService) {
  }

  ngOnInit() {
    this.get();
    this.currency = Object.keys(Currency).filter(Number);
  }

  get() {
    this.spinnerService.startLoadingSpinner();
    this.configService.get().subscribe(data => {
      this.configuration = data;
      this.spinnerService.turnOffSpinner();
    });
  }

  delete(i) {
    this.configuration.Carousel.splice(i, 1);
  }

  add() {
    if (this.configuration.Carousel[0] !== "")
      this.configuration.Carousel.splice(0, 0, "");
  }

  save() {
    this.spinnerService.startLoadingSpinner();
    if (this.configuration.Carousel[0] === "")
      this.configuration.Carousel.splice(0, 1);
    this.configService.edit(this.configuration).subscribe(res => {
      this.spinnerService.turnOffSpinner();
    });
  }
}
