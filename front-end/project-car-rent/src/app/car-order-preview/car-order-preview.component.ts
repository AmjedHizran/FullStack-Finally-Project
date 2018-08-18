import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarPreview } from '../shared/models/Car-Preview.model';
import { CarPreviewService } from '../shared/services/car-preview.service';
import { AuthGuardService } from '../shared/services/local.service';

@Component({
selector: 'app-car-order-preview',
templateUrl: './car-order-preview.component.html',
styleUrls: ['./car-order-preview.component.css']
})
export class CarOrderPreviewComponent implements OnInit {
carID: any;
carTypeId: any;
rentedDate: any;
returnDate: any ;
actualReturnDate: any;
carPreview: CarPreview;
date = new Date();
constructor(private route: ActivatedRoute,
            private carPreviewService: CarPreviewService,
        private router: Router,
        private authGuardService: AuthGuardService) { }

ngOnInit() {
if (this.authGuardService.checkLocalStorage()) {
    this.authGuardService.changeUser();
    }
    this.carPreview = new CarPreview();
this.carID = this.route.snapshot.paramMap.get('carID');
this.rentedDate = this.route.snapshot.paramMap.get('rentedDate');
this.returnDate = this.route.snapshot.paramMap.get('returnDate');
this.actualReturnDate = this.route.snapshot.paramMap.get('actualReturnDate');
this.carTypeId = this.route.snapshot.paramMap.get('carTypeId');

const func1: (c: CarPreview) => void = (c: CarPreview) => {
    this.carPreview = c;
    };
    this.carPreviewService.getCarPreview( this.carTypeId , func1);
}

back() {
this.router.navigate(['./MyOrders']);
}

}
