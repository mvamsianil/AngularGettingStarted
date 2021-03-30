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
    private getValidateTokenUrl: string = 'https://localhost:44397/coreapi/User/validatetoken';

    user: Observable<LoggedInUser> | undefined;
    validtoken: boolean = false;
    constructor (private _httpClient: HttpClient) { }

    authenticate(login: Login) : Observable<LoggedInUser> {
        return this._httpClient.post<LoggedInUser>(this.getLoginUrl, login).pipe(
            map((data: any) => this.user = data)
        );
    }

    validatetoken(token:string) : Observable<boolean> {
      return this._httpClient.get<boolean>(this.getValidateTokenUrl + "?token=" + token).pipe(
        map((data:boolean) => this.validtoken = data)
      );
    }
  }