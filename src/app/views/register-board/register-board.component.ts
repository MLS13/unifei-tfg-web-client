import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoardModel } from 'src/app/models/board-model';
import { BoardService } from 'src/app/services/board.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-board',
  templateUrl: './register-board.component.html',
  styleUrls: ['./register-board.component.css']
})
export class RegisterBoardComponent implements OnInit {

  isLoading: boolean = true;
  form: FormGroup;

  listOptionsDeviceType: string[] = ["ESP-32", "ESP-8266"];
  listOptionsLicenseKey: string[] = [];


  constructor(private userService: UserService, private boardService: BoardService, private formBuilder: FormBuilder, private snackbar: MatSnackBar) {
    this.form = this.formBuilder.group({
      device_nickname: ['', [Validators.required]],
      device_type: ['', [Validators.required]],
      license_key: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getMyKeys();
  }

  getMyKeys(): void {
    this.isLoading = true;

    this.boardService.getKeys(this.userService).subscribe(
      (it) => {
        this.listOptionsLicenseKey = it.filter((key) => !key.in_use).map((key) => key.license_key);
        this.isLoading = false
      },
      () => {
        this.listOptionsLicenseKey = [];
        this.isLoading = false
      }
    );
  }

  registerBoard(): void {
    if (this.form.invalid) return;
    var data = this.form.getRawValue() as BoardModel;
    this.boardService.postRegisterBoard(this.userService, data).subscribe(
      (_) => {
        this.snackbar.open("Placa registrada com sucesso!", "", { duration: 3000 });
      },
      (it) => {
        this.snackbar.open(it.error ?? "Ocorreu um erro inesperado!", "X", { duration: 3000 });
      },
    );
  }

}
