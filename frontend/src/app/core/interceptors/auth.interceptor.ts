import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const access_token = sessionStorage.getItem('access_token');

    let cloneReq = req;
    if(access_token){
        cloneReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${access_token}`
            }
        });
    }

    return next(cloneReq).pipe(
        catchError((error:HttpErrorResponse)=>{
            if(error.status===401){
                sessionStorage.removeItem('access_token');
                router.navigate(['/login']);
            }
            return throwError(()=>error);
        })
    );
};