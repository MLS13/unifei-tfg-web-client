import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AppConstants } from 'src/app/constants/constants';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private userService: UserService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {

  }

  login(): void {
    this.userService.login(this.email, this.password)
      .subscribe(
        (it) => {
          if (it.message != null && it.token != null) {
            this.userService.setData(this.email, it.token);
            this.router.navigate([AppConstants.ROTAS.HOME]);
          } else if (it.message != null) {
            this.snackbar.open(it.message);
          } else {
            this.snackbar.open("Ocorreu um erro inesperado!");
          }
        },
        (error) => this.snackbar.open("Ocorreu um erro inesperado!", "", {duration: 3000}),
      );
  }

  forgotYourPassword(): void {

  }

  register(): void {
    this.router.navigate([AppConstants.ROTAS.REGISTER]);
  }

}
