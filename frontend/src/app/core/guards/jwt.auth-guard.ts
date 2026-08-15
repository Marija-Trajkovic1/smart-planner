import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const jwtAuthGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const access_token = sessionStorage.getItem('access_token');
    console.log('Guard proverava token:', access_token);
    if(access_token){
        return true;
    }

    router.navigate(['/login']);
    return false;

}

