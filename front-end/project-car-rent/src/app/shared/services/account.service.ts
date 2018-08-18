import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser, User } from './../models/account-models/index';
import { Router } from '@angular/router';
import { LocalSt } from '../models/account-models/localSt.model';

@Injectable()
export class AccountService {
userEventEmitter: EventEmitter<User> = new  EventEmitter<User>();
localStorageEventEmitter: EventEmitter<LocalSt> = new  EventEmitter<LocalSt>();

constructor(private router: Router) {}

}
