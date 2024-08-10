import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "expo-dev-client"

import Onboarding_Screen from './src/screens/Onboarding/Onboarding';
import Home from "./src/screens/Home/Home"
import Editor from './src/screens/Editor/Editor';
import Result from './src/screens/Result/Result';

import { useTranslation } from 'react-i18next';
import "./src/i18n/i18n.config"

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const { t, i18n } = useTranslation();
  const [isFirstOpen, setIsFirstOpen] = React.useState(true)
  
  const [loaded, error] = useFonts({
    'Montserrat-Regular': require('./src/assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('./src/assets/fonts/Montserrat-SemiBold.ttf'),
  });

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  React.useEffect(() => {
    checkLanguage();
    CheckFirstOpen();
  }, [])
  
  const checkLanguage = async () => {
    try {
      const Local = getLocales();
      const LangValue = await AsyncStorage.getItem('lang');

      if (!LangValue) {
        if (Local[0].languageCode == "en" || Local[0].languageCode == "tr") {
          i18n.changeLanguage(Local[0].languageCode)
          await AsyncStorage.setItem('lang', Local[0].languageCode);
          console.log("The language has been set to the system language");
        }
        else {
          i18n.changeLanguage("en")
          await AsyncStorage.setItem('lang', "en");
          console.log("Language has been set to 'en'");
        }
      }
      else if (LangValue) {
        i18n.changeLanguage(LangValue);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const CheckFirstOpen = async () => {
    const status = await AsyncStorage.getItem("isFirstOpen")
    setIsFirstOpen(status ? true : false)
  }

  return (
    <AlertNotificationRoot>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isFirstOpen ? "HomePage" : "Onboarding"} >
          <Stack.Screen name='Onboarding' component={Onboarding_Screen} />
          <Stack.Screen name='HomePage' component={Home} />
          <Stack.Screen name='Editor' component={Editor} />
          <Stack.Screen name='Result' component={Result} />
        </Stack.Navigator>
      </NavigationContainer>
    </AlertNotificationRoot>

  );
}