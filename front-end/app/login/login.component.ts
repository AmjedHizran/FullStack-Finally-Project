import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AccountService } from './../shared/services/account.service';
import { LoginUser, User } from './../shared/models/account-models/index';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserInformation } from '../shared/models/userInformation.model';
import { UserService } from '../shared/services/user.service';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { Key } from 'protractor';
import { LocalSt } from '../shared/models/account-models/localSt.model';
import { AuthGuardService } from '../shared/services/local.service';
import * as shajs from 'sha.js';
import { UpperCasePipe } from '@angular/common';

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
userPasswordHash: string;
state: RouterStateSnapshot;
loading = false;
loginForm: FormGroup;
loginUser: LoginUser;
userInformation: UserInformation[];
userNotFound: boolean;
logain: string[];
hasUser;
user = new UserInformation();
token: string;

private subscription: Subscription;

constructor(private accountService: AccountService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authGuardService: AuthGuardService) {
    this.createForm();
}

ngOnInit() {

    if (this.authGuardService.checkLocalStorage()) {
        this.loginForm.value.userName = localStorage.getItem('username ');
        this.loginForm.value.userPassword = localStorage.getItem('password ');
        this.changeUser();
    } else { this.createForm(); }

    const func: (c: Array<UserInformation>) => void = (c: Array<UserInformation>) => {
        this.userInformation = c;
    };
    this.userService.getAllUsers(func);
}


createForm() {
    this.loginForm = this.fb.group({
        userName: ['Moshiko', LoginUser.userNameValidators],
        userPassword: ['123456', LoginUser.userPasswordValidators]
    });
}

checkUser() {
    this.loading = true;
    this.userPasswordHash = shajs('sha256').update(this.loginForm.value.userPassword).digest('hex');
    this.hasUser = this.userInformation.find((value) => {
        if (value.UserName === this.loginForm.value.userName && value.Password ===  this.userPasswordHash.toUpperCase()) {
            this.user.RoleName = value.RoleName;
            return value.UserName === this.loginForm.value.userName && value.Password === this.userPasswordHash.toUpperCase();
        }
    });

    const roleDict = {
        Buyer: '88f34e60-f3ab-4950-b80e-f10ef430d8cd',
        Seller: '74e13610-e7bb-4f35-8683-fa4f3bf4c7b0',
        Administrator: '30ddb97d-5077-4e42-a030-91f4654bb656'
    };
    if (this.hasUser) {
        // generate token
        const func2: (o: string) => void = (o: string) => {
        this.token = o;
        localStorage.setItem('Token', this.token);
    };
    this.userService.generateToken(this.loginForm.value.userName , this.userPasswordHash.toUpperCase(), func2);

        localStorage.setItem('username ', this.loginForm.value.userName);
        localStorage.setItem('password', this.userPasswordHash);
        localStorage.setItem('RoleName', roleDict[this.user.RoleName]);

        this.userNotFound = false;
        this.loading = false;
        this.changeUser();
    } else {
        this.showMessage();
    }
    return this.hasUser;
}
changeUser() {
    console.log('this.loginForm', this.loginForm.value);
    this.accountService.userEventEmitter.emit(new User(this.loginForm.value.userName, ''));
    this.accountService.localStorageEventEmitter.emit(new LocalSt(
        this.user.RoleName, this.loginForm.value.userPassword, this.loginForm.value.userName));
    this.router.navigate(['/Home']);
}

showMessage() {
    const that = this;
    that.userNotFound = true;
    setTimeout(function () {
        that.userNotFound = false;
    }, 1500);
}

}
