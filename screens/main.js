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
    const value = JSON.parse(await AsyncStorage.getItem(key));
    if (value !== null && value !== undefined && value !== 'undefined') {
      console.log(`return ${value}`)
      console.log(value)
      //if (value == plan.stundenPlan){return}
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
  storeData('stundenPlan', JSON.stringify(plan.stundenPlan))
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \n', plan.stundenPlan)
}

async function getStoredStunendplan(){
  
  await getData('stundenPlan', (x) => { plan.stundenPlan = x; console.log('-------------------------------------------------------------------- \n', plan.stundenPlan)})
  console.log("2")
}

export default function Main({ navigation, route }) {
  console.log('main');
  navigation.setOptions({
    headerRight: () => <Button onPress={() => save()} title='save'/>
  })
  

  const [id, setId] = useState(0);
  const [reload, setReload] = useState(0);
  const [stundenPlanItem, setStundenPlan] = useState(<Text>Laden...</Text>);

  const loadStundenPlan = () => {
    setStundenPlan(<StundenPlan navigation={navigation} reload={Math.random()} />);
  };

  useEffect(() => {
    async function run() {
      await getStoredStunendplan()
      console.log('state');
      const newId = await cal.SetCalId();
      setId(newId);
      loadStundenPlan();
    }
    run();
  }, []); 

  useEffect(() => {
    if (id === 0) {
      console.log('id');
      return;
    }
  }, [id]); 

  useEffect(() => {
    console.log('reload');
    if (reload == 0){return}
    loadStundenPlan();
  }, [reload]); 

  useEffect(() => {
    if (route.params?.refresh) {
      console.log('route params refresh');
      setStundenPlan(<Text>Laden...</Text>);  // Zurücksetzen auf den Ladezustand
      setReload(Math.random());
    }
  }, [route.params?.refresh]);  // Dieser Effekt wird nur ausgeführt, wenn `route.params?.refresh` sich ändert

  const [text, onChangeText] = React.useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Hausaufgabe:"
      />
      <Button title='Hausaufgabe hinzufügen' onPress={() => {plan.handlePress(id, text)}} />
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