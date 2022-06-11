import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/constants/constants';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.css']
})
export class AccountRegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private snackbar: MatSnackBar, private router: Router) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      cellphone: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.userService.deleteDataUser();
  }

  register() {
    if (this.form.invalid) return;
    var data = this.form.getRawValue() as UserModel;
    if (data.password != data.confirmPassword) {
      this.snackbar.open("Senhas não conferem!", "X", { duration: 3000 })
      return;
    }
    this.userService.register(data)
      .subscribe(
        (it) => {
          alert("Conta criada com sucesso!");
          this.router.navigate([AppConstants.ROTAS.AUTH]);
        },
        (it) => {
          this.snackbar.open(it.error ?? "Ocorreu um erro inesperado", "", { duration: 3000 });
        },
      );
  }

}
