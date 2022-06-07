import {NextFunction, Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {Credit} from '../models/creditModel';
import {Result} from '../models/resultModel';
import creditService from '../service/creditService';

const creditCalculation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    // get data from body...
    const {age, criminalRecord, employment, target, pledge, availabilityLoans, sum} = req.body
    // save to model
    const credit = new Credit(age, criminalRecord, employment, target, pledge, availabilityLoans, sum)
    // creditService.calculation to get points
    const points = creditService.calculation(credit);
    // // check points
    if (points > 80) {
        const result = new Result('кредит выдается',points)
        // interest rate on the loan according
        result.loanInterest = creditService.getLoanInterest(points);

        return res.status(200).json(result);
    } else {
        return res.status(200).json(new Result('В кредите было отказано',points)
        );
    }
};

export default {
    creditCalculation
};
