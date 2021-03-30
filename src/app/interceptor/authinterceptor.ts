import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { LoginService } from '../login.service';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
  }                     from '@angular/router';
import { map } from 'rxjs/operators';

/*interface HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>
}
*/

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
constructor(public _loginService: LoginService, public _router: Router) {}
    token: string = "";
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.headers.get("authorization") != null) {
            this.token = request.headers.get("authorization")?.toString()!;
            this._loginService.validatetoken(this.token).pipe(
                map((data: Boolean) => {
                    if(!data) 
                    this._router.navigate(['/']);
                })
            );
        }

        if(localStorage.getItem("TOKEN") != null)
            request = request.clone({
                setHeaders: {
                Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
                }
            });

        return next.handle(request);
    }

    
}