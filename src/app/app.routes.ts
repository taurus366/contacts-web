import { Routes } from '@angular/router';
import {MainComponent} from "./home/main/main.component";
import {LoginComponent} from "./auth/login/login.component";

export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
   path: 'home',
   component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },

];
