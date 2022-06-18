import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConstants } from '../constants/constants';
import { UserModel } from '../models/user-model';
import { ResponseGeneric } from '../responses/response-generic';
import { ResponseLogin } from '../responses/response-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  name: string = "";
  email: string = "";
  token: string = "";

  constructor(private httpClient: HttpClient, private router: Router) {
    this.getDataLocalStorage();
  }

  private getDataLocalStorage() {
    this.name = localStorage.getItem(AppConstants.LOCAL_STORAGE.NAME) ?? "";
    this.email = localStorage.getItem(AppConstants.LOCAL_STORAGE.EMAIL) ?? "";
    this.token = localStorage.getItem(AppConstants.LOCAL_STORAGE.TOKEN) ?? "";
  }

  private setDataLocalStorage(name: string, email: string, token: string) {
    localStorage.setItem(AppConstants.LOCAL_STORAGE.NAME, name);
    localStorage.setItem(AppConstants.LOCAL_STORAGE.EMAIL, email);
    localStorage.setItem(AppConstants.LOCAL_STORAGE.TOKEN, token);
  }

  login(email: string, password: string): Observable<ResponseLogin> {
    return this.httpClient.post<ResponseLogin>(AppConstants.BASE_URL + "/users/auth/login", { 'email': email, "password": password });
  }

  setData(name: string, email: string, token: string) {
    this.name = name;
    this.email = email;
    this.token = token;
    this.setDataLocalStorage(name, email, token);
  }

  register(data: UserModel): Observable<ResponseGeneric> {
    return this.httpClient.post<ResponseGeneric>(
      AppConstants.BASE_URL + "/users/create",
      {
        "name": data.name,
        "cellphone": data.cellphone,
        'email': data.email,
        "password": data.password
      }
    );
  }

  logout() {
    this.deleteDataUser();
    this.router.navigate([AppConstants.ROTAS.AUTH]);
  }

  deleteDataUser() {
    localStorage.clear();
    this.name = "";
    this.email = "";
    this.token = "";
  }

  isLogged(): boolean {
    return (this.token != "") && (this.email != "");
  }

}
