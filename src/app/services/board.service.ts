import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../constants/constants';
import { ResponseBoard } from '../responses/response-board';
import { ResponseBoards } from '../responses/response-boards';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private httpClient: HttpClient) { }

  getBoards(userService: UserService): Observable<ResponseBoards> {
    console.log(userService.token);
    return this.httpClient.get<ResponseBoards>(
      AppConstants.BASE_URL + "/users/boards",
      {
        headers: {
          'token': userService.token,
          'email': userService.email,
        }
      },
    );
  }

  getBoardFromId(id: string, userService: UserService): Observable<ResponseBoard> {
    console.log(userService.token);
    return this.httpClient.get<ResponseBoard>(
      AppConstants.BASE_URL + "/users/specific-board",
      {
        headers: {
          'token': userService.token,
          'email': userService.email,
          'license_key': id,
        },
      },
    );
  }
}
