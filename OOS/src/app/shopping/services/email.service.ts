import { Injectable } from '@angular/core';
import { AuthHttpService } from '../../auth/auth-http.service';
import { EmailModel } from '../models/email';
import { EmailSubscribeModel } from '../models/emailSubscribe';

@Injectable()
export class EmailService {
  private API_PATH = 'http://fbinterns.azurewebsites.net/api/contact/';

  constructor(private authHttpService: AuthHttpService) { }

  email:EmailModel;
  emailSub:EmailSubscribeModel;
 

  sentEmail(email){
    return this.authHttpService.post(this.API_PATH,email);
  }

  emailSubscribe(emailSub){
    return this.authHttpService.post(this.API_PATH+"emailSubsribe/",emailSub);
  }
}
