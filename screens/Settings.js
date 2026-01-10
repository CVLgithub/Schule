import { Dimensions, StyleSheet, View, Text, Button, Platform,TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import {Picker} from '@react-native-picker/picker';

import * as s from '../scripts/stundenplan'
import {setSettings, returnSettings} from '../scripts/storage.js';

import { Dropdown } from 'react-native-element-dropdown';
import * as test from '../assets/color/1.png'


export default function SettingsView({ navigation, route}) {
  console.log('Settings View geöffnet')
  const { ColourStyle, forceRefresh } = route.params;
  const [selectedSubject, setSelectedSubject] = useState();
  const [items, setitems] = useState()
  const [text, onChangeText] = React.useState('');
  const [EvenIsA, setEvenIsA] = useState('')
  const [AlwaysLight, setAlwaysLight] = useState('test')
  const [StartAtSameTime, setStartAtSameTime] = useState('test')
  const getEvenIsA = async() => {
    const data = await s.getData('EvenWeekIsA', (x) => {return(x)})
    if (data == 'error'){return}
      setEvenIsA(data)
  }

  const getSettings = async () =>{
    console.group('getSettings called')
    const x = await returnSettings()
    console.log('Recieved at SettingsView', x)
    if(x.AlwaysLight == AlwaysLight && x.startAtSameTime == StartAtSameTime){console.error('stopped refresh');console.groupEnd(); return}
    setAlwaysLight(x.alwaysLight)
    setStartAtSameTime(x.startAtSameTime)
    console.groupEnd()
  }

  useEffect(
    () => {
      const newItems = []
      setSelectedSubject(s.SubjectList[0])
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
    const a = {}
    a[selectedSubject] = 'delete'
    setSettings({'lessonColours': a})
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
      if(StartAtSameTime == 'test'|| AlwaysLight == 'test'){
        getSettings()
        return
      }
      setSettings({'startAtSameTime': StartAtSameTime, 'alwaysLight': AlwaysLight})
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

  
  
  const customColorStyles = [
    {
      value: '0',
      lable: '#0',
      color: ColourStyle.primary.color
    },
    {
      value: '1',
      lable: '#1',
      color: '#d6e6d7',
    },
    {
      value: '2',
      lable: '#2',
      color: '#b7c9b1',
    },
    {
      value: '3',
      lable: '#3',
      color: '#8fae8d',
    },
    {
      value: '4',
      lable: '#4',
      color: '#6b9d6a',
    },
    {
      value: '5',
      lable: '#5',
      color: '#4e8b57',
    },
    {
      value: '6',
      lable: '#6',
      color: '#3a6d45',
    },
    {
      value: '7',
      lable: '#7',
      color: '#2b4e34',
    },{
      value: '8',
      lable: '#8',
      color: '#1d3a27',
    },{
      value: '9',
      lable: '#9',
      color: '#14301e',
    },

  ]

  const [value, setValue] = useState(customColorStyles[0]);
  const [selected, setSelected] = useState(customColorStyles[0])

  const renderItem = (item) => {
    return (<View style={styles.itemRow}>
      <View style={[styles.swatch, {backgroundColor: item.color}]}>
      </View>
    </View>
    )
  }

  const renderLeftIcon = () => {
    return (
      <View style={[styles.swatch, {backgroundColor: selected.color, width: 100}]}>
      </View>
    )
  }


  const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    alignSelf: 'center'
  },
  titleText: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: ColourStyle.text.color
  },
  dropdownView: {
    alignItems: 'center'
  },
  dropdown: {
    margin: 16,
    height: 50,
    width: 150,
    backgroundColor: ColourStyle.primary.color,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    width: 0,
    flex: 0,
    fontSize: 0
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  swatch: {
    flex: 1,
    //marginVertical: 0.2,
    marginHorizontal: 0,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
  },
  itemRow:{
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    //backgroundColor: ColourStyle.third.color,
    //height: 100,
  },
  itemContainerStyle: {
    backgroundColor: ColourStyle.third.color,
    borderWidth: 2,
    borderColor: ColourStyle.third.color,
    paddingVertical: 3,
    borderRadius: 8,
  },
  refresh: {
    borderWidth: 2,
    width: 120,
    alignSelf: 'center',
    marginTop: 15,
    borderColor: ColourStyle.text.color
  }
  });


  const setCustomColor = (subject, color) => {
    console.error(subject, color)
    const a = {}
    a[subject] = color
    setSettings({'lessonColours': a})
  }

  return ( 
    <View flex={1} backgroundColor={ColourStyle.background.backgroundColor}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Fach hinzufügen"
        color={ColourStyle.text.color}
      />
      <Button title='Hinzufügen' onPress={add}/>
      <Picker
        selectedValue={selectedSubject}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedSubject(itemValue)
        }>
        {items}
      </Picker>
      <View style={styles.dropdownView}>
        <Dropdown
        containerStyle={styles.itemContainerStyle}
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        imageStyle={styles.imageStyle}
        iconStyle={styles.iconStyle}
        maxHeight={200}
        value={value}
        data={customColorStyles}
        valueField="value"
        //labelField="lable"
        imageField="image"
        placeholder="Select Color"
        searchPlaceholder="Search..."
        onChange={e => {
          setSelected(e)
          console.log(e.value);
          setCustomColor(selectedSubject, e.color)
        }}
        renderItem={renderItem}
        renderLeftIcon={renderLeftIcon}
       /*  renderLeftIcon={
          () => {
            selectedItem?.color ? (
              <View style={[styles.swatch, {backgroundColor: selecteditem.color}]}/>
            ) : null
          }
        } */
      />
      </View>
      <Button title='Delete' onPress={deleteSubject}/>
      <View marginTop={10} flex={1} borderTopWidth={2} borderTopColor={'grey'}>
        <Text style={styles.titleText}>Allgemein</Text>
        <Button title={'Start at same time:' + ' ' + StartAtSameTime} onPress={changeStartAtSameTime}/>
        <Button title={'AlwaysLight' + ' ' + AlwaysLight} onPress={changeLightMode}/>
        <Button title={'EvenIsA' + ' ' + EvenIsA} onPress={changeEvenIsA}/>
        <View style={styles.refresh}>
          <Button color={ColourStyle.text.color} title='Refresh' onPress={() => {
            console.log('force Refresh')
            forceRefresh(Math.random())
          }} />
      </View>
      </View>
      
    </View>
  );


}

