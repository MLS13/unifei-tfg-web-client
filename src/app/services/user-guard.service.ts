import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import { AppConstants } from '../constants/constants';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {

  constructor(private user: UserService, private router: Router) { }

  canActivate(): boolean {
    if (this.user.isLogged()) {
      return true;
    } else {
      this.router.navigate([AppConstants.ROTAS.AUTH]);
      return false;
    }
  }

}
