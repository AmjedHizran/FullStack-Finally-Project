import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, empty, throwError, of } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { error } from "@angular/compiler/src/util";
import { catchError } from 'rxjs/operators';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

 intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

    //Retrieve accesstoken from local storage
    const accessToken = localStorage.getItem("RoleName");

    //Check if accesToken exists, else send request without bearer token
   if(accessToken){
    switch(localStorage.getItem("RoleName")){ 
        case '30ddb97d-5077-4e42-a030-91f4654bb656': { 
            console.log('Administrator');
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer' + '' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFtamVkODciLCJyb2xlIjoiQWRtaW5pc3RyYXRvciIsIm5iZiI6MTUyMzcxMjkyMSwiZXhwIjoxNTI2MzA0OTIxLCJpYXQiOjE1MjM3MTI5MjF9.EyKtr7tQ0OeLYD_6mTpbqlkoxgrPCnasQGP6TU2rYy8')});     
            // send the newly created request
            console.log('Token added to HTTP request');

            return next.handle(cloned);  
        } 
        case '88f34e60-f3ab-4950-b80e-f10ef430d8cd': { 
            console.log('Buyer');
            const cloned = req.clone({ 
            headers: req.headers.set('Authorization', 'Bearer' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImZyZWVkIiwicm9sZSI6IkJ1eWVyIiwibmJmIjoxNTIzNTY1NzE4LCJleHAiOjE1MjYxNTc3MTgsImlhdCI6MTUyMzU2NTcxOH0.8VeKoBW1l_r3T45WAm9W3S47lUx5kYtRIbenYKEhC9s' )});
            // send the newly created request
            console.log('Token added to HTTP request');
            return next.handle(cloned); 
        } 
        case '74e13610-e7bb-4f35-8683-fa4f3bf4c7b0': {
            console.log('Seller');
            const cloned = req.clone({ headers: req.headers.set('Authorization', 'Bearer' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImRhbjEyMyIsInJvbGUiOiJTZWxsZXIiLCJuYmYiOjE1MjM1NjU4MzYsImV4cCI6MTUyNjE1NzgzNiwiaWF0IjoxNTIzNTY1ODM2fQ.zm_BnmDQP8OPZG1qrJy3wnp1NaYXq-XjgD4Z8Uvh7lU' )});
            // send the newly created request
            console.log('Token added to HTTP request');
            return next.handle(cloned);    
        }  
        default: { 
            //No token; proceed request without bearer token
            console.log('No token added to HTTP request');
            const cloned = req.clone({ headers: req.headers.set('Authorization', 'Bearer')});
            console.log('Sending request with new header now ...');
            // send the newly created request
            return next.handle(cloned);              
          } 
       }
    } else{
         //No token; proceed request without bearer token
            console.log('No token added to HTTP request');
                return next.handle(req).pipe(catchError((response: any) => {
                    if (response instanceof HttpErrorResponse) {
                      if (response.status === 0) {
                        console.log('error catched');
                        console.log('server down');
              
                        return empty();
                      }
                      if(response.status === 401){
                        console.log('error catched');
                        console.log('status code 401');
              
                        return empty();
                      }
                    }
                    return throwError(response);
                })
            );
        }
    }
}