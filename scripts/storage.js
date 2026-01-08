import AsyncStorage from '@react-native-async-storage/async-storage';

async function storeData(key, data) {
    try {
      await AsyncStorage.setItem(String(key), String(data));
      console.log('Data stored successfully', key, data);
    } catch (error) {
      console.log('Error storing data: ', error);
    }
    console.groupEnd()
};

async function getData(key, callback) {
    try {
        const value = JSON.parse(await AsyncStorage.getItem(key));
        if (value !== null && value !== undefined && value !== 'undefined') {
            console.log(`return Data: ${value}`)
            callback(value)
            return value
        } else {
            console.log('No data found');
            return 'error'
        }
    } catch (error) {
        console.log('Error retrieving data 2: ', error);
        return 'error'
    }
};


const defaultSettings = {
  'alwaysLight': false,
  'startAtSameTime': true,
  'lessonColours': {
  }
}

export let Settings = defaultSettings

function saveSettings(){
  console.log('saving Settings')
  storeData('Settings', JSON.stringify(Settings))
  
}

const getSettingsFromStorage = async () => {
    const x = await getData('Settings', (x) => {return(x)})
    console.group('Get Settings')
    console.log(x)
   
    if (x == 'error' || !(typeof x === 'object' && !Array.isArray(x) && x !== null)){
        console.log('error retrieving Settings!!!!')
        console.groupEnd()
        return defaultSettings
    }
    console.groupEnd()
    return x    
}

const getSettings = async () => {
  console.log('retrieving Settings')
  Settings = await getSettingsFromStorage()
}

export function setSettings(dic){
  console.group('setSettigs with dic:')
  console.log(dic)
  for (let key in dic) {
    console.log(key, dic[key]);
    console.log('Settings before:')
    console.log(Settings)
    console.log(key, ' <- exist: ', key in Settings)
    if (key in Settings){
      Settings[key] = dic[key]
      console.log(Settings[key])
    }
  }
  saveSettings()
}

//run on Startup
getSettings()


