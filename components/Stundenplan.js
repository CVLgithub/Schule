import { Dimensions, StyleSheet, View, Text, Button, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as s from '../scripts/stundenplan'
import {Tag, Times} from './stundenplanComps'

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full height





export default function StundenPlan({navigation, reload, ColourStyle}){
    const woche = s.woche
    const [columns, setColumns] = useState([]);
    console.log('generate')
    console.log(s.stundenPlan)

    const generateColumns = () => {
        console.log('Generating columns'); // Debugging line
        const newColumns = [];
        newColumns.push(<Times key={'-1'} ColourStyle={ColourStyle}/>);
        for (let i in s.stundenPlan) {
            console.log('i generating columns', i)
        const day = i.slice(0, 2);
        if (day === 'so' || day === 'sa') {
            break;
        }
        newColumns.push(<Tag key={i} day={day} woche={woche} nav={navigation} ColourStyle={ColourStyle} />);
        }
        setColumns(newColumns);
    };

    //neu laden
    useEffect(() => {
        generateColumns();
    }, [reload]);

    return (
        <View style = {styles.container} >
            {columns}
        </View>
        
    )
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRightWidth: 1.5,
       // borderTopWidth: 1.5,
        position: 'relative',
        top: -2,
        zIndex: 2
    }
    
})

