import { Dimensions, StyleSheet, View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as s from '../scripts/stundenplan'

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full height



const AddLesson = ({day, nav, ColourStyle}) => {
    const styles2 = CreateStyles(ColourStyle)
    return (
        <View style={styles2.addLesson}>
            <Pressable onPress={() => {nav.navigate('Hinzufügen', {day: day })}}>
                <Text style={styles2.addLessonTxt}>Add lesson</Text>
            </Pressable>
            
        </View>
    )
}

export const Tag = ({day, woche, nav, ColourStyle, reload}) => {
    const styles2 = CreateStyles(ColourStyle)
    const DayFull = s.weekdayfull[day]
    const [lessons, setLessons] = useState([])
    useEffect(() => {
    try {
      const data = s.stundenPlan[`${day}${woche}`] ?? [];
      const newLessons = data.map((item, i) => (
        <Lesson key={i} fach={item} day={`${day}${woche}`} nav={nav} ColourStyle={ColourStyle} index={i}/>
      ));
      setLessons(newLessons);
    } catch (error) {
      console.log('error', error);
    }
    }, [day, woche, reload, ColourStyle]);

    
    return (
        <View style={styles2.coloumn}>

            {/* <View style = {styles2.header}>
                <Text style = {styles2.headerTxt}>{DayFull}</Text>
            </View> */}
            
            {lessons}
            <AddLesson day = {day+woche} nav = {nav} ColourStyle={ColourStyle}/>
        </View>
    )
}

const Lesson = ({fach, day, nav, ColourStyle, index}) => {
    const styles2 = CreateStyles(ColourStyle)
    return ( 
        <Pressable onPress={() => {console.log(day, fach); nav.navigate('Editieren', {lesson: fach, day: day, index: index })}}>
            <View style={styles2.lesson}>
                <Text style={styles2.lessonTxt}>{fach}</Text>
            </View>
        </Pressable>
            
    )
}


export const Times = ({ColourStyle}) => {
    const styles2 = CreateStyles(ColourStyle)
    const items = []
    for (const i of s.TimeList){
        items.push(
            <View style={styles2.lesson} key={i}>
                <Text style={styles2.lessonTxt}>{i}</Text>
            </View>
        )
    }
    return (
        <View style={styles2.coloumnTime}>
            {items}
        </View>
    )
}


function CreateStyles (s) {
    return StyleSheet.create({
    coloumn: {
        //backgroundColor: 'green',
        flexDirection: 'coloumn',
        width: (screenWidth - 45) / 5,
        borderLeftWidth: 1.5,
        borderWidth: 0,
        //paddingTop: 20
        
    },
    coloumnTime: {
        //backgroundColor: 'green',
        flexDirection: 'coloumn',
        width: 40,
        borderLeftWidth: 1.5,
        borderWidth: 0,
        //paddingTop: 20
        
    },
    lesson: {
        backgroundColor: s.primary.color,
        marginVertical: 5,
        height: 60,
        margin: 1.5,
        justifyContent: 'center',
        borderRadius: 5,
    },
    lessonTxt: {
        alignSelf: 'center',
        color: s.text.color,
        fontVariant: ['tabular-nums'],
    },
    addLesson: {
        backgroundColor: s.extra.color,
        marginVertical: 5,
        height: 60,
        margin: 1.5,
        justifyContent: 'center',
        borderRadius: 5
    },
    addLessonTxt: {
        alignSelf: 'center',
        color: s.text.color
    }
    
})
}