import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, filter, retry, switchMap } from 'rxjs/operators';
import { Login, LoggedInUser } from './entity/login';

@Injectable({
    providedIn: 'root'
  })

  export class LoginService {
    params = new HttpParams()
    .set('orderBy', '"$key"')
    .set('limitToFirst', "1");

    private getLoginUrl: string = 'https://localhost:44397/coreapi/User/authenticate';
    private options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),    
        responseType: 'json'
      };

    user: Observable<LoggedInUser> | undefined;
    constructor (private _httpClient: HttpClient) { }

    authenticate(login: Login) : Observable<LoggedInUser> {
        return this._httpClient.post<LoggedInUser>(this.getLoginUrl, login).pipe(
            map((data: any) => this.user = data)
        );
    }
  }
