import { Dimensions, StyleSheet, View, Text, Button, Platform, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as s from '../scripts/stundenplan'

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full height


export default function Week({nav, ColourStyle}){
    let localwoche = s.woche;
    const styles = StyleSheet.create({
        container: {
            //flex: 1
        },
        text:{
            color: ColourStyle.text.color
        }
        
    })
    return (
        <View style = {styles.container} >
            <Pressable
                hitSlop={50}
                onPress={() => {
                    localwoche = s.toggleWoche();
                    nav.navigate('main', { refresh: Math.random() });
                }}
            >
                <Text style={styles.text}> {localwoche} Woche</Text>
            </Pressable>
            
        </View>
        
    )
}





