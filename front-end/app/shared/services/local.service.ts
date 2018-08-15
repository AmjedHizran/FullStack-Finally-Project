import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/account-models';
import { AccountService } from './account.service';
import { LocalSt } from '../models/account-models/localSt.model';

@Injectable()
export class AuthGuardService  {
constructor(private router: Router,
private accountService: AccountService) {}

userName: string;
password: string;
role: string;

checkLocalStorage() {

const roleDict = {
    Buyer: '88f34e60-f3ab-4950-b80e-f10ef430d8cd',
    Seller: '74e13610-e7bb-4f35-8683-fa4f3bf4c7b0',
    Administrator: '30ddb97d-5077-4e42-a030-91f4654bb656'
};
function swap(json) {
    const ret = {};
    // tslint:disable-next-line:forin
    for (const key in json) {
        ret[json[key]] = key;
    }
    return ret;
    }
    if (localStorage.getItem('username ') != null) {
    this.userName = localStorage.getItem('username' );
    this.password = localStorage.getItem('password' );
    this.role = swap(roleDict)[localStorage.getItem('RoleName' )];
    return true;
    }
    return false;
}

changeUser() {
this.accountService.userEventEmitter.emit(new User(localStorage.getItem('username '), ''));
this.accountService.localStorageEventEmitter.emit(new LocalSt(this.role , this.password , this.userName));
}
}
