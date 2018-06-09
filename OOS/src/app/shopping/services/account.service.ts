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

@Injectable()
export class AccountService {
  currentUser=new BehaviorSubject<CreateUserModel>(JSON.parse(sessionStorage.getItem('user')));

  private API_PATH = 'http://fbinterns.azurewebsites.net/api/User/';
  //private API_PATH = 'http://localhost:54766/api/User/';

  login:LoginAccountModel;
  constructor(private http: Http, private authHttpService: AuthHttpService) { }

  checkUserExist(terms): Observable<CreateUserModel> {
    return this.authHttpService.get(this.API_PATH + "CheckUserExist/" + terms)
      .map(res => res.json());
  }

  add(task: CreateUserModel): Observable<any> {
    return this.authHttpService.post(this.API_PATH, task);
  }

  loginAccount(login){
    return this.authHttpService.post(this.API_PATH + "Login", login).map(res => res.json() || []);
  }

  setUserSession(){
    this.currentUser.next(JSON.parse(sessionStorage.getItem('user')));
  }

  getUserSession(){
    return this.currentUser.asObservable();
  }

  getById(id: string): Observable<UserModel> {
    return this.authHttpService.get(this.API_PATH + id)
      .map(res => {
        return res.json() || []
      }
      )
  }

  put(id: string,user: UserModel): Observable<any> {
    return this.authHttpService.put(this.API_PATH + "/" + id, user)
  }

  getWishList(userId:string):Observable<any[]>{
    return this.authHttpService.get(this.API_PATH + "GetWishList/"+ userId).map(res => res.json() || []);
  }

  removeFromWishList(userID:string, productID:string): Observable<any>{
    return this.authHttpService.delete(this.API_PATH + userID + "/product/" + productID + "/removeWishProduct");
  }

  addWishProduct(id:string, idProduct:string) :Observable<any> {
    return this.authHttpService.post(this.API_PATH + id + "/product/" + idProduct + "/addWishProduct",null);
  }

  checkWishProduct(id:string, idProduct:string): Observable<any> {
    return this.authHttpService.post(this.API_PATH + id + "/product/" + idProduct + "/checkWishProduct",null)
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
