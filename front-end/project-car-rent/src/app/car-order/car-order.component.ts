import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/models/order.model';
import { OrderService } from '../shared/services/order.service';
import { CarPreview } from '../shared/models/Car-Preview.model';
import { CarPreviewService } from '../shared/services/car-preview.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/account-models';
import { UserService } from '../shared/services/user.service';
import { UserInformation } from '../shared/models/userInformation.model';
import { AuthGuardService } from '../shared/services/local.service';
import { Car } from '../shared/models/car.model';
import { CarService } from '../shared/services/car.service';

@Component({
selector: 'app-car-order',
templateUrl: './car-order.component.html',
styleUrls: ['./car-order.component.css']
})
export class CarOrderComponent implements OnInit {

constructor(private orderService: OrderService,
            private carPreviewService: CarPreviewService,
            private router: Router,
            private route: ActivatedRoute,
            private userService: UserService,
            private authGuardService: AuthGuardService,
            private carService: CarService) { }

carTypeID: any;
addedSuccess: boolean;
newOrder: Order;
returnDateInput: any;
startDateInput: any;
carPreview: CarPreview;
isUser = false;
result: any;
branch: any;
CarID: any;
user: UserInformation;
orderList: Array< Order> = new Array<Order>();
car: Car;
updateCar: Car;
updateSuccess: boolean;

ngOnInit() {
if (this.authGuardService.checkLocalStorage()) {
    this.authGuardService.changeUser();
    }
    this.carPreview = new CarPreview();
    this.user = new UserInformation();
this.carTypeID = this.route.snapshot.paramMap.get('CarTypeID');
this.startDateInput = this.route.snapshot.paramMap.get('startDateInput');
this.returnDateInput = this.route.snapshot.paramMap.get('returnDateInput');
this.result = this.route.snapshot.paramMap.get('result');
this.branch = this.route.snapshot.paramMap.get('branch');
this.CarID = this.route.snapshot.paramMap.get('CarID');
if (localStorage.getItem('username ') != null) {
    this.isUser = true;
    const func2: (c: UserInformation) => void = (c: UserInformation) => {
        this.user = c;
        };
        this.userService.getUser(localStorage.getItem('username '), func2);
    }
    const func1: (c: Car) => void = (c: Car) => {
        this.car = c;
        };
        this.carService.getCarById(this.CarID, func1);

    const func3: (c: CarPreview) => void = (c: CarPreview) => {
        this.carPreview = c;
        };
        this.carPreviewService.getCarPreview(this.carTypeID, func3);
}



allCars() {
this.router.navigate(['./Cars']);
}
rentCar() {
    // this.car.IsProperToRent = false;
this.addedSuccess = false;
const func: (b: boolean) => void = (b: boolean) => {
    this.addedSuccess = b;
    };
    this.orderService.addOrder(this.newOrder = new Order(this.user.UserID , this.CarID, this.startDateInput , this.returnDateInput), func);
    this.updateCar = new Car();
    this.updateCar.CarID = this.car.CarID;
    this.updateCar.CarNumber = this.car.CarNumber;
    this.updateCar.CarTypeID = this.car.CarTypeID;
    this.updateCar.CurrentKilometrage = this.car.CurrentKilometrage;
    this.updateCar.Image = this.car.Image;
    this.updateCar.IsProperToRent = false;
    this.updateCar.LocatedAtTheBranch = this.car.LocatedAtTheBranch;

    const func1: (b: boolean) => void = (b: boolean) => {
    this.updateSuccess = b;
    };
    this.carService.editCar(this.car.CarNumber, this.updateCar, func1);
}
}

