import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { ACCESS_TOKEN } from "../constants/storage.constants";
import { LOGIN } from "../constants/routes.constants";
import { isTokenExpired } from "../utils/auth.utils";

export const jwtAuthGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const access_token = sessionStorage.getItem(ACCESS_TOKEN);

    console.log('Guard proverava token:', access_token);
    if(access_token && !isTokenExpired(access_token)){
        return true;
    }

    sessionStorage.removeItem(ACCESS_TOKEN);
    router.navigate([LOGIN]);
    return false;
}

