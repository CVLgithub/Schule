import React, { useEffect, useState,useRef  } from 'react';
import { StyleSheet, View, Text, Button, Platform, TextInput, Pressable, ScrollView} from 'react-native';
import * as cal from '../scripts/calendar'
import * as plan from '../scripts/stundenplan'
import StundenPlan from '../components/Stundenplan';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationRouteContext } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, Easing } from 'react-native-reanimated';
import {Picker} from '@react-native-picker/picker';

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
    headerRight: () => <Button onPress={() => navigation.navigate('Einstellungen')} title='Einstellungen'/>
  })
  

  const [id, setId] = useState(0);
  const [reload, setReload] = useState(0);

  const [stundenPlanItem, setStundenPlan] = useState(<Text>Laden...</Text>);
  const [selectedSubject, setSelectedSubject] = useState();
  const [items, setitems] = useState(0)
  const [pickerVar, setPicker] = useState(0)

  const loadStundenPlan = () => {
    setStundenPlan(<StundenPlan navigation={navigation} reload={Math.random()} />);
  };

  const confPicker = () => {
    console.log('conf Picker')
    const newItems = []
      for (i in plan.SubjectList){
        const item = plan.SubjectList[i]
        if(i == 0){
          setSelectedSubject(item)
        }
        newItems.push(
          <Picker.Item styles={styles.pickerItem}label={item} value={item} key={i}/>
        )
        console.log('test')
      }
      setitems(newItems)
  }

  useEffect(() => {
  
    const x = () => {
      if (items == 0){return}

      setPicker(<Picker
      numberOfLines={1}
      style={styles.picker}
      height={200}
      selectedValue={selectedSubject}
      onValueChange={(itemValue, itemIndex) =>
        setSelectedSubject(itemValue)
      }>
      {items}
    </Picker>)
    }
    x()
    
  }, [items])

  useEffect(() => {
    async function run() {
      console.log('EFFECT 1 ______________________________')
      await getStoredStunendplan()
      console.log('state');
      const newId = await cal.SetCalId();
      setId(newId);
      if(pickerVar == 0){
        confPicker()
      }
      loadStundenPlan()
      
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
    

    if (reload == 0){return}
    console.log('EFFECT 2 ______________________________')
    save()
    loadStundenPlan();
    
    
    
  }, [reload]); 

  useEffect(() => {
    if (route.params?.refresh) {
      console.log('EFFECT 3 ______________________________')
      console.log('route params refresh');
      setStundenPlan(<Text>Laden...</Text>);  // Zurücksetzen auf den Ladezustand
      setReload(Math.random());
      
    }
  }, [route.params?.refresh]);  // Dieser Effekt wird nur ausgeführt, wenn `route.params?.refresh` sich ändert

  const [text, onChangeText] = React.useState('');



  const [SwitchState, setSwitchState] = useState('auto')
  const Switchwidths = [100, 60]
  const switchColors = ['green', 'red']

  const SwitchDicleft = {
    dimension: {
      left: 100,
      right: 60
    },
    color: {
      left: 'green',
      right: 'red'
    }
  }
  const SwitchDicRight = {
    dimension: {
      left: 50,
      right: 110
    },
    color: {
      left: 'red',
      right: 'green'
    }
  }

  const switchAnimated = useSharedValue(SwitchDicleft)

  const handlePress = () => {
    console.log('press')
    if (switchAnimated.value.dimension.left == 100){
      setSwitchState('custom')
      switchAnimated.value = withTiming(SwitchDicRight)
      return
    } 
    setSwitchState('auto')
    switchAnimated.value = withTiming(SwitchDicleft)
    
  };
  const animatedleft = useAnimatedStyle(() => {
    return {
        width: switchAnimated.value.dimension.left,
        backgroundColor: switchAnimated.value.color.left
    };
  });
  const animatedRight = useAnimatedStyle(() => {
    return {
      width: switchAnimated.value.dimension.right,
      backgroundColor: switchAnimated.value.color.right
    };
  });

  const ButtonLeft = () => {
    return (
      
      <Animated.View style={[styles.SwitchState, styles.buttonLeft, animatedleft]}>
        <Pressable onPress={handlePress} hitSlop={50}>
          <Text>Auto</Text>
        </Pressable>
      </Animated.View>
    )
  }
  
  const ButtonRight = () => {
    return (
      <Animated.View style={[styles.SwitchState, styles.buttonRight, animatedRight]}>
        <Pressable onPress={handlePress} hitSlop={50}>
          <Text>Eigenes Fach</Text>
        </Pressable>
      </Animated.View>
    )
  }
  
  const Switch = () => {
    return (
      <View style={styles.switchContainer}>
        <ButtonLeft/>
        <ButtonRight/>
      </View>
    )
  }


  

  const SubjectSelect = () => {

    if (SwitchState == 'custom'){
      console.log(pickerVar)
      return (
          <View style={styles.pickerContainer}>
            {pickerVar}
          </View>
      )
    }
      return (
        <View >
        </View>
      )
  }

  const Header = () => {
    console.log('Generating columns'); // Debugging line
    const newColumns = [];
    for (i in plan.stundenPlan) {
      console.log('i', i)
      const day = i.slice(0, 2);
      if (day === 'so' || day === 'sa') {
          break;
      }
      const DayFull = plan.weekdayfull[day]
      newColumns.push(
        <View style = {styles.headerItem} key={i}>
          <Text style = {styles.headerTxt}>{DayFull}</Text>
        </View>
      );
    }
    return(
      <View style={styles.headerContainer}>
        {newColumns}
      </View>
    );

    
  }
    
  const scrollRef = useRef();
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Hausaufgabe:"
        height={50}
        margin={15}
      />
      <Switch/>
      <SubjectSelect/>
      <Button title='Hausaufgabe hinzufügen' onPress={() => {
      
        if(SwitchState == 'auto'){
          plan.handlePress(id, text, plan.stundenPlan)
        } else {
          plan.handlePressCustom(id, text, plan.stundenPlan, selectedSubject )
        }
      }} />
      <ScrollView ref={scrollRef} style={styles.scroll} bounces={false} stickyHeaderIndices={[0]}>
        <Header/>
        {stundenPlanItem}
      </ScrollView>
      
    </View>
  );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'space-around',
    },
    switchContainer: {
      flexDirection: 'row',
      padding: 5,
      //backgroundColor: 'blue'
    },
    buttonLeft: {
      backgroundColor: 'green',
      borderBottomLeftRadius: 5
    },
    buttonRight: {
      flexDirection: 'row-reverse',
      backgroundColor: 'red',
      borderBottomRightRadius: 5
    },
    SwitchState: {
      borderWidth: 1,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      height: 25,
      padding: 5,
    },
    scroll: {
      marginBottom: 10,
      borderBottomWidth: 1.5,
      flex: 1,
      maxHeight: 420,
      marginHorizontal: 20,
      paddingBottom:10,
    },
    pickerItem: {
      height: 10,
      backgroundColor: 'blue'
    },
    picker: {
      //backgroundColor: 'green',
      //height: 100
    },
    pickerContainer: {
      //height: 20,
      //marginBottom: 150,
      flex: 1,
      width: 220,
      //padding: 20,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      borderRightWidth: 1.5,
    },
    headerItem: {
      backgroundColor: '#DE0D4F',
      height: 40,
      justifyContent: 'center',
      flex: 1,
      position: 'absolut',
      top: -2,
      borderLeftWidth: 1.5,
      borderTopWidth: 3.5,
      borderBottomWidth: 1.5
    },
    headerTxt: {
      fontSize: 12,
      alignSelf: 'center'
    },
    });