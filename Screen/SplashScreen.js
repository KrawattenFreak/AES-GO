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



export default function SplashScreen({ navigation }) {


  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);

      AsyncStorage.getItem('user_name').then((value) =>
        navigation.replace(
          value === null ? 'Auth' : 'TabNavigationRoutes'
        ),
      );




    }, 1000);
  }, [])



  return (
    <View style={styles.container}>
      <Text style={{ color: 'white' }}>Loading</Text>
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
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
});