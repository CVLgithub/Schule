import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform, TextInput} from 'react-native';
import * as cal from '../scripts/calendar'
import * as plan from '../scripts/stundenplan'
import StundenPlan from '../components/Stundenplan';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function storeData(key, data) {
  try {
    await AsyncStorage.setItem(String(key), String(data));
    console.log('Data stored successfully', key, data);
  } catch (error) {
    console.log('Error storing data: ', error);
  }
};

async function getData(key, callback) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null && value !== undefined && value !== 'undefined') {
      console.log(`return ${value}`)
      if (value == plan.stundenPlan){return}
      callback(value)
    } else {
      console.log('No data found');
      return 'error'
    }
  } catch (error) {
    console.log('Error retrieving data: ', error);
    return 'error'
  }
  };

function save(){
  storeData('stundenPlan', plan.stundenPlan)

}

async function getStoredStunendplan(){
  await getData('stundenPlan', (x) => {plan.stundenPlan = x})
  console.log("test")
}

export default async function Main({ navigation, route }) {
  navigation.setOptions({
    headerRight: () => <Button onPress={() => save()} title='save'/>
  })
  const [id, setId] = useState(0);
  const [reload, setReload] = useState();
  const [stundenPlanItem, setStundenPlan] = useState(<Text>Laden...</Text>);

  //neuen Stundenplan laden
  const loadStundenPlan = () => {
    setStundenPlan(<StundenPlan navigation={navigation} reload={Math.random()} />);
  };

  //Start effekt, stzt id und läd das erste mal
  useEffect(() => {
    async function run() {
      //await getStoredStunendplan()
      setId(await cal.SetCalId());
      loadStundenPlan();
    }
    run();
  }, []);

  //neu laden bei neuer id
  useEffect(() => {if (id === 0) {return}}, [id]);

  //Stundenplan erneut laden
  useEffect(() => {console.log('reload'); loadStundenPlan()}, [reload]);

  // stundenplan leeren und neuladen ausführen, wenn refresh tag
  useEffect(() => {
    if (route.params?.refresh) {
      console.log('gzgu')
      setStundenPlan()
      setReload(Math.random())
    }
  }, [route.params?.refresh]);

  const [text, onChangeText] = React.useState('');


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Hausaufgabe:"
      />
      <Button title='Hausaufgabe hinzufügen' onPress={() => {plan.handlePress(id,text)}}/>
      {stundenPlanItem}
    </View>
  );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    });