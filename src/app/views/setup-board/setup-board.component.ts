import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { timer } from 'rxjs';
import { AppConstants } from 'src/app/constants/constants';
import { BoardModel, SetupModel } from 'src/app/models/board-model';
import { BoardService } from 'src/app/services/board.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-setup-board',
  templateUrl: './setup-board.component.html',
  styleUrls: ['./setup-board.component.css']
})
export class SetupBoardComponent implements OnInit {

  idSetupBoard: string = "";
  idBoard: string = "";
  isLoading: boolean = true;
  board?: BoardModel;
  deviceSetup?: SetupModel;

  constructor(private boardService: BoardService, private userService: UserService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.idBoard = params[AppConstants.ROTAS_PARAMETERS.ID_BOARD];
      this.idSetupBoard = params[AppConstants.ROTAS_PARAMETERS.ID_SETUP];
      timer(500).subscribe((_) => this.getBoard());
    });
  }

  getBoard() {
    this.boardService.getBoardFromId(this.idBoard, this.userService).subscribe(
      (it) => {
        console.log(it)
        this.board = it.board;
        this.deviceSetup = this.board.device_setup.find((e) => e._id == this.idSetupBoard);
        this.isLoading = false;
      },
      (it) => {
        console.log(it);
      }
    );
  }

}
