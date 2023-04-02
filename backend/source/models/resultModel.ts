export class Result {
    //field
    public message: string;
    public points: number;
    public loanInterest?: string;

    //constructor
    constructor(message: string,points:number) {
        this.message = message;
        this.points = points;
    }
}