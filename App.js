import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';



import MainView from './screens/main.js'
import EditView from './screens/editPlan.js'

const screenWidth = Dimensions.get('window').width; //full width
const screenHeight = Dimensions.get('window').height; //full height


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <SafeAreaView
        edges={["top"]}
        style={styles.safearea}
      />
      <SafeAreaView
        edges={["bottom"]}
        style={{
          flex: 1,
          backgroundColor: "#f2f2f2",
          position: "relative",
        }}
      >
        <StatusBar style={styles.status}/> 
        <NavigationContainer>
          <Stack.Navigator initialRouteName='main'>
            <Stack.Screen name = "main" component = {MainView}/>
            <Stack.Screen name = "Editieren" component = {EditView}/> 
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
    

  );
}




const styles = StyleSheet.create({
  safearea: {
    flex: 0
    //height: screenHeight,
  },
  status: {
    backgroundColor: "red"
  },
  title: {
    paddingTop: 15,
    fontSize: 25,
  },
  view: {
    flex: 1,
    width: screenWidth,
    /* backgroundColor: 'blue', */
    justifyContent: 'center',
    alignItems: 'center'
  },
  ScrollView: {
    paddingTop: 30,
    width: screenWidth,
    
  },
  selection: {
    height: 230,
    marginHorizontal: 30,
    marginBottom: 45,
  },
  stats: {
    backgroundColor: 'yellow',
    marginHorizontal: 30,
  },
  VocabItem: {
    backgroundColor: 'red',
  }

});
