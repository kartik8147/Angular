import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userDetails: User = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: ""
  }
  firstNameMissing: boolean = false;
  lastNameMissing: boolean = false;
  dobMissing: boolean = false;
  phoneNumberMissing: boolean = false;
  passwordMissing: boolean = false;
  emailMissing: boolean = false;
  userExists: boolean = false;
  emailNotValid: boolean = false;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

  }

  signup(): void {

    /* Validations for the fields starts*/

    if (!this.userDetails.firstName) {
      this.firstNameMissing = true;

    }
    else {
      this.firstNameMissing = false;
    }
    if (!this.userDetails.lastName) {
      this.lastNameMissing = true;
    } else {
      this.lastNameMissing = false;
    }
    if (!this.userDetails.email) {
      this.emailMissing = true;
    }
    else {
      this.emailMissing = false;
    }
    if (!this.userDetails.password) {
      this.passwordMissing = true;
    } else {
      this.passwordMissing = false;
    }
    if (!this.userDetails.phoneNumber) {
      this.phoneNumberMissing = true;
    }
    else {
      this.phoneNumberMissing = false;
    }
    if (!this.userDetails.dateOfBirth) {
      this.dobMissing = true;
    } else {
      this.dobMissing = false;
    }


    if (this.firstNameMissing || this.lastNameMissing || this.emailMissing
      || this.passwordMissing || this.dobMissing || this.phoneNumberMissing) {
      return;
    }
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.userDetails.email?.match(regex)) {
      this.emailNotValid = true;
      return;
    }
    /* Validations for the fields ends*/

    //api call for sign up
    this.userService.singUp(this.userDetails)
      .subscribe({
        next: (res: any) => {
          if (res.status === 600) {
            this.userExists = true;
          }
          else {
            this.router.navigate(['/signupsuccess']);
          }
        },
        error: (e) => {
          console.log(e);
        }
      });
  }



}
