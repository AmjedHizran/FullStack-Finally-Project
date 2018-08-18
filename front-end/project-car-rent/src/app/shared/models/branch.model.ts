export class Branch {
    BranchID: number;
    Name: string ;
    Latitude: DoubleRange;
    Longitude: DoubleRange;
    Address: string;

    constructor(BranchID ?: number,
        Name ?: string,
        Latitude ?: DoubleRange,
        Longitude ?: DoubleRange,
        Address ?: string) {
                this.BranchID = BranchID;
                this.Name = Name ;
                this.Latitude = Latitude ;
                this.Longitude = Longitude ;
                this.Address = Address ;
        }
    }
