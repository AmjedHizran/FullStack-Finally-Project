export class CarPreview {
CarTypeID: number;
MakerName = '' ;
Model: string;
DailyCost: number;
CostOfDayOverdue: number;
YearOfProduction: number;
Gear: boolean;

constructor(CarTypeID ?: number,
    MakerName: string = '',
    Model ?: string,
    DailyCost ?: number,
    CostOfDayOverdue ?: number,
    YearOfProduction ?: number,
    Gear ?: boolean) {
            this.CarTypeID = CarTypeID;
            this.MakerName = MakerName ;
            this.Model = Model ;
            this.DailyCost = DailyCost ;
            this.CostOfDayOverdue = CostOfDayOverdue ;
            this.YearOfProduction = YearOfProduction ;
            this.Gear = Gear ;
    }
}
