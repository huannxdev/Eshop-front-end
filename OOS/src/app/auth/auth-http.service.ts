import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthService } from './auth.service';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';

@Injectable()
export class AuthHttpService {
    constructor(private http: Http,
        private authService: AuthService) {
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        if (options) {
            options = this.authService.setRequestOptions(options);
        } else {
            options = this.authService.setRequestOptions();
        }
        return this.http.get(url, options);
    }

    public put(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
        var body = JSON.stringify(data);

        if (options) {
            options = this.authService.setRequestOptions(options);
        } else {
            options = this.authService.setRequestOptions();
        }

        return this.http.put(url, body, options);
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {

        if (options) {
            options = this.authService.setRequestOptions(options);
        } else {
            options = this.authService.setRequestOptions();
        }

        return this.http.delete(url, options);
    }

    public post(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
        const body = JSON.stringify(data);
        if (options) {
            options = this.authService.setRequestOptions(options);
        } else {
            options = this.authService.setRequestOptions();
        }
        
        return this.http.post(url, body, options);
    }

}
