import { Dimensions, StyleSheet, View, Text, Button, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as s from '../scripts/stundenplan'

export default function EditView({ navigation, route}) {
    const { lesson, day  } = route.params;
    console.log(lesson)
    const newLesson = 'test'
    const edit = () => {
        
        const index = s.stundenPlan[day].indexOf(lesson)
        console.log(index)

        if (index !== -1) {
            s.stundenPlan[day][index] = newLesson;
            console.log('switch')
        }
        console.log(s.stundenPlan[day])
    }

    
    return (
      <View >
        <Text>Edit</Text>
        <Button title={'Press'} onPress={edit}></Button>
      </View>
    );
  }