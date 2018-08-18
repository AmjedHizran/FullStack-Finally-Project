import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/account-models';
import { AccountService } from '../shared/services/account.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../shared/services/local.service';
import { UserInformation } from '../shared/models/userInformation.model';
import { UserService } from '../shared/services/user.service';
import { LocalSt } from '../shared/models/account-models/localSt.model';

@Component({
selector: 'app-header',
templateUrl: './header.component.html',
styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

local: LocalSt;
constructor(private accountService: AccountService,
private router: Router,
private authGuardService: AuthGuardService) {}

userInfo = new User('Guest', './../assets/images/profile.png');
ngOnInit() {
    this.local = new LocalSt();
    this.accountService.localStorageEventEmitter.subscribe((x) => {
        this.local = x;
    });
    this.accountService.userEventEmitter.subscribe((x) => {
        this.userInfo = x;
    });

}
    logout() {
    localStorage.clear();
    const userInfo = new User('Guest', './../assets/images/profile.png');
    this.accountService.userEventEmitter.emit(userInfo);
    this.router.navigate(['home']);
}
}
