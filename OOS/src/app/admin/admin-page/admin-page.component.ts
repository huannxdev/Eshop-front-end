import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { UserModel } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']

})
export class AdminPageComponent implements OnInit {

  user: UserModel;

  constructor(private accountService: AccountService,
              private router: Router) {
              }

  ngOnInit() {
    this.accountService.getUserSession().subscribe(data => this.user = data);
    this.accountService.setUserSession();
  }

  logout(){
    sessionStorage.removeItem('user');
    this.ngOnInit();
    this.router.navigate(['/']);
  }
}
