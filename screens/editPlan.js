import { Dimensions, StyleSheet, View, Text, Button, Platform,TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';

import * as s from '../scripts/stundenplan'

export default function EditView({ navigation, route}) {
  const { lesson, day, ColourStyle, index  } = route.params;

  async function storeData(key, data) {
    try {
     await AsyncStorage.setItem(String(key), String(data));
     console.log('Data stored successfully') //, key, data);
    } catch (error) {
      console.log('Error storing data: ', error);
    }
  };

  
  function save(plan){
    if(plan['moA'] == -1){
        return
    }
    console.log('SAVE from edit: ', plan)
    storeData('stundenPlan', JSON.stringify(plan))
    //console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \n', plan.stundenPlan)
  } 


  const edit = () => {
    //const index = s.stundenPlan[day].indexOf(lesson)
    console.log('edit index: ',index)

    if (index !== -1) {
        s.stundenPlan[day][index] = selectedSubject;
        console.log('switch')
    }
    console.log('updated ',day, 'to: ', s.stundenPlan[day])
    save(s.stundenPlan)
    navigation.navigate('main', { refresh: Math.random() });
    
  }

  const deleteLesson = () => {
    //console.log(s.stundenPlan[day])
    //const index = s.stundenPlan[day].indexOf(lesson)
    console.log(index);
    console.log(s.stundenPlan[day][index])
    s.stundenPlan[day].splice(index, 1);
    console.log(s.stundenPlan[day])
    navigation.navigate('main', { refresh: Math.random() });
  }

  const [selectedSubject, setSelectedSubject] = useState();
  const [items, setitems] = useState()


  useEffect(
    () => {
      console.log('FROM EDIT: ', index)
      const newItems = []
      for (const i in s.SubjectList){
        const item = s.SubjectList[i]
        if(i == 0){
          setSelectedSubject(item)
        }
        newItems.push(
          <Picker.Item label={item} value={item} color={ColourStyle.text.color} key={i}/>
        )
      //console.log(i)
      }
      setitems(newItems)}
    ,[]
  )

  

  return ( 
    <View flex={1} backgroundColor={ColourStyle.background.backgroundColor}>
      
      <Picker
        selectedValue={selectedSubject}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedSubject(itemValue)
        }>
        {items}
      </Picker>
      <Button title={'Save'} onPress={edit}></Button>
      <Button title={'Delete'} onPress={deleteLesson}/>
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