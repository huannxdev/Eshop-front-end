import { Injectable } from '@angular/core';
import { AuthHttpService } from '../../auth/auth-http.service';
import { Observable } from 'rxjs/Observable';
import { LoginAccountModel } from '../models/loginAccount';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs';
import { UserModel } from '../models/user';

@Injectable()
export class AccountService {

  currentUser=new Subject<UserModel>();
  private API_PATH = 'https://eshop-springboot.herokuapp.com/api/User/';

  constructor(private http: Http, private authHttpService: AuthHttpService) { }  

  loginAccount(login){
    return this.authHttpService.post(this.API_PATH + "loginAdmin", login);
  }

  setUserSession(){
    this.currentUser.next(JSON.parse(sessionStorage.getItem('user')));
  }

  getUserSession(){
    return this.currentUser.asObservable();
  }

  getById(id: string): Observable<any> {
    return this.authHttpService.get(this.API_PATH + id)
      .map(res => {
        return res.json() || []
      }
      )
  }

  put(id: string,user: UserModel): Observable<any> {
    return this.authHttpService.put(this.API_PATH + id, user)
  }
}
