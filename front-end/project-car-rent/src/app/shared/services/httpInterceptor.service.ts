// import { Injectable, Injector } from '@angular/core';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient } from '@angular/common/http';
// //import { Observable } from 'rxjs/Observable';
// import { catchError } from 'rxjs/operators';
// import { Router } from '@angular/router';
// //import { Observable } from 'rxjs';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
// import { Observable, Subject, throwError } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { observable } from 'rxjs/internal/symbol/observable';

// @Injectable()
// export class MyHttpInterceptor  {
// constructor(private router: Router,
//             private http: HttpClient) { }

            

// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log('intercepted request ... ');
//     if (localStorage.getItem('RoleName') === '30ddb97d-5077-4e42-a030-91f4654bb656') {
//         console.log('Administrator');
//         // tslint:disable-next-line:max-line-length
//         const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer' + '' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFtamVkODciLCJyb2xlIjoiQWRtaW5pc3RyYXRvciIsIm5iZiI6MTUyMzcxMjkyMSwiZXhwIjoxNTI2MzA0OTIxLCJpYXQiOjE1MjM3MTI5MjF9.EyKtr7tQ0OeLYD_6mTpbqlkoxgrPCnasQGP6TU2rYy8')});
//         // send the newly created request
//         return next.handle(authReq) 
//         catchError((error:any, caught:Observable<any>) => {
//         // intercept the respons error and displace it to the console
//         console.log('Error Occurred');
//         console.log(error);
//     // return the error to the method that called it
//         return Observable.throw(error);
//         }) as any;
//     } else if (localStorage.getItem('RoleName') === '88f34e60-f3ab-4950-b80e-f10ef430d8cd') {

//         console.log('Buyer');

//         // tslint:disable-next-line:max-line-length
//         const authReq1 = req.clone({ headers: req.headers.set('Authorization', 'Bearer' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImZyZWVkIiwicm9sZSI6IkJ1eWVyIiwibmJmIjoxNTIzNTY1NzE4LCJleHAiOjE1MjYxNTc3MTgsImlhdCI6MTUyMzU2NTcxOH0.8VeKoBW1l_r3T45WAm9W3S47lUx5kYtRIbenYKEhC9s' )});
//         // send the newly created request
//         return next.handle(authReq1)
//         .catch((error, caught) => {
//         // intercept the respons error and displace it to the console
//         console.log('Error Occurred');
//         console.log(error);
//     // return the error to the method that called it
//         return Observable.throw(error);
//         }) as any;
//     } else if (localStorage.getItem('RoleName') === '74e13610-e7bb-4f35-8683-fa4f3bf4c7b0') {

//         console.log('Seller');

//         // tslint:disable-next-line:max-line-length
//         const authReq2 = req.clone({ headers: req.headers.set('Authorization', 'Bearer' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImRhbjEyMyIsInJvbGUiOiJTZWxsZXIiLCJuYmYiOjE1MjM1NjU4MzYsImV4cCI6MTUyNjE1NzgzNiwiaWF0IjoxNTIzNTY1ODM2fQ.zm_BnmDQP8OPZG1qrJy3wnp1NaYXq-XjgD4Z8Uvh7lU' )});
//         // send the newly created request
//         return next.handle(authReq2)
//         .catch((error, caught) => {
//         // intercept the respons error and displace it to the console
//         console.log('Error Occurred');
//         console.log(error);
//     // return the error to the method that called it
//         return Observable.throw(error);
//         }) as any;
//     } else {
//     const authReq3 = req.clone({ headers: req.headers.set('Authorization', 'Bearer')});
//     console.log('Sending request with new header now ...');
//         // send the newly created request
//         return next.handle(authReq3)
//         .catch((error, caught) => {
//         // intercept the respons error and displace it to the console
//         console.log('Error Occurred');
//         console.log(error);
//     // return the error to the method that called it
//         return Observable.throw(error);
//         }) as any;
//     // Clone the request to add the new header.
//     }
// }
// }
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        //Retrieve accesstoken from local storage
        const accessToken = localStorage.getItem("RoleName");

        //Check if accesToken exists, else send request without bearer token
        if (accessToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer' )});

            console.log('Token added to HTTP request');

            return next.handle(cloned);
        }
        else {
            //No token; proceed request without bearer token
            console.log('No token added to HTTP request');
            return next.handle(req);
        }
    }
}