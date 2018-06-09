import { Component, OnInit } from '@angular/core';
import { EmailModel } from '../models/email';
import { EmailService } from '../services/email.service';
import { SpinnerService } from '../../shared/services/spinner.service';
import { ToasterService } from 'angular2-toaster/src/toaster.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public toEmail:string='';
  public subject:string='';
  public content:string='';

  constructor(private emailService: EmailService, private spinnerService: SpinnerService) { }

  ngOnInit() {
  }

  sentEmail(){
    let email = new EmailModel();
    email.ToEmail=this.toEmail;
    email.Subject=this.subject;
    email.Content=this.content;

    this.spinnerService.startLoadingSpinner();
    this.emailService.sentEmail(email).subscribe(data=>{
      this.spinnerService.turnOffSpinner();
     
    })
    
  }

}
