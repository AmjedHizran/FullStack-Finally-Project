import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../shared/services/account.service';
import { User } from '../shared/models/account-models';
import { OrderService } from '../shared/services/order.service';
import { Order } from '../shared/models/order.model';
import { CarPreview } from '../shared/models/Car-Preview.model';
import { CarPreviewService } from '../shared/services/car-preview.service';
import { CarService } from '../shared/services/car.service';
import { Car } from '../shared/models/car.model';
import { AuthGuardService } from '../shared/services/local.service';

@Component({
selector: 'app-car-price',
templateUrl: './car-price.component.html',
styleUrls: ['./car-price.component.css']
})
export class CarPriceComponent implements OnInit {

constructor(private route: ActivatedRoute, private router: Router ,
            private accountService: AccountService,
            private orderService: OrderService,
            private carPreviewService: CarPreviewService,
            private carService: CarService,
            private authGuardService: AuthGuardService) { }
carTypeID: any;
date: Date;
day: any;
month: any;
year: any;
afterConvert: any;
returnDay: any;
ReturnDate: any;
RentedDate: any;
dayDifference: any;
timeDifference: any;
ConvertStartD: any;
ConvertReturnD: any;
result: number;
startDateInput: Date;
returnDateInput: Date;
userInfo = new User();
isUser = false;
carPreview: CarPreview;
car: Car;
validDate: boolean;
branch: any;


Calculation() {
this.carTypeID = this.route.snapshot.paramMap.get('CarTypeID');
this.ConvertStartD = this.ConvertDate(this.startDateInput);
this.ConvertReturnD = this.ConvertDate(this.returnDateInput);
this.result = this.calculatingDifferenceBetweenDates(this.ConvertStartD, this.ConvertReturnD);
}
allCars() {
this.router.navigate(['./Cars']);
}


ConvertDate(dateToConvert: Date): any {
    this.date = new Date(dateToConvert);
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
if (this.day < 10) {
this.day = '0' + this.day;
}
if ( this.month < 10) {
this.month = '0' + this.month;
}
return this.afterConvert = this.year + '/' + this.month + '/' + this.day;
}

calculatingDifferenceBetweenDates(startDate: any, returnDate: any): any {
this.ReturnDate = new Date(returnDate);
this.RentedDate = new Date(startDate);
this.timeDifference = Math.abs(this.ReturnDate.getTime() - this.RentedDate.getTime());
this.dayDifference = Math.ceil(this.timeDifference / (1000 * 3600 * 24));
return this.dayDifference;
}
ngOnInit() {
    this.car = new Car();
    this.carPreview = new CarPreview();
if (this.authGuardService.checkLocalStorage()) {
    this.authGuardService.changeUser();
    }
this.carTypeID = this.route.snapshot.paramMap.get('CarTypeID');
this.branch = this.route.snapshot.paramMap.get('branch');

const func1: (c: CarPreview) => void = (c: CarPreview) => {
    this.carPreview = c;
    };
    this.carPreviewService.getCarPreview(this.carTypeID, func1);

    const func2: (c: Car) => void = (c: Car) => {
    this.car = c;
    };
    this.carService.getCar(this.carTypeID, func2);

    // this.newCarPreview = this.route.snapshot.data.get('carPrivew');
    if (localStorage.key(0) != null) {
    this.isUser = true;
    }
}

carOrder(CarTypeID: number , result: number , returnDateInput: Date , startDateInput: Date) {
this.router.navigate(['/Order', CarTypeID , result, returnDateInput, startDateInput , this.branch, this.car.CarID]);
}
}
