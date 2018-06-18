import { Injectable } from '@angular/core';
import { AuthHttpService } from '../../auth/auth-http.service';
import { Observable } from 'rxjs/Observable';
import { LoginAccountModel } from '../models/loginAccount';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import { CreateUserModel } from '../models/user/create-user/create-user';
import { UserModel } from '../models/user/user';
import { AuthShoppingHttpService } from '../../auth/auth-http-shopping.service';

@Injectable()
export class AccountService {
  currentUser=new BehaviorSubject<UserModel>(JSON.parse(sessionStorage.getItem('user-client')));

  private API_PATH = 'https://eshop-springboot.herokuapp.com/api/User/';
  //private API_PATH = 'http://localhost:54766/api/User/';

  login:LoginAccountModel;
  constructor(private http: Http, private authHttpService: AuthShoppingHttpService) { }

  checkUserExist(terms): Observable<UserModel> {
    return this.authHttpService.get(this.API_PATH + "CheckUserExist/" + terms)
      .map(res => res.json());
  }

  add(task: CreateUserModel): Observable<any> {
    const user = {
      UserName: task.Email,
      Password: task.Password,
      Email: task.Email
    }
    return this.authHttpService.post(this.API_PATH, user);
  }

  loginAccount(login) : Observable<any>{
    const user = {
      UserName: login.Email,
      Password: login.Password
    }
    return this.authHttpService.post(this.API_PATH + "login", user);
  }

  setUserSession(){
    this.currentUser.next(JSON.parse(sessionStorage.getItem('user-client')));
  }

  getUserSession(){
    return this.currentUser.asObservable();
  }

  getByUserName(username: string): Observable<UserModel> {
    return this.authHttpService.get(this.API_PATH + username)
      .map(res => {
        return res.json() || []
      }
      )
  }

  put(id: string,user: UserModel){
    return this.authHttpService.put(this.API_PATH + id, user);
  }

  getWishList(userId:string):Observable<any[]>{
    return this.authHttpService.get(this.API_PATH + "GetWishList/"+ userId).map(res => res.json() || []);
  }

  removeFromWishList(userID:string, productID:string): Observable<any>{
    return this.authHttpService.delete(this.API_PATH + userID + "/product/" + productID + "/removeWishProduct");
  }

  addWishProduct(id:string, idProduct:string) :Observable<any> {
    return this.authHttpService.get(this.API_PATH + id + "/product/" + idProduct + "/addWishProduct",null);
  }

  checkWishProduct(id:string, idProduct:string): Observable<any> {
    return this.authHttpService.get(this.API_PATH + id + "/product/" + idProduct + "/checkWishProduct",null)
    .map(res => {
      return res.json() || []
    })
  }

  loginFB(token : string){
    var FBViewModel = {
      AccessToken : token,
    }
    return this.authHttpService.post(this.API_PATH+"LoginFacebook",FBViewModel).map(res => res.json() || []);
  }

}
