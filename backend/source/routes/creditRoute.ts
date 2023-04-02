import express from 'express';
import creditController from '../controllers/creditController';
import {check} from 'express-validator';

const router = express.Router();

router.post('/issue'
    , check('age').isFloat({min: 21, max: 150})
    , check('criminalRecord').isString()
    , check('employment').exists()
    , check('target').exists()
    , check('pledge').exists()
    , check('availabilityLoans').exists()
    , check('sum').isFloat({min: 0}),
    creditController.creditCalculation);


export = router;
