import { Dimensions, StyleSheet, View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as s from '../scripts/stundenplan'

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full height


const Tag = ({day, woche, nav}) => {
    const DayFull = s.weekdayfull[day]
    const [lessons, setlessons] = useState([])
    useEffect(() => {
        const newLessons = []
        s.stundenPlan[day + woche].forEach(
            (item, i) => {
                newLessons.push(<Lesson key = {i} fach={item} day = {day+woche} nav = {nav}/>)
            }
        )
        setlessons(newLessons)},[]
    )
    return (
        <View style={styles2.coloumn}>

            <View style = {styles2.header}>
                <Text>{DayFull}</Text>
            </View>
            
            {lessons}
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
        backgroundColor: 'green',
        flexDirection: 'coloumn',
        width: (screenWidth - 45) / 5,
        borderWidth: 1.5
    },
    header: {
        backgroundColor: 'pink',
        marginBottom: 20,
        height: 35,
        justifyContent: 'center',
    },
    lesson: {
        backgroundColor: 'red',
        marginVertical: 5,
        height: 60,
    }
    
})