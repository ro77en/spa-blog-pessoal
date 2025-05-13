import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './auth/auth.guard';
import { LoggedInGuard } from './auth/logged-in.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
