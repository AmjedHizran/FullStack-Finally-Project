import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/models/order.model';
import { OrderService } from '../../shared/services/order.service';
import { AuthGuardService } from '../../shared/services/local.service';
import { NumberFormatStyle } from '@angular/common';
//import { empty } from 'rxjs/Observer';

@Component({
selector: 'app-order',
templateUrl: './order.component.html',
styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
display: boolean;
showDetails: boolean;
searchOrderId: number;
deleteOrderId: number;
addedSuccess: boolean;
newOrder: Order = new Order();
updateOrder: Order = new Order();
isNotValid: boolean;
searchUserName: string;
updateSuccess: boolean;
deleteSuccess: boolean;
order: Order;

constructor(private authGuardService: AuthGuardService,
private orderService: OrderService) { }

    ////////////////////// Order
    onAddingOrder() {
    this.isNotValid = false;
    this.addedSuccess = false;
    const func: (b: boolean) => void = (b: boolean) => {
        this.addedSuccess = b;
        };
        this.orderService.addOrder(this.newOrder, func);
        if (this.addedSuccess === false) {
        this.isNotValid = true;
    }
    }

    onEditOrder() {
    this.isNotValid = false;
    this.updateSuccess = false;
    const func: (b: boolean) => void = (b: boolean) => {
        this.updateSuccess = b;
        };
        this.orderService.editOrder(this.searchOrderId, this.updateOrder, func);
        if (this.updateSuccess === false) {
            this.isNotValid = true;
        }
}

    onDeleteOrder() {
    this.deleteSuccess = false;
    const func: ( b: boolean) => void = ( b: boolean) => {
        this.deleteSuccess = b;
    };
        this.orderService.deleteOrder(this.deleteOrderId, func);

    }

    onSearchOrder() {
    const func: (a: Order) => void = (a: Order) => {
        this.order = a;
        if (!this.order) {
            this.showDetails = true;
            } else if (this.order) {
            this.display = true;
            }
        };
        this.orderService.getOrder(this.searchOrderId, func);
    }
    onResetOrder() {
    this.showDetails = false;
    this.display = false;
    this.addedSuccess = false;
    this.isNotValid = false;
    this.updateOrder = new Order();
    this.newOrder = new Order();
    }


ngOnInit() {

if (this.authGuardService.checkLocalStorage()) {
    this.authGuardService.changeUser();
    }
}

}
