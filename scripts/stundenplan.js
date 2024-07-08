import moment from 'moment-timezone';
const weekday = ["so","mo","di","mi","do","fr","sa"];


export const weekdayfull ={so:"Sonntag",mo:"Montag",di:"Dienstag",mi:"Mittwoch",do:"Donnerstag",fr:"Freitag",sa:"Samstag"}
    

const woche = 'A'

const dayList = {
    1: 'moA',
    2: 'diA',
    3: 'miA',
    4: 'doA',
    5: 'frA',
    6: 'saA',
    7: 'soA',
    8: 'moB',
    9: 'diB',
    10: 'miB',
    11: 'doB',
    12: 'frB',
    13: 'saB',
    14: 'soB'
}



//stundenplan sollte lokal gespeichert werden
export const stundenPlan = {
    moA: ['deutsch','englisch','mathe'],
    diA: ['geschi','mathe','physik'],
    miA: ['sport','deutsch','powi'],
    doA: ['info','physik','religion'],
    frA: ['englisch','powi','geschi'],
    saA: [],
    soA: [],
    moB: ['deutsch','geschi','mathe'],
    diB: ['englisch','mathe','physik'],
    miB: ['sport','deutsch','info'],
    doB: ['powi','physik','religion'],
    frB: ['englisch','powi','geschi'],
    saB: [],
    soB: [],
}


export function nextDate(fach){
    const dUTC = new Date();
    const day = moment(dUTC).tz('Europe/Berlin').toDate();
    console.log(day)
    const nextDate = findNextLesson(fach, day)
    console.log(nextDate)
    day.setDate(day.getDate() + nextDate)
    console.log('retruning', day)
    return day
}


function findNextLesson(fach, d){
    const day = weekday[parseInt(d.getDay())] + woche;
    console.log('heute:', day)

    

    for (i in dayList){
        if (dayList[i] == day){
            const startDay = parseInt(i)
            const nextDay = recursion(fach, startDay + 1)
            if (startDay == nextDay){
                return 7
            }
            else if (startDay > nextDay){
                return (14 - startDay + nextDay)
            }
            return nextDay - (startDay)
        }
    }

}

function recursion(fach, index){
    if (index >= 11){   
        return recursion(fach, 1)
    }
    if (stundenPlan[dayList[index]].includes(fach)){
        return index
    }
    return recursion(fach, index + 1)
}
