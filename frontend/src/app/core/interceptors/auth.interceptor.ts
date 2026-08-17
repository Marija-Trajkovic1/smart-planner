import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { ACCESS_TOKEN } from "../constants/storage.constants";
import { LOGIN, REGISTER } from "../constants/routes.constants";
import { isTokenExpired } from "../utils/auth.utils";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);

    if(req.url.includes(LOGIN) || req.url.includes(REGISTER)){
        return next(req);
    } 

    const access_token = sessionStorage.getItem(ACCESS_TOKEN);

    if(access_token && !isTokenExpired(access_token)){
        const cloneReq  = req.clone({
            setHeaders: {
                Authorization: `Bearer ${access_token}`
            }
        });

        return next(cloneReq).pipe(
            catchError((error:HttpErrorResponse)=>{
                if(error.status===401){
                    sessionStorage.removeItem(ACCESS_TOKEN);
                    router.navigate([LOGIN]);
                }
                return throwError(()=>error);
            })
        );
    }
    sessionStorage.removeItem(ACCESS_TOKEN);
    router.navigate([LOGIN]);

    return throwError(()=>new Error('Token je istekao ili ne postoji'));
    
};

