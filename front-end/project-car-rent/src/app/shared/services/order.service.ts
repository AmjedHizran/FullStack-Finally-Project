import {Injectable, Output, EventEmitter} from '@angular/core';
import {Car} from './../models/car.model';
import {HttpClient} from '@angular/common/http';
import { Order } from '../models/order.model';


@Injectable()
export class OrderService {
constructor(private myHttpClient: HttpClient) {}


getAllOrders (callBack: (b: Array<Order>) => void): void {
    this.myHttpClient.get<Array<Order>>('http://localhost:50320/api/Order/ALL')
    .subscribe(callBack);
}

getOrder(OrderID: number, callBack: (b: Order) => void): void {
    this.myHttpClient.get<Order>('http://localhost:50320/api/Order/' + OrderID)
    .subscribe(
        callBack
    );
}

getOrderByCarId(CarId: number, callBack: (b: Order) => void): void {
    this.myHttpClient.get<Order>('http://localhost:50320/api/Order/car/' + CarId)
    .subscribe(
        callBack
    );
}


deleteOrder(OrderID: number, callBack: (b: boolean) => void): void {
this.myHttpClient.delete<boolean>('http://localhost:50320/api/Order/delete/' + OrderID)
.subscribe(
    callBack
);
}


addOrder(order: Order, callBack: (b: boolean) => void): void {
    this.myHttpClient.post<boolean>('http://localhost:50320/api/Order/add/', order)
    .subscribe(
        callBack
    );

}

editOrder(orderId: number , order: Order, callBack: (b: boolean) => void): void {
    this.myHttpClient.put<boolean>('http://localhost:50320/api/Order/edit/' + orderId, order)
    .subscribe(
        callBack
    );
}
}
