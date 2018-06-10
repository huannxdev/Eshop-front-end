import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../shared/services/spinner.service';
import { LoginAccountModel } from '../models/loginAccount';
import { AccountService } from '../services/account.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { UserModel } from '../models/user';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  remember: boolean = false;
  currentUser = new Subject<UserModel>();
  user: UserModel = new UserModel();

  constructor(
    private router: Router,
    private spinnerService: SpinnerService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }

  login() {
    this.spinnerService.startLoadingSpinner();

    let login = new LoginAccountModel();
    login.UserName = this.email;
    login.Password = this.password;

    this.accountService.loginAccount(login).subscribe((data: any) => {
      this.spinnerService.turnOffSpinner();
      if (data) {
        localStorage.setItem('token', 'Bearer ' + data._body.toString());
        let token = jwt_decode(localStorage.getItem("token"));
        this.user.UserName = token.sub;
        sessionStorage.setItem('user', JSON.stringify(this.user));
        this.accountService.setUserSession();
        this.router.navigate(['./admin/manager'])
      }
    },
      (error: any) => {
        alert('Your username or password is incorrect')
      }
    );
  }
}
