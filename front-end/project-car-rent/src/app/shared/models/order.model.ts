export class Order {
    UserID: number;
    CarID: number;
    RentedDate: Date;
    ReturnDate: Date;
    ActualReturnDate ?: Date;
    OrderId: number;
    constructor(UserID?: number, CarID?: number, rentedCar?: Date, returnCar?: Date , OrderId?: number) {
        this.UserID = UserID;
            this.CarID = CarID;
           this.RentedDate = rentedCar;
           this.ReturnDate = returnCar;
           this.OrderId = OrderId;
    }

    }
