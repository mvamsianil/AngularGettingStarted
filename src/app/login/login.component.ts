import { Component, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login, LoggedInUser } from '../entity/login';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  checkoutForm = this.formBuilder.group({
    username : '',
    password : ''
  });
  model = new Login();
  loggedInUser!: LoggedInUser;
  constructor(private formBuilder: FormBuilder, private _loginService: LoginService, private router: Router, private _alertService: AlertService) { }

  ngOnInit(): void {
    if(localStorage.length == 0)
      return; 
    if(parseInt(localStorage.getItem("USERID")!) > 0)
      this.router.navigate(['/']);
  }

  onSubmit(): void {
    this._alertService.clear();
    this.model.username = this.checkoutForm.get("username")?.value;
    this.model.password = this.checkoutForm.get("password")?.value;
    this._loginService.authenticate(this.model).subscribe(data => {
      this.loggedInUser = data;
      this.AddAuthTokens(this.loggedInUser);
      
      do {
        window.location.reload();
        this._alertService.success("Login success");
      } while (this.loggedInUser.id == 0);

      this.router.navigate(['/']);
      return true;
    }, error => { 
      this._alertService.error(error);
    });
  }

  private AddAuthTokens(_loggedInUser: LoggedInUser): void {
    localStorage.setItem("TOKEN", _loggedInUser.token);
    localStorage.setItem("USER", _loggedInUser.username);
    localStorage.setItem("USERID", _loggedInUser.id.toString());
    localStorage.setItem("USERNAME", _loggedInUser.firstname + ' ' + _loggedInUser.lastname);      
  }
}