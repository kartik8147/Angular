import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequest } from '../models/LoginRequest';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest : LoginRequest ={
    email : "",
    password : ""
  }
  submitted = false;
  passwordMissing = false;
  emailMissing = false;
  invalidCreds = false;
  constructor(
    private userService : UserService,
    private route : ActivatedRoute,
    private router : Router) { }

  ngOnInit(): void {
  }

  login() : void {
    const data = {
      "email" : this.loginRequest.email,
      "password" : this.loginRequest.password
    };
    
      if (!this.loginRequest.email) {
        this.emailMissing = true;
      }
      else {
        this.emailMissing = false;
      }
      if (!this.loginRequest.password) {
        this.passwordMissing = true;
      } else {
        this.passwordMissing = false;
      }
     

    if(this.emailMissing || this.passwordMissing)
    {
      return;
    }
    //API call to login
    this.userService.login(data)
      .subscribe({
        next :(res : any) =>{
          if (res['status'] === 601) {
            this.invalidCreds = true;
          } else {
            this.router.navigate(['/welcome'])
          }
        },
        error :(e) =>{
          
        }
      });
  }
}
