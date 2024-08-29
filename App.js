import { StatusBar } from 'expo-status-bar';
import { Appearance, Dimensions, StyleSheet, SafeAreaView, View, ActivityIndicator } from 'react-native';
import { useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainView from './screens/main.js';
import EditView from './screens/editPlan.js';
import AddView from './screens/newLesson.js';

import Week from './components/week.js';
import SettingsView from './screens/Settings.js';
import { useEffect, useState } from 'react';


export let Settings = {
  'alwayslight': false,
  'startAtSameTime': true
}

const screenWidth = Dimensions.get('window').width; // full width
const screenHeight = Dimensions.get('window').height; // full height

const DarkTheme = StyleSheet.create({
  text: {
    color: 'white',
  },
  background: {
    backgroundColor: 'black',
  },
  secondary: {
    color: '#0000a0'
  }
})

const LightTheme = StyleSheet.create({
  text: {
    color: 'black',
  },
  background: {
    backgroundColor: 'white' 
  },
  secondary: {
    color: '#0080ff'
  }
})

export default function App() {
  const Stack = createNativeStackNavigator();
  const systemScheme = Appearance.getColorScheme()

  console.log('System Theme:', systemScheme);

  const [isDarkTheme, setIsDarkTheme] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(true); // Add a loading state


  const [ColourStyle, setColourStyle] = useState(LightTheme);

  useEffect(() => {
    console.log('system: ', systemScheme)
    setIsDarkTheme(systemScheme === 'dark');
  }, [systemScheme]);

  useEffect(() => {
    console.log(systemScheme, isDarkTheme, '<---')
    if(isDarkTheme == null){return}
    if (isDarkTheme) { // Check if isDarkTheme is set
      setColourStyle(DarkTheme);

    }
    setLoading(false);
  }, [isDarkTheme]);

  if (loading) {
    return (
      // Display a loading indicator or nothing while loading
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  console.log('notloading:',ColourStyle)



  return (
    <>
      <SafeAreaView edges={['top']} style={[styles.safearea, {backgroundColor: ColourStyle.background.backgroundColor}]} />
      <SafeAreaView
        edges={['bottom']}
        style={[
          {
            flex: 1,
            backgroundColor: ColourStyle.background.backgroundColor,
            position: 'relative',
          },
          ColourStyle.background.backgroundColor,
        ]}
      >
        <StatusBar style={styles.status} />
        <NavigationContainer style={styles.nav}>
          <Stack.Navigator
            initialRouteName="main"
            screenOptions={{
              headerStyle: {
                backgroundColor: ColourStyle.background.backgroundColor, // Set the header background color here
              },
              headerTintColor: ColourStyle.text.color, // Optional: Change the header text color to white for better contrast
            }}
          >
            <Stack.Screen
              name="main"
              component={MainView}
              options={({ navigation, route }) => ({
                title: 'Schulplanner',
                headerLeft: () => <Week nav={navigation} ColourStyle={ColourStyle} />,
              })}
              initialParams={{ ColourStyle: ColourStyle }} 
            />
            <Stack.Screen 
              name="Editieren" 
              component={EditView}
              initialParams={{ ColourStyle: ColourStyle }}
            />
            <Stack.Screen 
              name="Hinzufügen" 
              component={AddView} 
              initialParams={{ ColourStyle: ColourStyle }}
            />
            <Stack.Screen 
              name="Einstellungen" 
              component={SettingsView}
              initialParams={{ ColourStyle: ColourStyle }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 0,
    // height: screenHeight,
  },
  status: {
    backgroundColor: 'red',
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
    alignItems: 'center',
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
  },
  nav: {
    backgroundColor: '#232226',
  },
});
