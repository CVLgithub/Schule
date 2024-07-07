import React, { useEffect, useState } from 'react';
import * as Calendar from 'expo-calendar';

/* const [id, setId] = useState(0);

useEffect(() => {
    SetCalId();
}, []); */


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

export async function addEvent(id, name, date = '2024-07-08', time = '00:00', endTime = '18:00') {
if (id !== 0) {
    const start = date + "T" + time + ":00.000Z"
    const end = date + "T" + endTime + ":00.000Z"

    const eventDetails = {
    title: name,
    startDate: new Date(start), // Startzeit: 10:00 Uhr UTC
    endDate: new Date(end),   // Endzeit: 11:00 Uhr UTC
    timeZone: 'UTC',
    location: 'Berlin', // Optional: Location hinzufügen
    };
    try {
    const eventId = await Calendar.createEventAsync(id, eventDetails);
    console.log(`Event created with ID: ${eventId}`);
    } catch (e) {
    console.error('Error creating event:', e);
    }
}
}
