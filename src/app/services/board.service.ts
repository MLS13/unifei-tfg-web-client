import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../constants/constants';
import { BoardModel, SetupModel } from '../models/board-model';
import { ResponseBoard } from '../responses/response-board';
import { ResponseBoards } from '../responses/response-boards';
import { ResponseGeneric } from '../responses/response-generic';
import { ResponseKey } from '../responses/response-key';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private httpClient: HttpClient) { }

  getKeys(userService: UserService): Observable<ResponseKey[]> {
    return this.httpClient.get<ResponseKey[]>(
      AppConstants.BASE_URL + "/users/boardLicenses",
      {
        headers: {
          'token': userService.token,
          'email': userService.email,
        }
      },
    );
  }

  getBoards(userService: UserService): Observable<ResponseBoards> {
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

  postCreateKey(userService: UserService): Observable<ResponseGeneric> {
    console.log(userService.token);
    return this.httpClient.post<ResponseGeneric>(
      AppConstants.BASE_URL + "/users/createLicense",
      '',
      {
        headers: {
          'token': userService.token,
          'email': userService.email,
        },
      },
    );
  }

  postRegisterBoard(userService: UserService, data: BoardModel): Observable<ResponseGeneric> {
    return this.httpClient.post<ResponseGeneric>(
      AppConstants.BASE_URL_IOT + "/boards/register",
      {
        "owner_email": userService.email,
        "license_key": data.license_key,
        "device_nickname": data.device_nickname,
        "device_type": data.device_type,
      },
      {
        headers: {
          'token': userService.token,
          'email': userService.email,
        },
      },
    );
  }

  postChangeSetup(userService: UserService, id: string, name: string, code: string, value: string, idSetup: string): Observable<ResponseGeneric>{
    return this.httpClient.post<ResponseGeneric>(
      AppConstants.BASE_URL_IOT + "/boards/control",
      {
        "license_key" : id,
        "setup" : [
          {           
            "NAME": name,
            "CODE": code,
            "VALUE": value,
            "_id": idSetup
          }
        ]
      },
      {
        headers: {
          'token': userService.token,
          'email': userService.email,
        },
      },
    );
  }
}
