import { Credit } from '../models/creditModel';


const calculation = (credit:Credit) => {
    let points:number = 0;

    // age points ( Возраст )
    if (credit.age >= 21 && credit.age <= 28 ) {
       points += _agePointBySum(credit.sum)
    }else if (credit.age >= 29 && credit.age <= 59){
        points += 14
    }else if (credit.age >= 60 && credit.age <= 72){
        points += _agePointByPledge(credit.pledge)
    }
    // criminalRecord points ( Сведения о судимости )
    if (credit.criminalRecord != 'Нет справки')
        points += 15
    // employment points ( Трудоустройство )
    points += _employmentPoint(credit.employment,credit.age)
    // target points ( Цель )
    points += _targetPoint(credit.target)
    // pledge points ( Залог )
    points += _pledgePoint(credit.pledge)
    // availability loans points ( Наличие других кредитов )
    points += _availabilityLoansPoint(credit.availabilityLoans,credit.target)
    // sum points ( сумма )
    points += _sumPoint(credit.sum)

    return points
};

let _agePointBySum = function (sum:number):number{
    if (sum < 1000000)
        return  12
    else if (sum >= 1000000 && sum <= 3000000)
        return  9
    return 0
};
let _agePointByPledge = function (pledge:string):number{
   if (!pledge)
       return 0;
    return 8;
};
let _targetPoint = function (target:string):number{
    if (target == 'Потребительский кредит')
        return 14
    if (target == 'Недвижимость')
        return 8
    if (target == 'Перекредитование')
        return 12
    return 0;
};

let _employmentPoint = function (employment:string,age:number):number{
    if (employment == 'Трудоустроен по трудовому договору')
        return 14
    if (employment == 'Собственное ИП')
        return 12
    if (employment == 'Фрилансер')
        return 8
    if (employment == 'Пенсионер'){
        if (age < 70)
            return 5
    }
    return 0;
};
let _pledgePoint = function (target:string):number{
    if (target == 'Недвижимость')
        return 14
    if (target == 'Автомобиль')
       return 6
    if (target == 'Поручительство')
        return 12
    return 0;
};
let _availabilityLoansPoint = function (loans:string,target:string):number{
  if (loans != 'Да')
      if (target != 'перекредитование')
          return 15
    return 0;
};
let _sumPoint = function (sum:number):number{
    if (sum <= 1000000)
        return 12
    if (sum >= 1000001 && sum <= 5000000)
        return 14
    if (sum >= 5000001 && sum <= 10000000)
        return 8
    return 0;
};

const getLoanInterest = (points:number) => {
    if (points <= 84)
        return "26%"
    if (points <= 88)
        return "22%"
    if (points <= 92)
        return "19%"
    if (points <= 96)
        return "15%"
    if (points <= 100)
        return "12,5%"
    return '30%'
}

export default {
    calculation,
    getLoanInterest
};
