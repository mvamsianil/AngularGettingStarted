export class Login {
    username: string = "";
    password: string = "";
/*    constructor(public _username: string, public _password: string){
        this.username = _username;
        this.password = _password;
    }
*/
}

export class LoggedInUser {
    id: number = 0;
    firstname: string = '';
    lastname: string = '';
    username: string = '';
    token: string = '';
}