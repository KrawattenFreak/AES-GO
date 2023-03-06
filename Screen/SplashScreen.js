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
import DataSyncAnimation from './Components/Animations/DataSync';


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
      <DataSyncAnimation style={styles.animation} height={400} />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
      <Text style={styles.text}>DATEN WERDEN GELADEN...</Text>
    </View>


  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#42a4f5',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },

  text: {
    color: 'white',
    fontWeight: '800'
  },
  animation: {
    height: 200,
    width: 200
  }
});