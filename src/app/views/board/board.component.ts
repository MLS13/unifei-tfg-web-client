import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { interval, Subscription, timer } from 'rxjs';
import { AppConstants } from 'src/app/constants/constants';
import { BoardModel } from 'src/app/models/board-model';
import { BoardService } from 'src/app/services/board.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  isLoading: boolean = true;
  idBoard: string = "";
  board?: BoardModel;
  deviceNickName: string = "";
  disableDeviceNickName: boolean = true;
  timerConnectServer?: Subscription;

  constructor(private activateRouter: ActivatedRoute, private router: Router, private boardService: BoardService, private userService: UserService) { }

  ngOnInit(): void {
    this.activateRouter.params.subscribe((params: Params) => {
      this.idBoard = params[AppConstants.ROTAS_PARAMETERS.ID_BOARD];
      timer(500).subscribe(
        (_) => {
          this.getBoard();
          this.connectServer();
        });
    });
  }

  ngOnDestroy(): void {
    this.disconnectServer();
  }

  connectServer() {
    this.timerConnectServer = interval(1000).subscribe((_) => this.getBoard());
  }

  disconnectServer() {
    this.timerConnectServer?.unsubscribe();
    this.timerConnectServer = undefined;
  }

  getBoard() {
    this.boardService.getBoardFromId(this.idBoard, this.userService).subscribe(
      (it) => {
        console.log(it);
        this.board = it.board;
        this.deviceNickName = this.board.device_nickname;
        this.isLoading = false;
      },
      (it) => {
        console.log(it);
      }
    );
  }

  changeDeviceNickName(): void {
    if (this.disableDeviceNickName) {
      this.disableDeviceNickName = false;
      this.disconnectServer();
    } else {

    }
  }

  cancelChangeDeviceNickName(): void {
    this.disableDeviceNickName = true;
    this.deviceNickName = this.board?.device_nickname ?? "";
    this.connectServer();
  }

  toPageBoard(idSetupBoard: string) {
    this.router.navigate([AppConstants.ROTAS.BOARD, this.idBoard, idSetupBoard]);
  }

  returnPage(): void {
    history.back();
  }

}
