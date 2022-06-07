export class Credit {
    //field
    public age: number;
    public criminalRecord: string
    public employment: string
    public target: string
    public pledge: string
    public availabilityLoans: string
    public sum: number

    //constructor
    constructor(age: number, criminalRecord: string, employment: string, target: string, pledge: string, availabilityLoans: string, sum: number) {
        this.age = age;
        this.criminalRecord = criminalRecord;
        this.employment = employment;
        this.target = target;
        this.pledge = pledge;
        this.availabilityLoans = availabilityLoans;
        this.sum = sum;
    }

    //function
    disp(): void {
        // console.log("Engine is  :   "+this.engine)
    }
}