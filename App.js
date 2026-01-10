import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

import { StatusBar } from 'expo-status-bar';
import { Appearance, Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainView from './screens/main.js';
import EditView from './screens/editPlan.js';
import AddView from './screens/newLesson.js';

import Week from './components/week.js';
import SettingsView from './screens/Settings.js';
import { useEffect, useState } from 'react';

import {returnSettings} from './scripts/storage.js';
SplashScreen 

const screenWidth = Dimensions.get('window').width; // full width
const screenHeight = Dimensions.get('window').height; // full height

/* const DarkTheme = StyleSheet.create({
  text: {
    color: 'white',
  },
  background: {
    backgroundColor: 'black',
  },
  primary: {
    color: '#095795'
  },
  secondary: {
    color: '#107C02'
  },
  third: {
    color: '#00334B'
  },
  extra: {
    color: '#024670'
  }
}) */

const DarkTheme = StyleSheet.create({
  text: {
    color: 'white',
  },
  background: {
    backgroundColor: '#0F0F0F',
  },
  primary: {
    color: '#206b69'
  },
  secondary: {
    color: '#107C02'
  },
  third: {
    color: '#0c4e4c'
  },
  extra: {
    color: '#4fa79b'
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
    color: '#10A607'
  },
  primary: {
    color: '#8ccbb2'
  },
  third: {
    color: '#4fa79b'
  },
  extra: {
    color: '#b0e0d6'
  }
})

export default function App() {
  const Stack = createNativeStackNavigator();

  const [systemScheme, setSystemScheme] = useState(null) 

  const [isDarkTheme, setIsDarkTheme] = useState(); // Initialize with null
  const [loading, setLoading] = useState(true); // Add a loading state
  const [refresh, ForceRefresh] = useState(0); // Add a loading state
  const [refreshUi, ForceUiRefresh] = useState(0)


  const [ColourStyle, setColourStyle] = useState(null);

  const [SettingsLocal, setSettingsLocal] = useState();

  const getSettings = async () => {
    const x = await returnSettings()
    setSettingsLocal(x)
    setSystemScheme(Appearance.getColorScheme())
  }

  const updateSettings = async () => {
    console.error('set settings')
    const x = await returnSettings()
    setSettingsLocal(x)
    setSystemScheme(Appearance.getColorScheme())
    ForceUiRefresh(Math.random())
    
  }

  useEffect(() => {
    console.error('Local settings updated to: ', SettingsLocal)
  }, [SettingsLocal]
  )


  useEffect(() => {
    console.error('force refresh recieved with', refresh)
    if(refresh != 0){
      updateSettings()
    }
  }, [refresh]
  )

  useEffect(() => {
    console.log('get Settings from App.js')
    getSettings()
  }, []);
  

  useEffect(() => {
    if(systemScheme == null){return}
    console.log('system: ', systemScheme, '|', systemScheme === 'dark')
    setIsDarkTheme(systemScheme === 'dark');
  }, [systemScheme]);

  useEffect(() => {
    console.group('Set Theme Effect')
    console.log(SettingsLocal)
    console.log(systemScheme, isDarkTheme, '<---')
    console.groupEnd()
    if(isDarkTheme == null){return}
    if (isDarkTheme) { // Check if isDarkTheme is set
      if(SettingsLocal.alwaysLight == false){
        console.log('dark theme')
        setColourStyle(DarkTheme);
      } else {
        setColourStyle(LightTheme)
        console.log('Light Theme 1')
      }
    }else{
      setColourStyle(LightTheme)
      console.log('light Theme')
    }

    setLoading(false);
    hideSplash()
  }, [isDarkTheme]);


  const hideSplash = async() => {
    await SplashScreen.hideAsync()
  }

  if (loading) {
    return (
      // Display a loading indicator or nothing while loading
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }


  console.log('notloading:',ColourStyle)



  return (
    <>
      <SafeAreaView edges={['top']} style={[stylesb.safearea, {backgroundColor: ColourStyle.background.backgroundColor}]} />
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
        <StatusBar style={stylesb.status} />
        <NavigationContainer style={stylesb.nav} key={refreshUi}>
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
                headerLeft: () => <Week nav={navigation} ColourStyle={ColourStyle}/>,
              })}
              initialParams={{ ColourStyle: ColourStyle , SettingsLocal: SettingsLocal, forceRefresh: (i) => ForceRefresh(i)}} 
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
              initialParams={{ ColourStyle: ColourStyle, forceRefresh: (i) => ForceRefresh(i)  }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

const stylesb = StyleSheet.create({
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
