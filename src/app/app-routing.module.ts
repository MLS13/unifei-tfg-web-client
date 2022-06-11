import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConstants } from './constants/constants';
import { UserGuardService } from './services/user-guard.service';
import { DashboardComponent } from './templates/dashboard/dashboard.component';
import { AccountRegisterComponent } from './views/account-register/account-register.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: AppConstants.ROTAS.AUTH, component: LoginComponent },
  { path: AppConstants.ROTAS.REGISTER, component: AccountRegisterComponent },
  {
    path: AppConstants.ROTAS.HOME,
    component: DashboardComponent,
    canActivate: [UserGuardService],
    children: [{
      path: AppConstants.ROTAS.HOME,
      component: HomeComponent,
    }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
