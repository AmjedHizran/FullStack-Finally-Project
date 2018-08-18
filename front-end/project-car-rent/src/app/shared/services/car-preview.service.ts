import {Injectable, Output, EventEmitter} from '@angular/core';
import {CarPreview} from './../models/Car-Preview.model';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class CarPreviewService {
constructor(private myHttpClient: HttpClient) {}

getAllCarPreview (callBack: (b: Array<CarPreview>) => void): void {
    this.myHttpClient.get<Array<CarPreview>>('http://localhost:50320/api/CarType/all/')
    .subscribe(callBack);
}

getCarPreview(CarTypeID: number, callBack: (b: CarPreview) => void): void {
    this.myHttpClient.get<CarPreview>('http://localhost:50320/api/CarType/' + CarTypeID)
    .subscribe(
        callBack
    );
}

deleteCarPreview(CarID: number, callBack: (b: boolean) => void): void {
this.myHttpClient.delete<boolean>('http://localhost:50320/api/CarType/delete/' + CarID)
.subscribe(
    callBack
);
}


addCarPreview(carPreview: CarPreview, callBack: (b: boolean) => void): void {
    this.myHttpClient.post<boolean>('http://localhost:50320/api/CarType/add/', carPreview)
    .subscribe(
        callBack
    );

}

editCarPreview(CarTypeID: number , carPreview: CarPreview, callBack: (b: boolean) => void): void {
    this.myHttpClient.put<boolean>('http://localhost:50320/api/CarType/edit/' + CarTypeID, carPreview)
    .subscribe(
        callBack
    );
}
}
