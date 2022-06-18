import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/constants/constants';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nameUser: String = "Miller";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.nameUser = this.userService.name;
  }

  logout():void{
    this.userService.logout();
  }

  navHome():void{
    this.router.navigate([AppConstants.ROTAS.HOME]);
  }
  navMyBoards():void{
    this.router.navigate([AppConstants.ROTAS.MY_BOARDS]);
  }

}
