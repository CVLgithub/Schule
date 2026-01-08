import { Dimensions, StyleSheet, View, Text, Button, Platform,TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import {Picker} from '@react-native-picker/picker';

import * as s from '../scripts/stundenplan'
import * as Storage from '../scripts/storage.js';


export default function SettingsView({ navigation, route}) {
  console.warn('Settings View geöffnet')
  const { ColourStyle } = route.params;
  const [selectedSubject, setSelectedSubject] = useState();
  const [items, setitems] = useState()
  const [text, onChangeText] = React.useState('');
  const [EvenIsA, setEvenIsA] = useState('')
  const [AlwaysLight, setAlwaysLight] = useState(Storage.Settings.alwayslight)
  const [StartAtSameTime, setStartAtSameTime] = useState(Storage.Settings.startAtSameTime)

  const getEvenIsA = async() => {
    const data = await s.getData('EvenWeekIsA', (x) => {return(x)})
    if (data == 'error'){return}
      setEvenIsA(data)
  }

  useEffect(
    () => {
      const newItems = []
      for (const i in s.SubjectList){
        const item = s.SubjectList[i]
        newItems.push(
          <Picker.Item label={item} value={item} color={ColourStyle.text.color} key={i}/>
        )
      }
      setitems(newItems)
      getEvenIsA()
    }     
    ,[route.params?.refresh]
  )

  const add = () => {
    s.SubjectList.push(text)
    s.saveSubjects()
    navigation.navigate('Einstellungen', { refresh: Math.random() })
  }
  
  const deleteSubject = () => {
    const index = s.SubjectList.indexOf(selectedSubject)
    s.SubjectList.splice(index, 1)
    s.saveSubjects()
    navigation.navigate('Einstellungen', { refresh: Math.random() })
  }

  const changeStartAtSameTime = () => {
    setStartAtSameTime(!StartAtSameTime)
  }

  const changeLightMode = () => {
    setAlwaysLight(!AlwaysLight)
  }

  useEffect(
    () => {
      Storage.setSettings({'startAtSameTime': StartAtSameTime, 'AlwaysLight': AlwaysLight})
    },
    [StartAtSameTime,AlwaysLight]
  )
  
  const changeEvenIsA = () => {
    setEvenIsA(!EvenIsA)
    
  }
  useEffect(
    ()=> {s.storeData('EvenWeekIsA', EvenIsA)},
    [EvenIsA]
  )

  return ( 
    <View flex={1} backgroundColor={ColourStyle.background.backgroundColor}>
      <Button title='Hinzufügen' onPress={add}/>
      <TextInput
        style={stylesSe.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Fach hinzufügen"
        color={ColourStyle.text.color}
      />
      <Picker
        selectedValue={selectedSubject}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedSubject(itemValue)
        }>
        {items}
      </Picker>
      <Button title='Delete' onPress={deleteSubject}/>
      <Button title={'Start at same time:' + ' ' + StartAtSameTime} onPress={changeStartAtSameTime}/>
      <Button title={'AlwaysLight' + ' ' + AlwaysLight + '  -No use'} onPress={changeLightMode}/>
      <Button title={'EvenIsA' + ' ' + EvenIsA} onPress={changeEvenIsA}/>
    </View>
  );
}

const stylesSe = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});