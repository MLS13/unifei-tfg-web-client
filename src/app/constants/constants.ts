import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConstants {
    public BASE_URL: string = "http://localhost:5000/applications/app";
    
    public static ROTAS = class Rotas {
        public static AUTH = "authenticate";
        public static REGISTER = "register";
        public static HOME = "";
    }
    
    public static LOCAL_STORAGE = class LocalStorage {
        public static EMAIL = "email";
        public static TOKEN = "token";
    }
}