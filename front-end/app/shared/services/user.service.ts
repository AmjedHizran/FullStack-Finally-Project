import {Injectable, Output, EventEmitter} from '@angular/core';
import {Car} from './../models/car.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserInformation } from '../models/userInformation.model';


@Injectable()
export class UserService {
readonly rootUrl = 'http://localhost:50320/api';
constructor(private myHttpClient: HttpClient) {}

generateToken(UserName: string , userPassword: string, callBack: (token: string) => void): void {
const data = 'username=' + UserName + '&password=' + userPassword ;
    // tslint:disable-next-line:max-line-length
    this.myHttpClient.get<string>('http://localhost:50320/api/token/GenerateToken?' + data)
        .subscribe(
            callBack
        );
}

getAllUsers(callBack: (b: Array<UserInformation>) => void): void {
    this.myHttpClient.get<Array<UserInformation>>('http://localhost:50320/api/User/ALL')
    .subscribe(callBack);
}

getUser(UserName: string, callBack: (b: UserInformation) => void): void {
    this.myHttpClient.get<UserInformation>('http://localhost:50320/api/user/' + UserName)
    .subscribe(
        callBack
    );
}

deleteUser(UserID: number, callBack: (b: boolean) => void): void {
this.myHttpClient.delete<boolean>('http://localhost:50320/api/user/delete/' + UserID)
.subscribe(
    callBack
);
}


addUser(user: UserInformation, callBack: (b: boolean) => void): void {
this.myHttpClient.post<boolean>('http://localhost:50320/api/user/add/', user)
.subscribe(
    callBack
);
}

editUser(userName: string , user: UserInformation, callBack: (b: boolean) => void): void {
    this.myHttpClient.put<boolean>('http://localhost:50320/api/user/edit/' + userName, user)
    .subscribe(
        callBack
    );
}
}
