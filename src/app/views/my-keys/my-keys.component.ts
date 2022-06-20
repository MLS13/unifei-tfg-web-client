import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timer } from 'rxjs';
import { ResponseKey } from 'src/app/responses/response-key';
import { BoardService } from 'src/app/services/board.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-keys',
  templateUrl: './my-keys.component.html',
  styleUrls: ['./my-keys.component.css']
})
export class MyKeysComponent implements OnInit {

  isLoading: boolean = true;
  myKeys: ResponseKey[] = [];
  displayedColumns: string[] = ['license_key', 'in_use'];

  constructor(private userService: UserService, private boardService: BoardService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMyKeys();
  }

  getMyKeys(): void {
    this.isLoading = true;

    this.boardService.getKeys(this.userService).subscribe(
      (it) => {
        timer(500).subscribe(
          (_) => {
            this.myKeys = it;
            this.isLoading = false
          }
        );
      },
      () => {
        this.myKeys = [];
        this.isLoading = false
      }
    );
  }

  addKey(): void {
    this.boardService.postCreateKey(this.userService).subscribe(
      (_) => {
        this.snackbar.open("Chave criada com sucesso!", "X", { duration: 3000 });
        this.getMyKeys();
      },
      (it) => {
        this.snackbar.open("Ocorreu um erro inesperado!", "X", { duration: 3000 });
      },
    )
  }

}
