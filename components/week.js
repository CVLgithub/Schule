import { Dimensions, StyleSheet, View, Text, Button, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as s from '../scripts/stundenplan'

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full height


export default function Week({navigation, reload}){
    return (
        <View style = {styles.container} >
            <Text>{s.woche} Woche</Text>
        </View>
        
    )
}



const styles = StyleSheet.create({
    container: {
        //flex: 1
    }
    
})

