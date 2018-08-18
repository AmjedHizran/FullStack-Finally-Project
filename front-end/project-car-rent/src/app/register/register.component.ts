import { Component, OnInit } from '@angular/core';
import { RegisterUser } from './../shared/models/account-models/index';
import { RegisterService } from '../shared/services/register.service';
import * as shajs from 'sha.js';

@Component({
selector: 'app-register',
templateUrl: './register.component.html',
styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
addedSuccess: boolean;
newUser: RegisterUser = new RegisterUser();
isNotValid: boolean;
userPasswordHash: string;
token: string;
constructor(private registerService: RegisterService ) { }

onAddingUser(Password: string) {
console.log('password = ' + Password);
this.isNotValid = false;
this.addedSuccess = false;
this.userPasswordHash = shajs('sha256').update(Password).digest('hex');
this.newUser.Password = this.userPasswordHash.toUpperCase();
// register
const func1: (b: boolean) => void = (b: boolean) => {
        this.addedSuccess = b;
    };
    this.registerService.addUser(this.newUser, func1);
    if (this.addedSuccess === false) {
    this.isNotValid = true;
}
}
onResetUser() {
this.addedSuccess = false;
this.newUser = new RegisterUser();
this.isNotValid = false;
}

//   click() {
//     const func2: (o: any) => void = (o: any) => {
//         this.token = o.token;
//         // todo: save to storage
//    };
//    this.registerService.generateToken(this.newUser.UserName , this.newUser.Password , func2);
//   }

ngOnInit() {
}

}
