import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.css']
})
export class AccountRegisterComponent implements OnInit {

  name: string = "";
  cellphone: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  register(){
    this.userService.register(this.name, this.cellphone, this.email, this.password)
      .subscribe((it) => console.log("Retorno: " + it));
  }

}
