import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login, LoggedInUser } from './entity/login';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class LoginService {
    constructor (private _httpClient: HttpClient) { }

    authenticate(login: Login) : Observable<LoggedInUser> {
        return this._httpClient.post<LoggedInUser>(environment.apiUrl + environment.getLoginUrl, login);
    }

    validatetoken(token:string) : Observable<boolean> {
      return this._httpClient.get<boolean>(environment.apiUrl + environment.getValidateTokenUrl + "?token=" + token);
    }
  }