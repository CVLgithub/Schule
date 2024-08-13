import { Dimensions, StyleSheet, View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as s from '../scripts/stundenplan'

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full height



const AddLesson = ({day, woche, nav}) => {
    return (
        <View style={styles2.addLesson}>
            <Text>Add lesson</Text>
        </View>
    )
}

const Tag = ({day, woche, nav}) => {
    const DayFull = s.weekdayfull[day]
    const [lessons, setlessons] = useState([])
    useEffect(() => {
        console.log('from Tag')
        console.log(s.stundenPlan)

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

            <View style = {styles2.header}>
                <Text style = {styles2.headerTxt}>{DayFull}</Text>
            </View>
            
            {lessons}
            <AddLesson/>
        </View>
    )
}
export default Tag

const Lesson = ({fach, day, nav}) => {
    return ( 
        <Pressable onPress={() => {console.log(day, fach); nav.navigate('Editieren', {lesson: fach, day: day })}}>
            <View style={styles2.lesson}>
                <Text>{fach}</Text>
            </View>
        </Pressable>
            
    )
}

const styles2 = StyleSheet.create({
    coloumn: {
        //backgroundColor: 'green',
        flexDirection: 'coloumn',
        width: (screenWidth - 45) / 5,
        borderWidth: 1.5,
        borderRightWidth: 0,
        
    },
    header: {
        backgroundColor: 'pink',
        margin: 1.5,
        marginBottom: 10,
        height: 35,
        justifyContent: 'center',
    },
    headerTxt: {
        fontSize: 12,
        alignSelf: 'center'
    },
    lesson: {
        backgroundColor: 'red',
        marginVertical: 5,
        height: 60,
        margin: 1.5,
    },
    addLesson: {
        backgroundColor: 'blue',
        marginVertical: 5,
        height: 60,
        margin: 1.5
    }
    
})