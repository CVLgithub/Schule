import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform, TextInput} from 'react-native';
import * as cal from '../scripts/calendar'
import * as plan from '../scripts/stundenplan'
import StundenPlan from '../components/Stundenplan';

export default function Main({ navigation, route }) {
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