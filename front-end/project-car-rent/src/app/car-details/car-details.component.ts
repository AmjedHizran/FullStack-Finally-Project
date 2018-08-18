import { Component, OnInit, Input, NgModule } from '@angular/core';
import { CarService } from '../shared/services/car.service';
import { CarPreviewService } from '../shared/services/car-preview.service';
import { RouterModule, ActivatedRoute, Params, Router } from '@angular/router';
import { CarPreview } from '../shared/models/Car-Preview.model';
import { Car } from '../shared/models/car.model';
import { BranchService } from '../shared/services/branch.service';
import { Branch } from '../shared/models/branch.model';
import { Order } from '../shared/models/order.model';
import { AuthGuardService } from '../shared/services/local.service';

@Component({
selector: 'app-car-details',
templateUrl: './car-details.component.html',
styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
CarTypeID: any;
carPreview: CarPreview;
car: Car;
branch: Branch;
LocatedAtTheBranch: any;
constructor(private myCarPreviewService: CarPreviewService,
            private route: ActivatedRoute,
            private router: Router,
            private carService: CarService,
            private branchService: BranchService,
            private authGuardService: AuthGuardService) {}

ngOnInit() {
    this.car = new Car();
    this.carPreview = new CarPreview();
    this.branch = new Branch();
if (this.authGuardService.checkLocalStorage()) {
    this.authGuardService.changeUser();
    }
this.CarTypeID = this.route.snapshot.paramMap.get('CarTypeID');
this.LocatedAtTheBranch = this.route.snapshot.paramMap.get('LocatedAtTheBranch');
const func2: (c: Car) => void = (c: Car) => {
    this.car = c;
    };
    this.carService.getCar(this.CarTypeID, func2);

    const func1: (c: CarPreview) => void = (c: CarPreview) => {
    this.carPreview = c;
    };
    this.myCarPreviewService.getCarPreview(this.CarTypeID, func1);

    const func3: (c: Branch) => void = (c: Branch) => {
        this.branch = c;
        };
        this.branchService.getBranch(this.LocatedAtTheBranch, func3);
}

goBack() {
    this.router.navigate(['/Cars']);
}

calculate(CarTypeID: number , branch: string) {
    this.CarTypeID = CarTypeID;
    this.router.navigate(['/Price', CarTypeID , branch , this.car.CarID]);
}
}
