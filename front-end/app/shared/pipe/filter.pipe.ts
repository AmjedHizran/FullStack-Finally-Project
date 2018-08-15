
import {Pipe , PipeTransform , Injectable } from '@angular/core';

@Pipe({
name: 'appString'
})
@Injectable()
export class FilterPipe implements PipeTransform {

transform(cars: any[], field: string, value: string): any[] {
    if (!cars) {return []; }
    if (!field || !value) {return cars; }

    return cars.filter( carPreview => carPreview[field].toLowerCase().includes(value.toLowerCase()));
}
}



