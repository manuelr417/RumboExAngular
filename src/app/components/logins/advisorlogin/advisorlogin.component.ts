import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-advisorlogin',
  templateUrl: './advisorlogin.component.html',
  styleUrls: ['./advisorlogin.component.css']
})
export class AdvisorloginComponent implements OnInit {
  user: User = new User();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(): void {
    this.auth.advisorlogin(this.user)
    .then((user) => {
      sessionStorage.setItem('userid', user.result.userid);
      sessionStorage.setItem('username', user.result.username);
      sessionStorage.setItem('email', user.result.email);
      sessionStorage.setItem('role', user.result.roles[0]);
      sessionStorage.setItem('token', user);
      sessionStorage.setItem('logged', 'true');
      // The complete object
      // console.log(user);
      console.log(sessionStorage.getItem('token'));
      console.log(sessionStorage.getItem('userid'));
      console.log(sessionStorage.getItem('username'));
      console.log(sessionStorage.getItem('email'));
      console.log(sessionStorage.getItem('role'));
      this.router.navigate(['/main']);
    })
    .catch((err) => {
      console.log(err);
    });
  }

}
