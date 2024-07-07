import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import * as cal from '../scripts/calendar'

export default function App() {
    const[id,setid] = useState(0)
    useEffect(() => {
        async function run(){
            setid(await cal.SetCalId())
        }
        run()

    }, [])

    useEffect(() => {if (id == 0){return}; console.log(id, 'from app.js')}, [id])

    const addEvent = (name, date = '2024-07-08', time = '00:00', endTime = '18:00') => {
        cal.addEvent(id, name, date, time, endTime)
    }


    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    });

  return (
    <View style={styles.container}>
      <Text>Calendar Module Example</Text>
      <Button title='test' onPress={() => {addEvent('test')}}/>
    </View>
  );
}
