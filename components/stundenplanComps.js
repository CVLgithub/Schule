import { Dimensions, StyleSheet, View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as s from '../scripts/stundenplan'

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full height



const AddLesson = ({day, nav}) => {
    return (
        <View style={styles2.addLesson}>
            <Pressable onPress={() => {nav.navigate('Hinzufügen', {day: day })}}>
                <Text style={styles2.addLessonTxt}>Add lesson</Text>
            </Pressable>
            
        </View>
    )
}

const Tag = ({day, woche, nav}) => {
    const DayFull = s.weekdayfull[day]
    const [lessons, setlessons] = useState([])
    useEffect(() => {

        try {
            const newLessons = []
            s.stundenPlan[day + woche].forEach(
            (item, i) => {
                newLessons.push(<Lesson key = {i} fach={item} day = {day+woche} nav = {nav}/>)
            }
        )
        setlessons(newLessons)
        } catch (error) {
            console.log('error')
            console.log(s.stundenPlan)
        }

        },[]
    )
    return (
        <View style={styles2.coloumn}>

            {/* <View style = {styles2.header}>
                <Text style = {styles2.headerTxt}>{DayFull}</Text>
            </View> */}
            
            {lessons}
            <AddLesson day = {day+woche} nav = {nav}/>
        </View>
    )
}
export default Tag

const Lesson = ({fach, day, nav}) => {
    return ( 
        <Pressable onPress={() => {console.log(day, fach); nav.navigate('Editieren', {lesson: fach, day: day })}}>
            <View style={styles2.lesson}>
                <Text style={styles2.lessonTxt}>{fach}</Text>
            </View>
        </Pressable>
            
    )
}

const styles2 = StyleSheet.create({
    coloumn: {
        //backgroundColor: 'green',
        flexDirection: 'coloumn',
        width: (screenWidth - 45) / 5,
        borderLeftWidth: 1.5,
        borderWidth: 0,
        //paddingTop: 20
        
    },
    header: {
        backgroundColor: '#DE0D4F',
        //margin: 1.5,
        marginBottom: 10,
        height: 35,
        justifyContent: 'center',
    },
    headerTxt: {
        fontSize: 12,
        alignSelf: 'center'
    },
    lesson: {
        backgroundColor: '#134ECF',
        marginVertical: 5,
        height: 60,
        margin: 1.5,
        justifyContent: 'center',
        borderRadius: 5,
    },
    lessonTxt: {
        alignSelf: 'center'
    },
    addLesson: {
        backgroundColor: '#DE0D4F',
        marginVertical: 5,
        height: 60,
        margin: 1.5,
        justifyContent: 'center',
        borderRadius: 5
    },
    addLessonTxt: {
        alignSelf: 'center'
    }
    
})