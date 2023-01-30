import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { TouchableOpacity, Pressable, RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import VertretungContainer from './HomePageVertretung/HomeVertretungContainer';
import StundenplanContainer from './HomePageVertretung/HomeStundenplanContainer';

export default function HomeContainer({ navigation, label, onPress, vertretungData, stundenplanData }) {


    return (
        <View style={style.wrapper}>

            <TouchableOpacity onPress={onPress}>

                {
                    (label == 'Vertretung') ?
                        <VertretungContainer vertretungData={vertretungData}/> :
                        <StundenplanContainer stundenplanData={stundenplanData}/>

                }

            </TouchableOpacity>
        </View>
    );

}



const style = StyleSheet.create({
    wrapper: {
        width: '100%'
    },
})

