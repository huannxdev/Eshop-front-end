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

  addPageSize() {
    
  }

  deletePageSize(i) {
   
  }

  minLimit(i: number) {
    // if (this.configuration.pageSize[i] < 1) {
    //   this.configuration.pageSize[i] = 1;
    // }
  }

  savePageSize() {
    // console.log(this.checkUniquePageSize());
    // console.log(this.configuration.pageSize);
    // if (this.checkUniquePageSize()) this.checkUnique = this.checkUniquePageSize();
    // else {
    //   this.spinnerService.startLoadingSpinner();
    //   if (this.configuration.pageSize[0] === 0) this.configuration.pageSize.splice(0, 1);
    //   this.configuration.pageSize.sort((a, b) => { return a - b });
    //   this.configService.edit(this.configuration).subscribe(res => {
    //     this.spinnerService.turnOffSpinner();
    //   });
    // }
  }

  trackById(id) {
    return id;
  }

  checkUniquePageSize(): boolean {
  //   var counts = [];
  //   for (var i = 0; i <= this.configuration.pageSize.length; i++) {
  //     if (counts[this.configuration.pageSize[i]] === undefined) {
  //       counts[this.configuration.pageSize[i]] = 1;
  //     } else {
  //       this.checkUnique = true;
  //       return true;
  //     }
  //   }
    return false;
  // }
}
}
