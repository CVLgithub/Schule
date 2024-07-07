import * as Calendar from 'expo-calendar';


export async function SetCalId(){
    return new  Promise(async (resolve) => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
            if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            for (i in calendars){
                const cal = calendars[i]
                if (cal["title"] == 'Schulplanner'){
                    console.log("found1")
                    const id = cal["id"]
                    console.log('id:', id)
                    resolve(id) 
                    return
                }
            }
            console.log("create new")
            createCalendar('Schulplanner')
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


const event = () => {
    addEvent('test1')
}

export async function addEvent(id, name, date, duration = '15:00') { //duration in min
if (id !== 0) {
    const startDate = new Date(date);
    const endTime = new Date(startDate.getTime() + (60 * 60 * 1000));

    const eventDetails = {
    title: name,
    startDate: startDate, 
    endDate: endTime,  
    timeZone: 'UTC',
    location: 'Berlin',
    alarms: [
        {
            relativeOffset: -1440, // 1440 Minuten = 24 Stunden vorher
            method: Calendar.AlarmMethod.ALERT, // Alternativ: 'email' oder 'popup'
        },
    ],
    };
    try {
    const eventId = await Calendar.createEventAsync(id, eventDetails);
    console.log(`Event created with ID: ${eventId}`);
    } catch (e) {
    console.error('Error creating event:', e);
    }
}
}
