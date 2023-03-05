// Import React and Component
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFonts } from 'expo-font';

import SPH_sync from '../code/SPH_Networking/SPH-sync';

import SVGatorComponent from './Components/Animations/DataDonwload';


export default function SplashScreen({ navigation }) {

  const [fontsLoaded] = useFonts({
    'threeFont': require('../assets/fonts/3DIsometricBold-8MYYZ.otf'),
  });


  const [animating, setAnimating] = useState(true);

  useEffect(() => {


    AsyncStorage.getItem('user_credentials').then((value) => {

      if (value === null) {
        navigation.replace('Auth')
      } else {

        SPH_sync((success) => {

          if (success) {
            navigation.replace('TabNavigationRoutes')
          } else {
            navigation.replace('Auth')
          }
          setAnimating(false);

        })

      }

    }
    );





  }, [])



  return (
    <View style={styles.container}>
      <SVGatorComponent />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
      <Text style={styles.text}>SYNCHRONISIERUNG</Text>
    </View>


  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tomato',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },

  text: {
    color: 'white',
    fontWeight: '800'
  }
});