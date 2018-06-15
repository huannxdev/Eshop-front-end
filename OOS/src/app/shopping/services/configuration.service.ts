import { Injectable } from '@angular/core';
import { AuthHttpService } from '../../auth/auth-http.service';
import { Observable } from 'rxjs/Observable';
import { ConfigurationModel } from '../models/configuration';
import { AuthShoppingHttpService } from '../../auth/auth-http-shopping.service';

@Injectable()
export class ConfigurationService {
  private API_PATH = 'https://eshop-springboot.herokuapp.com/api/Configuration/';

  constructor(private authHttpService: AuthShoppingHttpService) { }
  get(): Observable<ConfigurationModel> {
    return this.authHttpService.get(this.API_PATH)
      .map(res => res.json());
  }

  add(task: ConfigurationModel): Observable<any> {
    return this.authHttpService.post(this.API_PATH, task);
  }

  edit(task: ConfigurationModel): Observable<any> {
    return this.authHttpService.put(this.API_PATH + "1", task);
  }
  getCurrency(){
    return this.authHttpService.get(this.API_PATH+ "metaData").map(res => res.json());
  }
}
