import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../shared/services/local.service';
import { UserService } from '../../shared/services/user.service';
import { UserInformation } from '../../shared/models/userInformation.model';
import * as shajs from 'sha.js';

@Component({
selector: 'app-user',
templateUrl: './user.component.html',
styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
display: boolean;
showDetails = false;
UserId: number;
addedSuccess: boolean;
newUser: UserInformation = new UserInformation();
updateUser: UserInformation = new UserInformation();
isNotValid: boolean;
searchUserName: string;
updateSuccess: boolean;
deleteSuccess: boolean;
user: UserInformation;
userPasswordHash: string;
constructor(private authGuardService: AuthGuardService,
private userService: UserService) { }


//////////// user
onAddingUser(Password: string) {
    this.isNotValid = false;
    this.addedSuccess = false;
    this.userPasswordHash = shajs('sha256').update(Password).digest('hex');
    this.newUser.Password = this.userPasswordHash.toUpperCase();
    const func: (b: boolean) => void = (b: boolean) => {
        this.addedSuccess = b;
        };
        this.userService.addUser(this.newUser, func);
        if (this.addedSuccess === false) {
        this.isNotValid = true;
    }
    }

    onEditUser() {
    this.isNotValid = false;
    this.updateSuccess = false;
    const func: (b: boolean) => void = (b: boolean) => {
        this.updateSuccess = b;
        };
        this.userService.editUser(this.searchUserName, this.updateUser, func);
        if (this.updateSuccess === false) {
            this.isNotValid = true;
        }
}

    onDeleteUser() {
    this.deleteSuccess = false;
    const func: ( b: boolean) => void = ( b: boolean) => {
        this.deleteSuccess = b;
    };
        this.userService.deleteUser(this.UserId, func);

    }

    onSearchUser() {
    const func: (a: UserInformation) => void = (a: UserInformation) => {
        this.user = a;
        if (!this.user) {
        this.showDetails = true;
        } else if (this.user) {
        this.display = true;
        }
    };
    this.userService.getUser(this.searchUserName, func);
}
    onResetUser() {
    this.showDetails = false;
    this.display = false;
    this.addedSuccess = false;
    this.isNotValid = false;
    this.searchUserName = '';
    this.updateUser = new UserInformation();
    this.newUser = new UserInformation();
    }

ngOnInit() {

if (this.authGuardService.checkLocalStorage()) {
    this.authGuardService.changeUser();
    }
}

}
