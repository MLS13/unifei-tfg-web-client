import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nameUser: String = "Miller";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.nameUser = this.userService.name;
  }

  logout():void{
    this.userService.logout();
  }

}
