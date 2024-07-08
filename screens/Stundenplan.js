import { Dimensions, StyleSheet, View, Text, Button, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as s from '../scripts/stundenplan'
import Tag from '../components/stundenplanComps'

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
            newColoumns.push(<Tag key={i} day={day} woche={woche} nav = {navigation}/>)
        }
        setColoumns(newColoumns);
    }, [s.stundenPlan]);
    

    return (
        <View style = {styles.container} >
            {coloumns}
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

