import {Injectable, Output, EventEmitter} from '@angular/core';
import {Car} from './../models/car.model';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class CarService {
constructor(private myHttpClient: HttpClient) {}


getAllCars (callBack: (b: Array<Car>) => void): void {
    this.myHttpClient.get<Array<Car>>('http://localhost:50320/api/Car/ALL')
    .subscribe(callBack);
}

getCar(CarTypeID: number, callBack: (b: Car) => void): void {
    this.myHttpClient.get<Car>('http://localhost:50320/api/car/' + CarTypeID)
    .subscribe(
        callBack
    );
}
getCarById(CarID: number, callBack: (b: Car) => void): void {
    this.myHttpClient.get<Car>('http://localhost:50320/api/car/carId/' + CarID)
    .subscribe(
        callBack
    );
}

getCarByCarNumber(carNumber: number, callBack: (b: Car) => void): void {
    this.myHttpClient.get<Car>('http://localhost:50320/api/car/number/' + carNumber)
    .subscribe(
        callBack
    );
}



deleteCar(CarID: number, callBack: (b: boolean) => void): void {
this.myHttpClient.delete<boolean>('http://localhost:50320/api/car/delete/' + CarID)
.subscribe(
    callBack
);
}


addCar(car: Car, callBack: (b: boolean) => void): void {
    this.myHttpClient.post<boolean>('http://localhost:50320/api/car/add/', car)
    .subscribe(
        callBack
    );

}

editCar(CarNumber: number , car: Car, callBack: (b: boolean) => void): void {
    this.myHttpClient.put<boolean>('http://localhost:50320/api/car/edit/' + CarNumber, car)
    .subscribe(
        callBack
    );
}
}
