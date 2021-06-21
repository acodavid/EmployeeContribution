import { Injectable } from "@angular/core";

import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";

import { Observable, throwError } from "rxjs";

import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        const token: string = localStorage.getItem('jwtToken');

        if(token){
            request = request.clone({headers: request.headers.set('Authorization', token)});
        }
        

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if(event instanceof HttpResponse) {
                    // console.log(event)
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
            
                return throwError(error);
            })
        )
    }
}