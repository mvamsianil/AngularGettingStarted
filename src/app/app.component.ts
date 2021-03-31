import { Component } from '@angular/core';
import { version, name } from '../../package.json';
import { User, Alert, AlertType } from './entity';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = name;
  appversion = version;
  user: User = new User();
  
  userActive: boolean = false;
  
  constructor(private _userService: UserService) {
    this.user.id = 0;
    if(localStorage.length > 0) {
      this.user.firstname = localStorage.getItem("USER")?.toString()!;
      this.user.id = parseInt(localStorage.getItem("USERID")!);
      this.userActive = true;
    }
    else {
      this.user = new User();
      this.user.id = 0;
      this.userActive = false;
    }
  }

  logout() {
    this._userService.logout();
    
    window.location.reload();
  }
}
