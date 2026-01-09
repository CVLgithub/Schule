import AsyncStorage from '@react-native-async-storage/async-storage';
import { lessonColours } from './stundenplan';

async function storeData(key, data) {
    try {
      await AsyncStorage.setItem(String(key), String(data));
      console.log('Data stored successfully', key, data);
    } catch (error) {
      console.log('Error storing data: ', error);
    }
    console.groupEnd()
    getSettingsFromStorage()
};

async function getData(key, callback) {
    try {
        const value = JSON.parse(await AsyncStorage.getItem(key));
        if (value !== null && value !== undefined && value !== 'undefined') {
            console.log(`return settings Data: ${value}`)
            console.log(JSON.stringify(value))
            callback(value)
            return value
        } else {
            console.error('No data found');
            return 'error'
        }
    } catch (error) {
        console.log('Error retrieving data 2: ', error);
        return 'error'
    }
};


const defaultSettings = {
  'alwaysLight': 'default',
  'startAtSameTime': 'default',
  'lessonColours': {
  }
}

export let Settings = {
  'alwaysLight': 'value1',
  'startAtSameTime': 'value1',
  'lessonColours': {
  }
}

function saveSettings(){
  console.log('saving Settings')
  storeData('Settings', JSON.stringify(Settings))
  
}

const getSettingsFromStorage = async () => {
    const x = await getData('Settings', (a) => {return(a)})
    console.group('Get Settings')
    console.log(JSON.stringify(x))
   
    if (x == 'error' || !(typeof x === 'object' && !Array.isArray(x) && x !== null)){
        console.error('error retrieving Settings!!!!')
        console.groupEnd()
        //return defaultSettings
    }
    console.groupEnd()
    console.groupEnd()
    return x    
}

const getSettings = async () => {
  console.log('start retrieving Settings')
  const c = await getSettingsFromStorage()
  Settings = c
}

const setlessonColours = (dic) => {
  let a = Settings.lessonColours
  for (let key in dic){
    a[key] = dic[key]
    if (dic[key] == 'delete'){
      delete a[key];
    }
  }
  return a
}

export function setSettings(x){
  let dic = x
  console.group('setSettigs with dic:')
  console.log(dic)
  for (let key in dic) {
    console.log(key, dic[key]);
    console.log('Settings before:')
    console.log(Settings)
    console.log(key, ' <- exist: ', key in Settings)
    if (key in Settings){
      if(key == 'lessonColours'){
        dic[key] = setlessonColours(dic[key])
      }
      Settings[key] = dic[key]
      console.warn(Settings[key])
    }
  }
  saveSettings()
}

export async function returnSettings(){
  console.group('return Settings')
  console.log(JSON.stringify(Settings))
  const x = await getSettingsFromStorage()
  console.log('return Settings: ',x)
  console.groupEnd
  return x
}

//run on Startup
getSettings()


