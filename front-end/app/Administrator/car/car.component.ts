import { Component, OnInit } from '@angular/core';
import { Car } from '../../shared/models/car.model';
import { CarService } from '../../shared/services/car.service';
import { AuthGuardService } from '../../shared/services/local.service';
import { Branch } from '../../shared/models/branch.model';
import { CarPreview } from '../../shared/models/Car-Preview.model';
import { CarPreviewService } from '../../shared/services/car-preview.service';
import { BranchService } from '../../shared/services/branch.service';

@Component({
selector: 'app-car',
templateUrl: './car.component.html',
styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
display: boolean;
showDetails: boolean;
carId: number;
addedSuccess: boolean;
addednewCar: boolean;
addednewBranch: boolean;
addednewCarPreview: boolean;
newCar: Car = new Car();
updateCar: Car = new Car();
newBranch: Branch = new Branch();
newCarPreview: CarPreview = new CarPreview();
isNotValid: boolean;
updateSuccess: boolean;
deleteSuccess: boolean;
CarNumberSearch: number;
car: Car;

constructor(private authGuardService: AuthGuardService,
private carService: CarService,
private carPreviewService: CarPreviewService,
private branchService: BranchService) { }

    onAddingCarPreview() {
    const func1: (b: boolean) => void = (b: boolean) => {
        this.addednewCarPreview = b;
        this.onAddingCarBranch();
        };
        this.carPreviewService.addCarPreview(this.newCarPreview, func1);
    }

    onAddingCarBranch() {
        const func3: (b: boolean) => void = (b: boolean) => {
        this.addednewBranch = b;
        this.onAddingCar();
        };
        this.branchService.addBranch(this.newBranch, func3);
    }

    onAddingCar() {
    const func2: (b: boolean) => void = (b: boolean) => {
        this.addednewCar = b;
        };
        this.carService.addCar(this.newCar, func2);
    }

onEditCar() {
this.isNotValid = false;
this.updateSuccess = false;
const func: (b: boolean) => void = (b: boolean) => {
    this.updateSuccess = b;
    };
    this.carService.editCar(this.car.CarNumber , this.updateCar, func);
    if (this.updateSuccess === false) {
        this.isNotValid = true;
    }
}

    onDeleteCar() {
    this.deleteSuccess = false;
    const func: ( b: boolean) => void = ( b: boolean) => {
        this.deleteSuccess = b;
    };
        this.carService.deleteCar(this.carId, func);

    }

    onSearchCar() {
    const func: (a: Car) => void = (a: Car) => {
        this.car = a;
        if (!this.car) {
            this.showDetails = true;
            } else if (this.car) {
            this.display = true;
            }
        };
        this.carService.getCarById(this.CarNumberSearch, func);
    }

    onResetCar() {
    this.updateCar = new Car();
    this.car = new Car();
    this.showDetails = false;
    this.display = false;
    this.addedSuccess = false;
    this.isNotValid = false;
    }

ngOnInit() {

if (this.authGuardService.checkLocalStorage()) {
    this.authGuardService.changeUser();
    }
}

}
