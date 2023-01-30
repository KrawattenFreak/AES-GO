import React, { useState, useEffect, useRef } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeContainer from './HomePageScreens/HomeScreenContainer';
import HomeScreenStundenplan from './HomePageScreens/HomeScreenStundenplan';
import HomeScreenVertretung from './HomePageScreens/HomeScreenVertretung';
import Interactive3DPage from './Interactive3DPage';

import getSPHData from '../../code/SPH_Networking/SPH-GetterAndSaver';
import SPH_auth from '../../code/SPH_Networking/SPH-auth';
import SPH_sync from '../../code/SPH_Networking/SPH-sync';

import SettingsModal from './SettingsScreen/SettingsModal';

import VertretungsplanLoad from '../../code/SPH_Loading/VertretungsplanLoad';
import StundenplanLoad from '../../code/SPH_Loading/StundenplanLoad';

import { RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text, Animated, TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';


const Stack = createStackNavigator();




export default function HomePage({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: true, headerBackTitle: 'Zurück' }}>
            <Stack.Screen label='Home' name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreenVertretung" component={HomeScreenVertretung} options={{ title: 'Vertretungsplan' }} />
            <Stack.Screen name="HomeScreenStundenplan" component={HomeScreenStundenplan} options={{ title: 'Stundenplan' }} />
            <Stack.Screen name="Interactive3DPage" component={Interactive3DPage} options={{ title: '3D-View' }} />
        </Stack.Navigator>

    );
}


function HomeScreen({ navigation }) {

    const modalizeRef = useRef(null);

    const animated = useRef(new Animated.Value(0)).current;


    const [refreshing, setRefreshing] = useState(false);
    const [homeScreenData, setHomeScreenData] = useState({
        vData: [],
        sData: [[], []],
        welcomeName: ''
    })


    function loadHome() {



        AsyncStorage.getItem('user_credentials').then(userCredentials => {

            const name = JSON.parse(userCredentials).user_name.split('.')


            let payLoad = {
                vData: [],
                sData: [],
                welcomeName: ''
            }

            VertretungsplanLoad((vData) => {

                payLoad.vData = vData
                payLoad.welcomeName = capitalizeFirstLetter(name[0]) + ' ' + capitalizeFirstLetter(name[1])


                StundenplanLoad((sData) => {



                    payLoad.sData = sData

                    setRefreshing(false)
                    setHomeScreenData(payLoad)

                })


            })
        })

    }


    useEffect(() => {

        setRefreshing(true)
        loadHome()

    }, [])

    function onRefresh() {
        setRefreshing(true)
        SPH_sync((success) => {

            if (success) {
                loadHome()
            } else {
                navigation.replace('Auth')
            }

        })

    }

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    return (



        <View style={style_DashboardScreen.wrapper}>

            <Modalize ref={modalizeRef} panGestureAnimatedValue={animated} adjustToContentHeight style={style_DashboardScreen.modalize}>
                <View style={style_DashboardScreen.wrapperModal}>
                    <SettingsModal>

                    </SettingsModal>

                </View>
            </Modalize>

            <View style={style_DashboardScreen.headerView} >
                <Text numberOfLines={1} style={style_DashboardScreen.headerText}>{homeScreenData.welcomeName}</Text>

                <TouchableOpacity onPress={onOpen}>
                    <Ionicons name={'settings'} size={25} color={'#a3a3a3'} />

                </TouchableOpacity>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => onRefresh()}
                    />
                }
                contentContainerStyle={style_DashboardScreen.contentView}
            >

                <HomeContainer vertretungData={homeScreenData.vData} label='Vertretung' onPress={() => navigation.navigate('HomeScreenVertretung')} />
                {
                    <HomeContainer stundenplanData={homeScreenData.sData} label='Stundenplan' onPress={() => navigation.navigate('HomeScreenStundenplan')} />
                }

            </ScrollView>

        </View>
    );

}

const style_DashboardScreen = StyleSheet.create({
    wrapper: {
        flex: 1,
    },

    headerView: {
        //paddingTop: (Platform.OS === 'ios') ? 80 : 0,
        //Code 001
        marginHorizontal: 20,
        marginTop: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: '#3d3d3d',
        flex: 1

    },
    contentView: {
        width: '100%',
        alignItems: "center",
        marginTop: 30,
        //backgroundColor: 'red'

    },



    //SETTING MODAL
    modalize: {

    },
    wrapperModal: {

    }


})




//MY FUNCTIONS

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}