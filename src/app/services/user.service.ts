import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private constants: AppConstants, private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<String> {
    console.log("E-mail: " + email + "\nSenha: " + password);
    return this.httpClient.post<String>(this.constants.BASE_URL + "/users/auth/login", { 'email': "miller", "password": "Senhaaas" })
  }

}
