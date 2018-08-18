import { Component, OnInit } from '@angular/core';
import { CarPreview } from '../../shared/models/Car-Preview.model';
import { CarPreviewService } from '../../shared/services/car-preview.service';
import { AuthGuardService } from '../../shared/services/local.service';

@Component({
selector: 'app-car-preview',
templateUrl: './car-preview.component.html',
styleUrls: ['./car-preview.component.css']
})
export class CarPreviewComponent implements OnInit {
display: boolean;
showDetails: boolean;
carTypeId: number;
deleteCarTypeId: number;
addedSuccess: boolean;
newCarPreview: CarPreview = new CarPreview();
updateCarPreview: CarPreview = new CarPreview();
isNotValid: boolean;
updateSuccess: boolean;
deleteSuccess: boolean;
carPreview: CarPreview;
constructor(private authGuardService: AuthGuardService,
private carPreviewService: CarPreviewService) { }


    ////////////////////// carPreview
    onAddingCarPreview() {
    this.isNotValid = false;
    this.addedSuccess = false;
    const func: (b: boolean) => void = (b: boolean) => {
        this.addedSuccess = b;
        };
        this.carPreviewService.addCarPreview(this.newCarPreview, func);
        if (this.addedSuccess === false) {
        this.isNotValid = true;
    }
    }

    onEditCarPreview() {
    this.isNotValid = false;
    this.updateSuccess = false;
    const func: (b: boolean) => void = (b: boolean) => {
        this.updateSuccess = b;
        };
        this.carPreviewService.editCarPreview(this.carTypeId, this.updateCarPreview, func);
        if (this.updateSuccess === false) {
            this.isNotValid = true;
        }
}

    onDeleteCarPreview() {
    this.deleteSuccess = false;
    const func: ( b: boolean) => void = ( b: boolean) => {
        this.deleteSuccess = b;
    };
        this.carPreviewService.deleteCarPreview(this.deleteCarTypeId, func);

    }
    onResetCarPreview() {
        this.updateSuccess = false;
    this.showDetails = false;
    this.display = false;
    this.addedSuccess = false;
    this.isNotValid = false;
    this.updateCarPreview = new CarPreview();
    this.newCarPreview = new CarPreview();
    }

    onSearchCarPreview() {
    const func: (a: CarPreview) => void = (a: CarPreview) => {
        this.carPreview = a;
        if (!this.carPreview) {
            this.showDetails = true;
            } else if (this.carPreview) {
            this.carTypeId = this.carPreview.CarTypeID;
            this.display = true;
            }
        };
        this.carPreviewService.getCarPreview(this.carTypeId, func);
    }


ngOnInit() {

if (this.authGuardService.checkLocalStorage()) {
    this.authGuardService.changeUser();
    }
}

}
