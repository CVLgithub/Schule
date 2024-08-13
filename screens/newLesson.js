import { Dimensions, StyleSheet, View, Text, Button, Platform,TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import {Picker} from '@react-native-picker/picker';

import * as s from '../scripts/stundenplan'

export default function AddView({ navigation, route}) {
  const [selectedSubject, setSelectedSubject] = useState();
  const [items, setitems] = useState()
  const { day  } = route.params;

  const add = () => {
    s.stundenPlan[day].push(selectedSubject)
    console.log('add')
    console.log(s.stundenPlan[day])

    navigation.navigate('main', { refresh: Math.random() });
    
  }

  useEffect(
    () => {
      const newItems = []
      for (i in s.SubjectList){
        const item = s.SubjectList[i]
        if(i == 0){
          setSelectedSubject(item)
        }
        newItems.push(
          <Picker.Item label={item} value={item} key={i}/>
        )
      console.log(i)
      }
      setitems(newItems)}
    ,[]
  )


  return ( 
    <View >
      <Text>{day}</Text>
      <Picker
        selectedValue={selectedSubject}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedSubject(itemValue)
        }>
        {items}
      </Picker>
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