import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {JwtHelper} from  'angular2-jwt';

@Injectable()
export class AuthGuardShoppingService implements CanActivate {

    constructor(private router: Router, private jwtHelper: JwtHelper) { }
    tokenNotExpired(){
        let token: string;
        if(localStorage.getItem('token-client'))
        {
            token = localStorage.getItem('token-client');
            return token != null && this.jwtHelper.isTokenExpired(token);
        }
        return true;
    }
    canActivateChild(): boolean {
        
        if(this.tokenNotExpired()) {
            sessionStorage.clear();
            localStorage.removeItem('token-client');
            return true;
        } else {
            this.router.navigate(['/admin/manager']);
            return false;
        }
    }

    canActivate(): boolean {
        if(!this.tokenNotExpired()) {
            return true;
        } else {
            this.router.navigate(['/account/login']);
            sessionStorage.clear();
            localStorage.removeItem('token-client');
            return false;
        }
    }
}
