import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';
import { User } from '../entity';
import { UserService } from '../user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: User[] = [];
  constructor(private _userService: UserService, private _alertService: AlertService ) { }

  ngOnInit(): void {
    this._alertService.clear();
    
    this._userService.getallusers().subscribe(
      data => { 
        this.users = data;
        this._alertService.success("Get All Users success"); 
      },
      error => {
        this._alertService.error(error);
      }
    );
  }

}
