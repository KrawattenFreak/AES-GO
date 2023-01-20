import * as React from 'react';
import { RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SettingsPage({ navigation }) {


    return (

        <View style={style_settingsPage.wrapper}>

            <View style={{ marginTop: 400 }}>
                <Button
                    onPress={() => AsyncStorage.removeItem('user_name')}
                    title="Remove user_name"
                />

                <Button
                    onPress={() => {
                        AsyncStorage.setItem('vertretung', '[{"date":"20.01.2023","data":[{"stunde":"5-6","klasse":"Q1Q2","lehrkraft":"MUTTER","art":"Selbststudium","fach":"PW1","raum":"","raum_alt":"A107","hinweis":"Entfall","id":"9aa0d976-db1c-4bbc-a12a-2a09c47b603e-be649b3a7"},{"stunde":"8-9","klasse":"Q1Q2","lehrkraft":"SUE","art":"Raum","fach":"s6","raum":"A204","raum_alt":"A101","hinweis":"","id":"218c3c3b-d806-474d-bfac-c857d905cb9f-36cf0d39e"},{"stunde":"8-9","klasse":"Q1Q2","lehrkraft":"BLD","art":"Selbststudium","fach":"s6","raum":"","raum_alt":"T4","hinweis":"Entfall","id":"218c3c3b-d806-474d-bfac-c857d905cb9f-36cf0d39e"},{"stunde":"1-11","klasse":"Q1Q2","lehrkraft":"BLD","art":"Veranst.","fach":"s6","raum":"","raum_alt":"T4","hinweis":"Österreich","id":"218c3c3b-d806-474d-bfac-c857d905cb9f-36cf0d39e"}]},{"date":"23.01.2023","data":[{"stunde":"1-2","klasse":"Q1Q2","lehrkraft":"","art":"Klausur","fach":"p5","raum":"B503","raum_alt":"","hinweis":"Physik","id":"b7146869-81de-4383-a411-35d1a07139f4-e5b7fc335"},{"stunde":"10-11","klasse":"Q1Q2","lehrkraft":"NEU","art":"Selbststudium","fach":"PW1","raum":"","raum_alt":"A107","hinweis":"Entfall","id":"761b6843-a1a6-4d60-93b1-9d192f0fe61e-3bef8239e"}]}]')
                    }}
                    title='setFakeVertretung'
                />



            </View>


        </View>

    )

}


const style_settingsPage = StyleSheet.create({
    wrapper: {

    }
})