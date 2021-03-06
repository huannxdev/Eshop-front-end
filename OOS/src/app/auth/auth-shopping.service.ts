import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject, Subscription } from 'rxjs/Rx';
import { RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class AuthShoppingService {

    public setRequestOptions(options?: RequestOptionsArgs) {
        const authHeaders = new Headers();
        authHeaders.append('Content-Type', 'application/json');
        if(localStorage.getItem('token-client'))
        authHeaders.append('Authorization',localStorage.getItem('token-client'));

        if (options) {
            if (options.headers) {
                options.headers.append(authHeaders.keys[0], authHeaders.values[0]);
            } else {
                options.headers = authHeaders;
            }
        } else {
            options = new RequestOptions({ headers: authHeaders });
        }

        return options;
    }
}