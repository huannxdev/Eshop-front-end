import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { Currency } from '../models/configuration';

@Injectable()
export class MetaDataService {
  keyCurrency : string = "currency";
  constructor(private configurationService : ConfigurationService) { }
  setCurrency(){
    var currency : Currency;
    
    var data = JSON.parse(localStorage.getItem(this.keyCurrency));
    if (!data) 
    {data = [];
      this.configurationService.getCurrency().subscribe(metaData => {
        currency = metaData;
        data.splice(0, 0, currency);
        localStorage.setItem(this.keyCurrency, JSON.stringify(data));
      });
    }
    return;
  }
  getCurrency() : number{
    var data = JSON.parse(localStorage.getItem(this.keyCurrency));
    return data;
  }
}
