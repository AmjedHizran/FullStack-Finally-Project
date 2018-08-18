import { Injectable, Output, EventEmitter } from '@angular/core';
import { Car } from './../models/car.model';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from '../models/account-models';
import { UserInformation } from '../models/userInformation.model';


@Injectable()
export class RegisterService {
constructor(private myHttpClient: HttpClient) { }

addUser(user: RegisterUser, callBack: (b: boolean) => void): void {
    this.myHttpClient.post<boolean>('http://localhost:50320/api/user/add/', user)
        .subscribe(
            callBack
        );
}

}
