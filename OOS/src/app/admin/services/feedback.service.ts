import { Injectable } from '@angular/core';
import { AuthHttpService } from '../../auth/auth-http.service'
import { Observable } from 'rxjs/Observable';

import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { FeedbackModel } from '../models/Feedback';

@Injectable()
export class FeedbackService {
  private API_PATH = 'https://eshop-springboot.herokuapp.com/api/Contact/Getfeedback';

  constructor(private authHttpService: AuthHttpService) { }
  
  get(): Observable<FeedbackModel[]> {    
    return this.authHttpService.get(this.API_PATH)
      .map(res => res.json() || []);
  }

  getFeedback(id): Observable<FeedbackModel> {
    return this.authHttpService.get(this.API_PATH + "/" + id)
    .map(res => res.json() || []);
  }

  getById(id): Observable<FeedbackModel> {
    return this.authHttpService.get(this.API_PATH + "/" + id)
      .map(res => res.json() || []);
  }

  delete(id): Observable<any>{
    var url: string = this.API_PATH + "/" + id;
    return this.authHttpService.delete(url)
  }

  feed:FeedbackModel; 
  getFeed(feedback:FeedbackModel)
  {
    return this.feed = feedback;
  }

  setFeed()
  {
    return this.feed;
  }

  putProduct(feed: any): Observable<any> {
    return this.authHttpService.put(this.API_PATH + "/" + feed.id, feed)
    .map(res => res.json() || []);;
  }
}
