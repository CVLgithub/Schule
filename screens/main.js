import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import * as cal from '../scripts/calendar'
import * as plan from '../scripts/stundenplan'

export default function Main({ navigation, route }) {
  const[id,setid] = useState(0)
  useEffect(() => {
      async function run(){
          setid(await cal.SetCalId())
      }
      run()
  }, [])

  useEffect(() => {if (id == 0){return}}, [id])

    

  return (
    <View style={styles.container}>
      <Text>Calendar Module Example</Text>
      <Button title='test' onPress={() => {cal.event(id, 'test', plan.nextDate('englisch'), 15)}}/>
      <Button title='StundenPlan' onPress={() => {navigation.navigate("StundenPlan")}}/>
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