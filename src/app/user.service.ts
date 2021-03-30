import { Injectable } from '@angular/core';
import { User } from './entity/user';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private getAllUsersUrl: string = 'https://localhost:44397/coreapi/User/getallusers';
    constructor(private _httpClient: HttpClient) {}

    getallusers() : Observable<User[]> {
        return this._httpClient.get<User[]>(this.getAllUsersUrl);
    }
}