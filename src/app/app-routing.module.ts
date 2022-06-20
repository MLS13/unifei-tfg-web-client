import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConstants } from './constants/constants';
import { UserGuardService } from './services/user-guard.service';
import { DashboardComponent } from './templates/dashboard/dashboard.component';
import { AccountRegisterComponent } from './views/account-register/account-register.component';
import { BoardComponent } from './views/board/board.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { MyBoardsComponent } from './views/my-boards/my-boards.component';
import { MyKeysComponent } from './views/my-keys/my-keys.component';
import { RegisterBoardComponent } from './views/register-board/register-board.component';
import { SetupBoardComponent } from './views/setup-board/setup-board.component';

const routes: Routes = [
  { path: AppConstants.ROTAS.AUTH, component: LoginComponent },
  { path: AppConstants.ROTAS.REGISTER, component: AccountRegisterComponent },
  {
    path: AppConstants.ROTAS.HOME,
    component: DashboardComponent,
    canActivate: [UserGuardService],
    children: [{
      path: "",
      component: HomeComponent,
    }]
  },
  {
    path: AppConstants.ROTAS.MY_KEYS,
    component: DashboardComponent,
    canActivate: [UserGuardService],
    children: [{
      path: "",
      component: MyKeysComponent,
    }]
  },
  {
    path: AppConstants.ROTAS.REGISTER_BOARD,
    component: DashboardComponent,
    canActivate: [UserGuardService],
    children: [{
      path: "",
      component: RegisterBoardComponent,
    }]
  },
  {
    path: AppConstants.ROTAS.MY_BOARDS,
    component: DashboardComponent,
    canActivate: [UserGuardService],
    children: [{
      path: "",
      component: MyBoardsComponent,
    }]
  },
  {
    path: AppConstants.ROTAS.BOARD + "/:" + AppConstants.ROTAS_PARAMETERS.ID_BOARD,
    component: DashboardComponent,
    canActivate: [UserGuardService],
    children: [{
      path: "",
      component: BoardComponent,
    }]
  },
  {
    path: AppConstants.ROTAS.BOARD + "/:" + AppConstants.ROTAS_PARAMETERS.ID_BOARD + "/:" + AppConstants.ROTAS_PARAMETERS.ID_SETUP,
    component: DashboardComponent,
    canActivate: [UserGuardService],
    children: [{
      path: "",
      component: SetupBoardComponent,
    }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
