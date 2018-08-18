import { Component, OnInit, OnDestroy } from '@angular/core';
import { Car } from '../shared/models/car.model';
import { CarService } from '../shared/services/car.service';
//import { DxTooltipModule } from 'devextreme-angular';
import { AppModule } from '../app.module';
import { Router } from '@angular/router';
import { isNull } from 'util';
import { CarPreview } from '../shared/models/Car-Preview.model';
import { CarPreviewService } from '../shared/services/car-preview.service';
import { CarPriceComponent } from '../car-price/car-price.component';
import { locateHostElement } from '@angular/core/src/render3/instructions';
import { getLocaleTimeFormat } from '@angular/common';
import { AuthGuardService } from '../shared/services/local.service';


@Component({
selector: 'app-cars',
templateUrl: './cars.component.html',
styleUrls: ['./cars.component.css']
})

export class CarsComponent implements OnInit {
click = false;
carList: Array< Car> = new Array< Car>();
carTypeID: number;
search: string;
carPreview: CarPreview[];
findCar: any;
day = new Date().getDate();
fullDate = new Date().toLocaleDateString();
year = (new Date).getFullYear();
Clear() {
    this.click = false;
}

constructor( private myCarService: CarService,
private carPreviewService: CarPreviewService,
private router: Router,
private authGuardService: AuthGuardService) {}

ngOnInit() {
    if (this.authGuardService.checkLocalStorage()) {
        this.authGuardService.changeUser();
        }
    const func1: (c: Array<Car>) => void = (c: Array<Car>) => {
        this.carList = c;
    };
    this.myCarService.getAllCars(func1);

    const func2: (b: Array<CarPreview>) => void = (b: Array<CarPreview>) => {
        this.carPreview = b;
        };
        this.carPreviewService.getAllCarPreview(func2);

    // this.findCar = this.carList.find((value) => {
        //  return value.CarTypeID === this.carTypeID;
    // });

}

carDetails(CarTypeID: number , LocatedAtTheBranch: number) {
            this.carTypeID = CarTypeID;
    this.router.navigate(['/CarDetails', CarTypeID , LocatedAtTheBranch]);
}

}
