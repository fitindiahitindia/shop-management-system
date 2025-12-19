import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,private _product:ProductService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = this._product.getAdminLoginToken();

    // Attach token to every request
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {

        if(error.status === 401) {
          console.log('401 Error detected');

          // Clear storage
          this._product.removeUserLoginToken('adminlogintoken')
          // Redirect to login
          this.router.navigate(['/']);
        }

        return throwError(() => error);
      })
    );
  }
}
