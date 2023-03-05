import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { TouchableOpacity, Pressable, RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import VertretungContainer from './HomePageContainer/HomeVertretungContainer';
import StundenplanContainer from './HomePageContainer/HomeStundenplanContainer';
import TasksContainer from './HomePageContainer/HomeTasksContainer';
import InfoAESContainer from './HomePageContainer/HomeInfoAESContainer';

export default function HomeContainer({ navigation, label, onPress, vertretungData, stundenplanData, tasksData, infoAESData }) {


    return (
        <View style={style.wrapper}>

            <TouchableOpacity onPress={onPress}>

                {
                    (label == 'Vertretung') ?
                        <VertretungContainer vertretungData={vertretungData} /> :
                        (label == 'Stundenplan') ?
                            <StundenplanContainer stundenplanData={stundenplanData} /> :
                            (label == 'InfoAES') ?
                                <InfoAESContainer infoAESData={infoAESData} /> :
                                <TasksContainer tasksData={tasksData} />

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

