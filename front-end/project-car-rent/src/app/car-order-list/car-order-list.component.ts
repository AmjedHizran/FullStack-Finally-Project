import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/models/order.model';
import { OrderService } from '../shared/services/order.service';
import { UserInformation } from '../shared/models/userInformation.model';
import { User } from '../shared/models/account-models';
import { UserService } from '../shared/services/user.service';
import { equal } from 'assert';
import { Car } from '../shared/models/car.model';
import { CarService } from '../shared/services/car.service';
import { Router } from '@angular/router';
import { StoreInfo } from '../shared/models/storeInfo.model';
import { AuthGuardService } from '../shared/services/local.service';
import { element } from 'protractor';

@Component({
selector: 'app-car-order-list',
templateUrl: './car-order-list.component.html',
styleUrls: ['./car-order-list.component.css']
})
export class CarOrderListComponent implements OnInit {

allOrders: Array< Order> = new Array<Order>();
user: UserInformation;
orderFilteredList: Array<Order> = new Array<Order>();
allOrdersCarId: number[];
allCars: Array<Car> = new Array<Car>();
allCarsOrdered: Car[];
allFilteredCarID: Array<Car> = new Array<Car>();
carFilteredList: Array<Order> = new Array<Order>();
storeInfo: StoreInfo;
clicked = true;
storageId: number;
carOrdered: Array<Car> = new Array<Car>();

constructor(private orderService: OrderService,
        private userService: UserService,
        private carService: CarService,
        private router: Router,
        private authGuardService: AuthGuardService) {}

ngOnInit() {
if (this.authGuardService.checkLocalStorage()) {
this.authGuardService.changeUser();
}
const func2: (c: UserInformation) => void = (c: UserInformation) => {
this.user = c;
this.storageId = this.user.UserID;
};
this.userService.getUser(localStorage.getItem('username '), func2);

const func1: (c: Array<Order>) => void = (c: Array<Order>) => {
this.allOrders = c;
};
this.orderService.getAllOrders(func1);

const func3: (c: Array<Car>) => void = (c: Array<Car>) => {
this.allCars = c;
this.filter();
this.filter();
};
this.carService.getAllCars(func3);

this.storeInfo = new StoreInfo();
this.storeInfo.storeName = 'Aerorenta car';
this.storeInfo.mainImage = 'https://www.aerorentacar.com/CarsForSale/AeroStoreFrontA.jpg';

}
toAllCars() {
this.router.navigate(['./Cars']);
}
filter() {
this.clicked = false;
this.orderFilteredList = this.allOrders.filter((order: Order) => order.UserID === this.storageId);
this.allOrders = this.orderFilteredList;
this.carFilteredList = this.allOrders.filter((order: Order ) => order.CarID !== -1);

for (let i = 0 ; i < this.carFilteredList.length; i++) {
//  if (this.allCars[i].CarID = this.carFilteredList[i].CarID) {
//     console.log(this.allCars[i]);
//  this.allCarsOrdered[i] = this.allCars[i];
// }
this.carOrdered[i] = new Car();
const func1: (c: Car) => void = (c: Car) => {
    this.carOrdered[i] = c;
    };
    this.carService.getCarById(this.carFilteredList[i].CarID , func1);
 }
 return this.carOrdered;
}

orderDetails(carID: number , carTypeId: number, rentedDate: Date , returnDate: Date , actualReturnDate: Date) {
this.router.navigate(['./OrderDetails', carID , carTypeId , rentedDate , returnDate , actualReturnDate]);
}
}
