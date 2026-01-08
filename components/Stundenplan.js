import { Dimensions, StyleSheet, View, Text, Button, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as s from '../scripts/stundenplan'
import {Tag, Times} from './stundenplanComps'

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full height





export default function StundenPlan({navigation, reload, ColourStyle}){
    const stundenplan = s.stundenPlan
    const woche = s.woche;
    const columns = React.useMemo(() => {
    const arr = [<Times key="times" ColourStyle={ColourStyle} />];
    console.log('Generating Stundenplan : ', stundenplan)
    for (const i in stundenplan) {
      const day = i.slice(0, 2);
      if (day === 'so' || day === 'sa') break;
      arr.push(
        <Tag
          key={`${day}-${woche}`}
          day={day}
          woche={woche}
          nav={navigation}
          ColourStyle={ColourStyle}
        />
      );
    }
    return arr;
  }, [woche, ColourStyle, reload]);

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
        zIndex: 2,
        borderColor: 'transparent'
    }
    
})

