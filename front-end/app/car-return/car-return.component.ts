import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../shared/services/local.service';
import { CarService } from '../shared/services/car.service';
import { Car } from '../shared/models/car.model';
import { Order } from '../shared/models/order.model';
import { OrderService } from '../shared/services/order.service';
import { CarPreview } from '../shared/models/Car-Preview.model';
import { CarPreviewComponent } from '../Administrator/car-preview/car-preview.component';
import { CarPreviewService } from '../shared/services/car-preview.service';
import { Router } from '@angular/router';

@Component({
selector: 'app-car-return',
templateUrl: './car-return.component.html',
styleUrls: ['./car-return.component.css']
})
export class CarReturnComponent implements OnInit {

carNumber: number;
car: Car;
order: Order;
showDetails: boolean;
pause: boolean;
carPreview: CarPreview;
ConvertStartD: any;
ConvertReturnD: any;
result: number;
date: Date;
day: any;
month: any;
year: any;
afterConvert: any;
ReturnDate: any;
RentedDate: any;
dayDifference: any;
timeDifference: any;
updateCar: Car;
updateOrder: Order;
updateSuccess: boolean;
dateToday = new Date();
cost: number;
resultOverdue: any;
constructor(private authGuardService: AuthGuardService,
            private carService: CarService,
            private orderService: OrderService,
            private myCarPreviewService: CarPreviewService,
            private router: Router) {}
ngOnInit() {
if (this.authGuardService.checkLocalStorage()) {
    this.authGuardService.changeUser();
    }
    this.carPreview = new CarPreview();
    this.order = new Order();
    this.car = new Car();
}

ShowCar() {
    const date = new Date().getDate();
    console.log(date);
    const func2: (c: Car) => void = (c: Car) => {
        this.car = c;
        this.getOrder(this.car.CarTypeID, this.car.CarID);
        };
        this.carService.getCarByCarNumber(this.carNumber, func2);
}

getOrder(CarTypeID: number , CarID: number) {
const func1: (c: CarPreview) => void = (c: CarPreview) => {
    this.carPreview = c;
    };
    this.myCarPreviewService.getCarPreview(CarTypeID, func1);
const func: (a: Order) => void = (a: Order) => {
    this.order = a;
    };
    this.orderService.getOrderByCarId(CarID , func);
}

updateActualReturnDate() {
    this.returnCar();
    this.updateOrder = new Order();
    this.updateOrder.OrderId = this.order.OrderId;
    this.updateOrder.CarID = this.order.CarID;
    this.updateOrder.UserID = this.order.UserID;
    this.updateOrder.RentedDate = this.order.RentedDate;
    this.updateOrder.ReturnDate = this.order.ReturnDate;
    this.updateOrder.ActualReturnDate = new Date();

    const func1: (b: boolean) => void = (b: boolean) => {
    this.updateSuccess = b;
    };
    this.orderService.editOrder(this.order.OrderId, this.updateOrder, func1);
    if (this.ConvertDate(this.order.ReturnDate) ===  this.ConvertDate(new Date())) {
        console.log('equal');
    this.ConvertStartD = this.ConvertDate(this.order.RentedDate);
    this.ConvertReturnD = this.ConvertDate(this.order.ReturnDate);
    this.result = this.calculatingDifferenceBetweenDates(this.ConvertStartD, this.ConvertReturnD);
    this.cost = this.result * this.carPreview.DailyCost;
    return;
    }
    if (this.ConvertDate(this.order.ReturnDate) <  this.ConvertDate(new Date())) {
        const StartD = this.ConvertDate(this.order.ReturnDate);
        const ReturnD = this.ConvertDate(new Date());
       this.resultOverdue = this.calculatingDifferenceBetweenDates(StartD, ReturnD);
        console.log('resultOverdue = '  +  this.resultOverdue);
        this.ConvertStartD = this.ConvertDate(this.order.RentedDate);
        this.ConvertReturnD = this.ConvertDate(new Date());
        this.result = this.calculatingDifferenceBetweenDates(this.ConvertStartD, this.ConvertReturnD);
        this.cost = this.result * this.carPreview.DailyCost + this.carPreview.CostOfDayOverdue * this.resultOverdue;
        return;
        }
     if (this.ConvertDate(this.order.ReturnDate) >  this.ConvertDate(new Date())) {
    this.ConvertStartD = this.ConvertDate(this.order.RentedDate);
    this.ConvertReturnD = this.ConvertDate(new Date());
    this.result = this.calculatingDifferenceBetweenDates(this.ConvertStartD, this.ConvertReturnD);
    this.cost = this.result * this.carPreview.DailyCost;
    return;
     }
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

returnCar() {
this.updateCar = new Car();
this.updateCar.CarID = this.car.CarID;
this.updateCar.CarNumber = this.car.CarNumber;
this.updateCar.CarTypeID = this.car.CarTypeID;
this.updateCar.CurrentKilometrage = this.car.CurrentKilometrage;
this.updateCar.Image = this.car.Image;
this.updateCar.IsProperToRent = true;
this.updateCar.LocatedAtTheBranch = this.car.LocatedAtTheBranch;

const func1: (b: boolean) => void = (b: boolean) => {
    this.updateSuccess = b;
};
this.carService.editCar(this.car.CarNumber, this.updateCar, func1);
}

goBack() {
this.router.navigate(['/']);

}
}
