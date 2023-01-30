import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { TouchableOpacity, Pressable, RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import VertretungContainer from './HomePageVertretung/HomeVertretungContainer';
import StundenplanContainer from './HomePageVertretung/HomeStundenplanContainer';
import TasksContainer from './HomePageVertretung/HomeTasksContainer';

export default function HomeContainer({ navigation, label, onPress, vertretungData, stundenplanData, tasksData }) {


    return (
        <View style={style.wrapper}>

            <TouchableOpacity onPress={onPress}>

                {
                    (label == 'Vertretung') ?
                        <VertretungContainer vertretungData={vertretungData}/> :
                        (label == 'Stundenplan') ?
                        <StundenplanContainer stundenplanData={stundenplanData}/>:
                        <TasksContainer tasksData={tasksData}/>

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

