import { StatusBar } from 'expo-status-bar';
import { useState, createRef, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from './Components/Loader';
import SPH_auth from '../code/SPH_Networking/SPH-auth';
import sphLogout from '../code/SPH_Networking/SPH-logout';
import getSPHData from '../code/SPH_Networking/SPH-GetterAndSaver';



export default function LoginScreen({ navigation }) {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();




  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Bitte gebe deinen Namen ein');
      return;
    }
    if (!userPassword) {
      alert('Bitte gebe dein Passwort ein');
      return;
    }
    setLoading(true);

    SPH_auth(userEmail, userPassword, (sessionID, success) => {


      if (success == true) {

        const payLoad = {
          user_name: userEmail,
          user_password: userPassword
        }

        AsyncStorage.setItem('user_credentials', JSON.stringify(payLoad)).then(() => {

          //getSPHData(sessionID, () => {
          //  setLoading(false);
          //  navigation.replace('TabNavigationRoutes');
          //
          //})

          setLoading(false)
          navigation.replace('SplashScreen')

        })

      } else {

        alert('Dein Benutzername oder Passwort ist falsch.')
        setLoading(false)

      }
    })




    //fetch('http://localhost:3000/api/user/login', {
    //  method: 'POST',
    //  body: formBody,
    //  headers: {
    //    //Header Defination
    //    'Content-Type':
    //    'application/x-www-form-urlencoded;charset=UTF-8',
    //  },
    //})
    //  .then((response) => response.json())
    //  .then((responseJson) => {
    //    //Hide Loader
    //    setLoading(false);
    //    console.log(responseJson);
    //    // If server response message same as Data Matched
    //    if (responseJson.status === 'success') {
    //      AsyncStorage.setItem('user_id', responseJson.data.email);
    //      console.log(responseJson.data.email);
    //      navigation.replace('DrawerNavigationRoutes');
    //    } else {
    //      setErrortext(responseJson.msg);
    //      console.log('Please check your email id or password');
    //    }
    //  })
    //  .catch((error) => {
    //    //Hide Loader
    //    setLoading(false);
    //    console.error(error);
    //  });
  };


  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />

      <KeyboardAvoidingView enabled behavior="padding" style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
          style={styles.ScrollView}
        >
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../assets/icon.png')}
              style={{
                width: '50%',
                height: 120,
                resizeMode: 'contain',
                margin: 30,
                marginTop: 100
              }}
            />

            <Text style={styles.logoTextStyle}>
              ALBERT EINSTEIN GYMNASIUM
            </Text>


          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) =>
                setUserEmail(UserEmail)
              }
              placeholder="Vorname.Nachname"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              placeholder="Passwort" //12345
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
              ref={passwordInputRef}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry={true}
              underlineColorAndroid="#f000"
              returnKeyType="next"
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitPress}>
            <Text style={styles.buttonTextStyle}>ANMELDEN</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.datasecurityText}>
              Deine persönlichen Daten werden ausschließlich auf deinem Gerät gespeichert.
              Grund dafür ist, dass ich kein Geld für Server habe, auf dem diese Daten
              gespeichert werden könnten (verdammt) und NATÜRLICH auch aus Datenschutzgründen.{"\n"}{"\n"}
              Deine persönlichen Daten werden verschlüsselt an die Schulportal-Hessen-Server übertragen,
              genau so, wie du es auch schon aus dem Internet-Browser kennst.
            </Text>

            <Text style={[styles.datasecurityText, { textAlign: 'center' }]}>
              Entwickelt von Tim Bernhardt
            </Text>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>



      <StatusBar style="dark" />
    </View>
  )

}


const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: 'white',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 5,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#42a4f5',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#42a4f5',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: '800'
  },
  inputStyle: {
    flex: 1,
    color: '#3b3b3b',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  logoTextStyle: {
    color: '#4a4a4a',
    //letterSpacing: '4',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '900'
  },
  datasecurityText: {
    marginLeft: 35,
    marginRight: 35,
    color: '#949494',
    fontSize: 10,
    marginTop: 30,
    lineHeight: 18
  },
  ScrollView: {

  }


});