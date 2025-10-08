import * as Calendar from 'expo-calendar';
import { Platform } from 'react-native';


export async function SetCalId(){
    return new  Promise(async (resolve) => {
        console.log('SetCalid called');
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') { 
            console.log('granted');
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            for (const i in calendars){
                const cal = calendars[i]
                if (cal["title"] == 'Schulplanner'){
                    console.log("found1")
                    const CalId = cal["id"]
                    console.log('id:', CalId)
                    //resolve(id) 
                    //const ReminderId = await SetReminderId()
                    console.log('resolve');
                    resolve(CalId)
                    return
                }
                //console.log('next');
            }
            console.log("create new")
            createCalendar('Schulplanner')
           // SetReminderId()
        }
    })
}

export async function SetReminderId(){
    return new  Promise(async (resolve) => {
        const { status } = await Calendar.requestRemindersPermissionsAsync();
        if (status === 'granted') { 
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.REMINDER);
            console.log(calendars)
            console.log("ABCDEFG")
            //createCalendar('Schulplanner')

        }})
}



async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
}

async function createCalendar(calTitle) {
    const defaultCalendarSource =
        Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: calTitle };
    const newCalendarID = await Calendar.createCalendarAsync({
        title: calTitle,
        color: 'blue',
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: 'internalCalendarName',
        ownerAccount: 'personal',
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
    setId(newCalendarID)
}


export const event = (id, name, date, duration = 60, notes = 'keine Angaben', type = 'calendar') => {
    addEvent(id, name, date, duration, notes, type)
}

export async function addEvent(id, name, date, duration, notizen, type) { //duration in min
if (id !== 0) {
    const startDate = new Date(date);
    const endTime = new Date(startDate.getTime() + (duration * 60 * 1000));

    const eventDetails = {
        title: name,
        startDate: startDate, 
        endDate: endTime,  
        timeZone: 'UTC',
        location: notizen,
        alarms: [
            {
                relativeOffset: -1440, // 1440 Minuten = 24 Stunden vorher
                method: Calendar.AlarmMethod.ALERT, // Alternativ: 'email' oder 'popup'
            },
        ],
        notes: notizen,
    };

    const reminderDetails = {
        title: name,
        dueDate: new Date(2024, 30, 9),
        timeZone: 'UTC',
        location: notizen,
        /* alarms: [
            {
                relativeOffset: -1440, // 1440 Minuten = 24 Stunden vorher
                method: Calendar.AlarmMethod.ALERT, // Alternativ: 'email' oder 'popup'
            },
        ], */
        notes: notizen,
    };
    try {
        const getEventId = async () => {
            const type2 = '!!!!!reminder'
            if (type2 == 'reminder'){
                
                return await Calendar.createReminderAsync('4F8379C5-FA0E-44C8-ADAB-9985FF7137A2', reminderDetails);
            } else {
                return await Calendar.createEventAsync(id, eventDetails);
            }
        }
        const eventId = await getEventId()
    
    console.log(`Event created with ID: ${eventId}`);
    } catch (e) {
    console.error('Error creating event:', e);
    }
}
}
