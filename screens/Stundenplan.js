import { Dimensions, StyleSheet, View, Text, Button, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as s from '../scripts/stundenplan'

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full height


const woche = 'B'

export default function StundenPlan({ navigation, route }){
    const [coloumns, setColoumns] = useState([]);

    useEffect(() => {
        const newColoumns = [];
        for (let i in s.stundenPlan) {
            const day = i.slice(0, 2);
            if (day === 'so' || day === 'sa') {
                break;
            }
            newColoumns.push(<Tag key={i} day={day} />);
        }
        setColoumns(newColoumns);
    }, []);
    

    return (
        <View style = {styles.container} >
            {coloumns}
        </View>
        
    )
}


const Tag = ({day}) => {
    const DayFull = s.weekdayfull[day]
    const [lessons, setlessons] = useState([])
    useEffect(() => {
        const newLessons = []
        s.stundenPlan[day + woche].forEach(
            (item, i) => {
                newLessons.push(<Lesson key = {i} fach={item}/>)
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

const Lesson = ({fach}) => {
    return (
        <View style={styles2.lesson}>
            <Text>{fach}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    }
    
})

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