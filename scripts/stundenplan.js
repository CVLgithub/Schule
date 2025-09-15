import moment from 'moment-timezone';
import * as cal from './calendar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings } from '../App';



const weekday = ["so","mo","di","mi","do","fr","sa"];


export const weekdayfull ={so:"Sonntag",mo:"Montag",di:"Dienstag",mi:"Mittwoch",do:"Donnerstag",fr:"Freitag",sa:"Samstag"}
    

//updates the week
const checkWeek = async (weekNum) => {
    const EvenIsA = await getData('EvenWeekIsA', (x) => {return(x)})
    if (EvenIsA == 'error'){console.log('WEEK ERROR'); return}
    console.log(EvenIsA, '<------ WEEK')
    if (EvenIsA && (weekNum % 2) == 0){
        console.log('WEEK UPDATE TO A')
        woche = 'A'
        return
    }
    if (!EvenIsA && (weekNum % 2) == 0){
        console.log('WEEK UPDATE TO B')
        woche = 'B'
        return
    }
    if (EvenIsA && (weekNum % 2) != 0){
        console.log('WEEK UPDATE TO A2')
        woche = 'B'
        return
    }
    if (!EvenIsA && (weekNum % 2) != 0){
        console.log('WEEK UPDATE TO B2')
        woche = 'A'
        return
    }
}

const getTypeOfWeek = () => {  
    const dUTC = new Date();
    const day = moment(dUTC).tz('Europe/Berlin').toDate();
    const week = getISOWeekNumberInGermany(day)
    console.log('WEEK', week, dUTC, day.getDate(),(week % 2) )
    checkWeek((week % 2))
    if ((week % 2) == 0){
        console.log('WEEK B')
        return 'B'
    }
    console.log('WEEK A')
    return 'A'
}

export let woche = getTypeOfWeek()

export function toggleWoche() {
    woche = woche === 'A' ? 'B' : 'A';
    return woche;
}


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
export let  stundenPlan = {
    moA: ['deutsch','englisch','mathe', 'sport'],
    diA: ['geschi','mathe'],
    miA: ['sport','deutsch','powi'],
    doA: ['info','physik','religion'],
    frA: ['englisch','powi','geschi'],
    saA: [],
    soA: [],
    moB: ['deutsch','geschi','mathe'],
    diB: ['englisch','mathe'],
    miB: ['sport','deutsch','info'],
    doB: ['powi','physik','religion'],
    frB: ['englisch','powi','geschi'],
    saB: [],
    soB: [],
}

export const TimeList = [
    '07:50\n09:20',
    '09:40\n11:10',
    '11:30\n13:00',
    '13:45\n15:15',
    '15:25\n16:55',
]




const getSubjectList = async () => {
    const x = await getData('SubjectList', (x) => {return(x)})
    console.log('subjectlist')
    console.log(x)
    if (x == 'error'){
        console.log('error !!!!')
        return []
    }
    return x
    
}

export let SubjectList = ['Loading ...']

const setSubjectList = async () => {
    SubjectList = await getSubjectList()
}
setSubjectList()


export const saveSubjects = () => {
    storeData('SubjectList', JSON.stringify(SubjectList))
}



export async function storeData(key, data) {
    try {
      await AsyncStorage.setItem(String(key), String(data));
      console.log('Data stored successfully', key, data);
    } catch (error) {
      console.log('Error storing data: ', error);
    }
};

export async function getData(key, callback) {
    try {
        const value = JSON.parse(await AsyncStorage.getItem(key));
        if (value !== null && value !== undefined && value !== 'undefined') {
            console.log(`return ${value}`)
            callback(value)
            return value
        } else {
            console.log('No data found');
            return 'error'
        }
    } catch (error) {
        console.log('Error retrieving data 2: ', error);
        return 'error'
    }
};


function findeTime(fach, dAsLetter, plan) {
    console.log(dAsLetter, plan[dAsLetter], fach)
    return Timetable[plan[dAsLetter].indexOf(fach)] 
}

export function nextDate(fach,plan){
    const dUTC = new Date();
    const day = moment(dUTC).tz('Europe/Berlin').toDate();
    console.log(day)
    const [nextDate, dAsletter] = findNextLesson(fach, day, plan )
    console.log('finished')
    const time = findeTime(fach, dAsletter, plan)
    const min = time % 60
    const hours = (time - min) / 60
    console.log('TIME',hours, min)
    console.log(nextDate)
    day.setDate(day.getDate() + nextDate)
    if (Settings.startAtSameTime){
       day.setHours(hours)
    day.setMinutes(min) 
    }
    //console.log('tag:', day.getHours())
    //console.log('retruning', day)
    return day
}

function findNextLesson(fach, d, plan){
    const day = weekday[parseInt(d.getDay())] + woche;
    console.log('heute:', day)  

    for (i in dayList){
        if (dayList[i] == day){
            const startDay = parseInt(i)
            const [nextDay, dayAsletter] = recursion(fach,plan, startDay + 1)
            console.log(14 - startDay + nextDay, 'HERE')

            //error 
            if (nextDay == -1){
                console.log('ERROR')
                return [0, 'moA']
            }
            if (startDay == nextDay){
                return [7, dayAsletter]
            }
            else if (startDay > nextDay){
                return [(14 - startDay + nextDay), dayAsletter]
            }
            return [nextDay - (startDay), dayAsletter]
        }
    }
}

function recursion(fach,plan, index, runtime = 0){
    //STOP - too many runs
    if (runtime >= 18){return -1}

    //Try again from start
    if (index >= 14){   
        return recursion(fach,plan, 1, runtime + 1)
    }

    //Finale Case
    if (plan[dayList[index]].includes(fach)){
        return [index,dayList[index]]
    }

    //re-run
    return recursion(fach,plan, index + 1, runtime + 1)
}

export function	handlePress(id,text,plan){
    console.log('test2', plan)
    const [day, LID, fach] = getlesson(plan)
    console.log(fach)
    cal.event(id, `Aufgabe in ${fach}`, nextDate(fach, plan), 90, text)
    console.log(text)
}

export function	handlePressCustom(id,text,plan, Subject){
    console.log('test2', plan)
    const fach = Subject
    console.log(fach)
    cal.event(id, `Aufgabe in ${fach}`, nextDate(fach, plan), 90, text)
    console.log(text)
}



const Timetable = [7*60+50,9*60+40,11*60+30,13*60+45,15*60+25,16*60+55]


function getlesson(plan){
    const dUTC = new Date();
    const d = moment(dUTC).tz('Europe/Berlin').toDate();
    const day = weekday[parseInt(d.getDay())] + woche;
    const lessonInDay = convertTimeToLesson(day, plan)
    console.log('Aktuell ist', plan[day][lessonInDay] )
    return [day,lessonInDay, plan[day][lessonInDay]]

}


function getTimeInMin(){
    const dUTC = new Date();
    const d = moment(dUTC).tz('Europe/Berlin').toDate();
    const hour = d.getHours();
    const min = d.getMinutes();
    const time = (hour) * 60 + min
    console.log('time:',time)
    return (time)
}



function convertTimeToLesson(d, plan){
    const time = getTimeInMin()
    console.log(time)


    for(let index = 0; index < Timetable.length; index++) {
        //console.log(Timetable[index]);
        if(time <= Timetable[index]){
            console.log('Index: ', index);
            return index - 1;
        }
    }
    console.log('return index:', stundenPlan[d].length - 1)
    return plan[d].length - 1
}


function getISOWeekNumber(date) {
    // Kopiere das Datum und setze die Uhrzeit auf Mitternacht
    const tempDate =  new Date(date);
    tempDate.setHours(0, 0, 0, 0);
    console.log('WEEK:::::', tempDate.toDateString())

    // Setze das Datum auf Montag der aktuellen Woche
    const day = tempDate.getDay();
    const diff = (day === 0 ? -6 : 1) - day;  // 1 = Montag, falls Sonntag (-6)
    tempDate.setDate(tempDate.getDate() + diff);

    console.log('WEEK2:::::', tempDate.toDateString())

    // Setze den Donnerstag dieser Woche
    const thursday = new Date(tempDate);
    thursday.setDate(tempDate.getDate() + 3);

    // Berechne die erste Kalenderwoche des Jahres
    const firstThursday = new Date(thursday.getFullYear(), 0, 1);
    if (firstThursday.getDay() !== 4) {
        firstThursday.setDate(firstThursday.getDate() + (4 - firstThursday.getDay() + 7) % 7);
    }

    // Berechne die Kalenderwoche
    const weekNumber = Math.floor((thursday - firstThursday) / (7 * 24 * 60 * 60 * 1000)) + 1;
    console.log('WEEK::', weekNumber)
    return weekNumber;
}

function getISOWeekNumberInGermany(date) {
    // Setze das Datum in die Zeitzone von Deutschland (Europe/Berlin)
    const dateInGermany = moment.tz(date, 'Europe/Berlin');
    
    // Berechne die ISO-Kalenderwoche
    const weekNumber = dateInGermany.isoWeek();
    return weekNumber;
}