import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): boolean {
        if(!sessionStorage.getItem('user')) {
            return true;
        } else {
            this.router.navigate(['/admin/manager']);
            return false;
        }
    }

    canActivateChild(): boolean {
        if(sessionStorage.getItem('user')) {
            return true;
        } else {
            this.router.navigate(['/admin/login']);
            return false;
        }
    }
}
