import { Component, OnInit, style } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { CreateUserModel } from '../../models/user/create-user/create-user';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent implements OnInit {

  user = new CreateUserModel;
  public isDisabled:boolean;
  isExistEmail:any;
  isPasswordConfirm:boolean = true;
  userValidation:Object[];
  
  constructor(
    private accountService: AccountService, 
    private spinnerService:SpinnerService,
    private router:Router
  ) { }

  ngOnInit() {
    
  }

  add() {
    this.isDisabled = true;
    this.spinnerService.startLoadingSpinner();
    this.user.Gender = 0;
    this.user.Image = "http://farm9.staticflickr.com/8130/29541772703_6ed8b50c47_b.jpg";
    
    this.accountService.add(this.user)
      .subscribe(res => {
        this.spinnerService.turnOffSpinner();
        this.router.navigate(['/account/inform-create']);
      },
      (error) => {
        this.spinnerService.turnOffSpinner();

        this.userValidation = JSON.parse(error._body);
        //this.isInvalid = true;
      }
    )
  }

  checkEmail()
  {
    this.accountService.checkUserExist(this.user.Email).
      subscribe(email => {
        this.isExistEmail = true;
        console.log(this.isExistEmail);
      });
  }

  checkPassword()
  {
    if(this.user.ConfirmPassword != this.user.Password)
    {
      this.isDisabled = true;
      this.isPasswordConfirm = false;
    }else
    {
      this.isDisabled = false;
      this.isPasswordConfirm = true;
    }
  }

}

@Component({
  selector: 'app-create-success',
  template: '<div class="container align-self-center"><h3>You have successfully registered. Please wait for 5 seconds or click <a routerLink="/account/login" style="text-decoration: underline; color: #F8694A">Here</a> to proceed to Login page.</h3></div>'
})
export class InformCreateSucces implements OnInit {
  constructor( private router:Router ) { }
  ngOnInit() {
  }
}