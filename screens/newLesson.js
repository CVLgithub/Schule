import { Dimensions, StyleSheet, View, Text, Button, Platform,TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';

import * as s from '../scripts/stundenplan'

export default function AddView({ navigation, route}) {
  const { day  } = route.params;
  const [text, onChangeText] = React.useState('');

  const add = () => {
    s.stundenPlan[day].push(text)
    console.log('add')
    console.log(s.stundenPlan[day])

    navigation.navigate('main', { refresh: Math.random() });
    
  }

  return ( 
    <View >
      <Text>{day}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Neues Fach"
      />
      <Button title={'Save'} onPress={add}></Button>
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