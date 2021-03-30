import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
constructor(public _loginService: LoginService, public _router: Router) {}
    token: string = "";
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.url.indexOf("/coreapi/User/validatetoken") == -1) {            
            if(request.headers.get("authorization") != null || localStorage.getItem("TOKEN") != null) {
                this.token = request.headers.get("authorization")?.toString()!;
                if(this.token === null || typeof this.token === 'undefined') {
                    this.token = localStorage.getItem("TOKEN")?.toString()!;
                }

                this._loginService.validatetoken(this.token).subscribe(
                    (data: Boolean) => {
                        if(!data) 
                        this._router.navigate(['/']);
                    },
                    error => {
                        alert("Error at Interceptor - " + error.message);
                    }
                );
            }

            if(localStorage.getItem("TOKEN") != null)
                request = request.clone({
                setHeaders: {
                Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
                }
            });
        }
        return next.handle(request);
    }

    
}