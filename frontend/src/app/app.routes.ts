import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Main } from './pages/main/main';
import { jwtAuthGuard } from './core/guards/jwt.auth-guard';
import { DailyNotesList } from './components/daily-notes-list/daily-notes-list';

export const routes: Routes = [
    {path: '', component: Home, pathMatch: 'full'},
    {path: 'home', component:Home},
    {path: 'login', component:Login},
    {path: 'register', component:Register},

    {path: 'main', component: Main, canActivate: [jwtAuthGuard] },
    {path: 'day/:dayId', component: DailyNotesList, canActivate: [jwtAuthGuard]},
    
    {path: '**', redirectTo:''},
];
