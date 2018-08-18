import {Pipe , PipeTransform , Injectable } from '@angular/core';

@Pipe({
name: 'appOrder'
})
@Injectable()
export class FilterOrders implements PipeTransform {

transform(orders: any[], field: string, value: string): any[] {
    if (!orders) {return []; }
    if (!field || !value) {return orders; }

    return orders.filter( order => order[field].toLowerCase().includes(value.toLowerCase()));
}
}



