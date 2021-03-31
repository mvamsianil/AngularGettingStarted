import { Injectable } from '@angular/core';
import { User } from './entity/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private _httpClient: HttpClient, private _router: Router, private _alertService: AlertService) {}
    private _user = new User();

    getallusers() : Observable<User[]> {
        return this._httpClient.get<User[]>(environment.apiUrl + environment.getAllUsersUrl);
    }

    getcurrentuser(): User {
        this._user.id = parseInt(localStorage.getItem("USERID")!);
        this._user.firstname = localStorage.getItem("USERNAME")!.split(" ")[0];
        this._user.lastname = localStorage.getItem("USERNAME")!.split(" ")[1];
        this._user.username = localStorage.getItem("USER")!;

        return this._user;
    }

    logout() {
        if(localStorage.length > 0)
            this._alertService.warn("User logged out success");

        localStorage.clear();        
    }
}