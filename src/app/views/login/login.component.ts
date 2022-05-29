import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  login(): void {

    this.userService.login(this.email, this.password)
      .subscribe((it) => console.log(it));

  }

  forgotYourPassword(): void {

  }

  register(): void {

  }

}
