import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../entity/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: User[] = [];
  constructor(private _userService: UserService ) { }

  ngOnInit(): void {
    this._userService.getallusers().subscribe(
      data => { 
        this.users = data },
      error => {
        alert(error.message);
      }
    );
  }

}
