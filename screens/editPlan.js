import { Dimensions, StyleSheet, View, Text, Button, Platform,TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as s from '../scripts/stundenplan'

export default function EditView({ navigation, route}) {
  const { lesson, day  } = route.params;
  const [text, onChangeText] = React.useState('');

  const edit = () => {
    const index = s.stundenPlan[day].indexOf(lesson)
    console.log('index:',index)

    if (index !== -1) {
        s.stundenPlan[day][index] = text;
        console.log('switch')
    }
    console.log(s.stundenPlan[day])

    navigation.navigate('main', { refresh: Math.random() });
    
  }

  

  return ( 
    <View >
      <Text>{lesson}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Fach ändern"
      />
      <Button title={'Save'} onPress={edit}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});