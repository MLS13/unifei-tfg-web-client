import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConstants {
    public static BASE_URL: string = "http://localhost:5000/applications/app";
    public static BASE_URL_IOT: string = "http://localhost:5000/iot/app";
    
    public static ROTAS = class Rotas {
        public static AUTH = "authenticate";
        public static REGISTER = "register";
        public static HOME = "";
        public static MY_KEYS = "my-keys";
        public static MY_BOARDS = "my-boards";
        public static BOARD = "board";
        public static REGISTER_BOARD = "register-board";
    }

    public static ROTAS_PARAMETERS = class Rotas {
        public static ID_BOARD = "id-board";
        public static ID_SETUP= "id-setup";
    }
    
    public static LOCAL_STORAGE = class LocalStorage {
        public static NAME = "name";
        public static EMAIL = "email";
        public static TOKEN = "token"; 
    }
}