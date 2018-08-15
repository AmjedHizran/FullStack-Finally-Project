import { Component, OnInit } from '@angular/core';
import { StoreInfo } from '../shared/models/storeInfo.model';
import { Address } from '../shared/models/address.model';
import { AuthGuardService } from '../shared/services/local.service';


@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
storeInfo: StoreInfo;
constructor(private authGuardService: AuthGuardService) { }

ngOnInit() {
if (this.authGuardService.checkLocalStorage()) {
    this.authGuardService.changeUser();
}
this.storeInfo = new StoreInfo();
this.storeInfo.storeName = 'Aerorenta car';
this.storeInfo.mainImage = 'https://www.aerorentacar.com/CarsForSale/AeroStoreFrontA.jpg';
this.storeInfo.address = new Address('Tel-Aviv', 'Yad Eliyahu', 22);
}

}
