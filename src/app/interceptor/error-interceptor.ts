import { StorageService } from './../shared/service/storage.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(
        private router: Router,
        private storage: StorageService
        ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: string;
        let requestRetorno: HttpRequest<any>;

        if (this.storage.getLocalUser()) {
            token = this.storage.getLocalUser().token;

            requestRetorno = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token)
            });
        }
        else {
            requestRetorno = req.clone();
        }

        return next.handle(requestRetorno);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
