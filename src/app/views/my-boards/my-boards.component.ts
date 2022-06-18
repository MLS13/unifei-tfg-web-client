import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { AppConstants } from 'src/app/constants/constants';
import { BoardModel } from 'src/app/models/board-model';
import { ResponseBoards } from 'src/app/responses/response-boards';
import { BoardService } from 'src/app/services/board.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-boards',
  templateUrl: './my-boards.component.html',
  styleUrls: ['./my-boards.component.css']
})
export class MyBoardsComponent implements OnInit {

  listBoards: BoardModel[] = [];
  teste: number[] = [1, 2, 3];
  isLoading: boolean = true

  constructor(private userService: UserService, private boardService: BoardService, private router: Router) { }

  ngOnInit(): void {
    this.getMyBoards();
  }

  getMyBoards(): void {
    this.isLoading = true;

    this.boardService.getBoards(this.userService).subscribe(
      (it) => {
        timer(500).subscribe(
          (_) => {
            this.listBoards = it.boards;
            this.isLoading = false
          }
        );
      },
      () => {
        this.listBoards = [];
        this.isLoading = false
      }
    );
  }

  toPageBoard(board: BoardModel) {
    this.router.navigate([AppConstants.ROTAS.BOARD, board.license_key]);
  }

  addBoard() {

  }

}
