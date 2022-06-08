import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { AppConstants } from '../constants/constants';
import { ResponseLogin } from '../responses/response-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  email: string = "";
  token: string = "";

  constructor(private constants: AppConstants, private httpClient: HttpClient, private router: Router) {
    this.getDataLocalStorage();
  }

  private getDataLocalStorage() {
    this.email = localStorage.getItem(AppConstants.LOCAL_STORAGE.EMAIL) ?? "";
    this.token = localStorage.getItem(AppConstants.LOCAL_STORAGE.TOKEN) ?? "";
  }

  private setDataLocalStorage(email: string, token: string) {
    localStorage.setItem(AppConstants.LOCAL_STORAGE.EMAIL, email);
    localStorage.setItem(AppConstants.LOCAL_STORAGE.TOKEN, token);
  }

  login(email: string, password: string): Observable<ResponseLogin> {
    return this.httpClient.post<ResponseLogin>(this.constants.BASE_URL + "/users/auth/login", { 'email': email, "password": password });
  }

  setData(email: string, token: string){
    this.email = email;
    this.token = token;
    this.setDataLocalStorage(email, token);
  }

  register(name: String, cellphone: String, email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.constants.BASE_URL + "/users/create", { "name": name, "cellphone": cellphone, 'email': email, "password": password })
  }

  logout() {
    localStorage.clear();
    this.email = "";
    this.token = "";
    this.router.navigate([AppConstants.ROTAS.AUTH]);
  }

  isLogged(): boolean {
    return (this.token != "") && (this.email != "");
  }

}
