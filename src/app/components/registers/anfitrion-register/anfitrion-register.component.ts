import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user";
import {ErroralertService} from "../../../services/erroralert.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-anfitrion-register',
  templateUrl: './anfitrion-register.component.html',
  styleUrls: ['./anfitrion-register.component.css']
})
export class AnfitrionRegisterComponent implements OnInit {

  user: User = new User();
  passwordAgain;

  constructor(private auth: AuthService, private router: Router, private error: ErroralertService) { }

  ngOnInit() {
  }

  registration(): void {
    this.auth.register(this.user)
    .then((user) => {
      console.log(user);
      this.router.navigate(['/studentmain']);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  register() {
    if(!this.user.name) {
      this.error.displaymessage("Name required.");
    }
    else if(!this.user.lastname) {
      this.error.displaymessage("Last name required.");
    }
    else if(!this.user.username) {
      this.error.displaymessage("Username required.");
    }
    else if(!this.user.email || !this.user.email.includes("@") || !this.user.email.includes(".")) {
      this.error.displaymessage("A valid email is required.");
    }
    else if(!this.user.password) {
      this.error.displaymessage("Password required.");
    }
    else if(!this.passwordAgain) {
      this.error.displaymessage("Please write password again.");
    }
    else if(this.user.password != this.passwordAgain) {
      this.error.displaymessage("Passwords do not match.");
    }
    else {
      console.log(this.user);
      this.error.hidemessage();
      this.registration();
    }
  }
}
