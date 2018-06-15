import { Injectable } from '@angular/core';
import { AuthHttpService } from '../../auth/auth-http.service';
import { EmailModel } from '../models/email';
import { EmailSubscribeModel } from '../models/emailSubscribe';
import { AuthShoppingHttpService } from '../../auth/auth-http-shopping.service';

@Injectable()
export class EmailService {
  private API_PATH = 'https://eshop-springboot.herokuapp.com/api/contact/';

  constructor(private authHttpService: AuthShoppingHttpService) { }

  email:EmailModel;
  emailSub:EmailSubscribeModel;
 

  sentEmail(email){
    return this.authHttpService.post(this.API_PATH,email);
  }

  emailSubscribe(emailSub){
    return this.authHttpService.post(this.API_PATH+"emailSubsribe/",emailSub);
  }
}
