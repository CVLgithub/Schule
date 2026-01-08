import { Dimensions, StyleSheet, View, Text, Button, Platform,TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import {Picker} from '@react-native-picker/picker';

import * as s from '../scripts/stundenplan'
import {Settings} from '../scripts/storage.js';


export default function SettingsView({ navigation, route}) {
  console.log('Settings View geöffnet')
  const { ColourStyle } = route.params;
  const [selectedSubject, setSelectedSubject] = useState();
  const [items, setitems] = useState()
  const [text, onChangeText] = React.useState('');
  const [EvenIsA, setEvenIsA] = useState('')
  const [AlwaysLight, setAlwaysLight] = useState('test')
  const [StartAtSameTime, setStartAtSameTime] = useState('test')
  console.error('from Settings: alwaysLight: ', Settings )
  const getEvenIsA = async() => {
    const data = await s.getData('EvenWeekIsA', (x) => {return(x)})
    if (data == 'error'){return}
      setEvenIsA(data)
  }

  const getSettings = () =>{
    /* console.warn('refreshing settings from storage with: ', Settings)
    setAlwaysLight(Settings.alwaysLight)
    setStartAtSameTime(Settings.startAtSameTime) */
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
      getSettings()
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
      if(StartAtSameTime == 'test'|| AlwaysLight == 'test'){return}
      //console.error('saving: ', StartAtSameTime, AlwaysLight)
      //setSettings({'startAtSameTime': StartAtSameTime, 'alwaysLight': AlwaysLight})
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