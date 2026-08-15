import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Main } from './pages/main/main';
import { jwtAuthGuard } from './core/guards/jwt.auth-guard';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component:Home},
    {path: 'login', component:Login},
    {path: 'register', component:Register},

    {path: 'overview', component: Main, canActivate: [jwtAuthGuard] },

    
    {path: '**', redirectTo:''},
];
