import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
constructor(public _loginService: LoginService, public _router: Router, private _alertService: AlertService) {}
    token: string = "";
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._alertService.clear();
        if(request.url.indexOf("/coreapi/User/validatetoken") == -1) {            
            if(request.headers.get("authorization") != null || localStorage.getItem("TOKEN") != null) {
                this.token = request.headers.get("authorization")?.toString()!;
                if(this.token === null || typeof this.token === 'undefined') {
                    this.token = localStorage.getItem("TOKEN")?.toString()!;
                }

                this._loginService.validatetoken(this.token).subscribe(
                    (data: Boolean) => {
                        if(!data) {
                            this._alertService.success("Validate token success");
                            this._router.navigate(['/']);
                        }
                    },
                    error => {
                        this._alertService.error(error.message);
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