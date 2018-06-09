import { Injectable } from '@angular/core';
import { AuthHttpService } from '../../auth/auth-http.service';
import { Observable } from 'rxjs/Observable';
import { SocialNetworkModel } from '../models/SocialNetworkModel';

@Injectable()
export class SocialNetworkService {
  [x: string]: any;
  private API_PATH = 'https://eshop-springboot.herokuapp.com/api/SocialNetwork/';

  constructor(private authHttpService: AuthHttpService) { }
  get(): Observable<SocialNetworkModel> {
    return this.authHttpService.get(this.API_PATH+"a1")
      .map(res => res.json());
  }

  getfoter(): Observable<SocialNetworkModel> {
    return this.authHttpService.get(this.API_PATH+"a1")
      .map(res => res.json());
  }

  add(task: SocialNetworkModel): Observable<any> {
    return this.authHttpService.post(this.API_PATH, task);
  }

  edit(task: SocialNetworkModel): Observable<any> {
    return this.authHttpService.put(this.API_PATH + "a1", task);
  }
}
