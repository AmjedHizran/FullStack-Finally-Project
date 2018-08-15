export class Car {
public CarID: number;
public CarTypeID: number;
public CurrentKilometrage: number;
public Image: string;
public IsProperToRent: boolean;
public CarNumber: number;
public LocatedAtTheBranch: number;



constructor(CarID ?: number,
    CarTypeID ?: number,
    CurrentKilometrage?: number,
    Image: string = '',
    IsProperToRent?: boolean,
    CarNumber?: number,
    LocatedAtTheBranch?: number) {
        this.CarID = CarID;
            this.CarTypeID = CarTypeID ;
            this.CurrentKilometrage = CurrentKilometrage ;
            this.Image = Image ;
            this.IsProperToRent = IsProperToRent ;
            this.CarNumber = CarNumber ;
            this.LocatedAtTheBranch = LocatedAtTheBranch;
        }
    }
