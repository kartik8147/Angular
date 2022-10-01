import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { User } from '../models/User';
import { LoginRequest } from '../models/LoginRequest';
const baseUrl ="http://localhost:9090/";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }
  singUp(user: User)
  {
    return this.http.post(`${baseUrl}signUp/addUser`, user);
  };

  login(loginRequest : LoginRequest)
  {
    return this.http.post(`${baseUrl}myLoginApp/login`, loginRequest);
  }
}
