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
            </View>


        </View>

    )

}


const style_settingsPage = StyleSheet.create({
    wrapper: {

    }
})