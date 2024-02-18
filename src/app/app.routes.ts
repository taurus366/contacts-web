import {PreloadAllModules, provideRouter, RouterModule, Routes, withDebugTracing} from '@angular/router';
import {MainComponent} from "./home/main/main.component";
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./shared/guard/param-guard.activate";


export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: MainComponent,
    canActivate: [AuthGuard],
    data: {
      authenticationRequired: true,
      authenticationFailureUrl: "login"
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    // Here i can redirect to custom page for example : notFoundPage but I prefer to get the user into railway :)
    path: '**',
    redirectTo: 'home'
  }

];
