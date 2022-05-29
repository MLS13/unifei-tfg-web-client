import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  login(): void {
    this.userService.login("email", "senha")
      .subscribe((it) => console.log(it));

  }

  forgotYourPassword(): void {

  }

  register(): void {

  }

}
