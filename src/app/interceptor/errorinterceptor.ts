import { Injectable } from "@angular/core";
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertService } from "../alert.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _alertService: AlertService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._alertService.clear();

        return next.handle(request).pipe(catchError((err: any) => {
            const error = err.error?.message || err.statusText;

            if([401, 403].includes(err.status)) {
                //this._alertService.error("Unauthorised access");
                return throwError("Unauthorised access");
            }
            return throwError(error);
        }));
    }
}