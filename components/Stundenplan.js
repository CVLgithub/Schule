import { Dimensions, StyleSheet, View, Text, Button, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as s from '../scripts/stundenplan'
import Tag from './stundenplanComps'

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full height


const woche = 'B'

export default function StundenPlan({navigation, reload}){
    const [columns, setColumns] = useState([]);

    const generateColumns = () => {
        console.log('Generating columns'); // Debugging line
        const newColumns = [];
        for (let i in s.stundenPlan) {
        const day = i.slice(0, 2);
        if (day === 'so' || day === 'sa') {
            break;
        }
        newColumns.push(<Tag key={i} day={day} woche={woche} nav={navigation} />);
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
        marginHorizontal: 20,
    }
    
})

