import React, { useState, useEffect, useRef } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';

import HomeContainer from './HomePageScreens/HomeScreenContainer';
import HomeScreenStundenplan from './HomePageScreens/HomeScreenStundenplan';
import HomeScreenVertretung from './HomePageScreens/HomeScreenVertretung';
import HomeScreenTasks from './HomePageScreens/HomeScreenTasks';
import HomeScreenInfoAES from './HomePageScreens/HomeScreenInfoAES';
import HomeScreenInfoAESSingle from './HomePageScreens/HomeScreenInfoAESSingle';

import getSPHData from '../../code/SPH_Networking/SPH-GetterAndSaver';
import SPH_auth from '../../code/SPH_Networking/SPH-auth';
import SPH_sync from '../../code/SPH_Networking/SPH-sync';

import SettingsModal from './SettingsScreen/SettingsModal';

import VertretungsplanLoad from '../../code/SPH_Loading/VertretungsplanLoad';
import StundenplanLoad from '../../code/SPH_Loading/StundenplanLoad';
import TasksLoad from '../../code/SPH_Loading/TasksLoad';
import InfoLoad from '../../code/SPH_Loading/InfoLoad';

import { RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text, Animated, TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import HomeInfoAdditionalContainer from './HomePageScreens/HomePageContainer/HomeInfoAdditionalContainer';


const Stack = createStackNavigator();




export default function HomePage({ navigation }) {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: true, headerBackTitle: 'Zurück' }}>
                <Stack.Screen label='Home' name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="HomeScreenVertretung" component={HomeScreenVertretung} options={{ title: 'Vertretungsplan' }} />
                <Stack.Screen name="HomeScreenStundenplan" component={HomeScreenStundenplan} options={{ title: 'Stundenplan' }} />
                <Stack.Screen name="HomeScreenTasks" component={HomeScreenTasks} options={{ title: 'Unterricht' }} />
                <Stack.Screen name="HomeScreenInfoAES" component={HomeScreenInfoAES} options={{ title: 'Information' }} />
                <Stack.Screen name="HomeScreenInfoAESSingle" component={HomeScreenInfoAESSingle} options={{ title: 'Information' }} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}


function HomeScreen({ navigation }) {

    const modalizeRef = useRef(null);

    const animated = useRef(new Animated.Value(0)).current;


    const [refreshing, setRefreshing] = useState(false);
    const [homeScreenData, setHomeScreenData] = useState({
        vData: [],
        sData: [[], []],
        tData: [],
        iData: {
            infoAESData: 0,
            infoAdditionalData: []
        },
        welcomeName: ''
    })


    function loadHome() {



        AsyncStorage.getItem('user_credentials').then(userCredentials => {

            const name = JSON.parse(userCredentials).user_name.split('.')


            let payLoad = {
                vData: [],
                sData: [],
                tData: [],
                iData: {
                    infoAESData: 0,
                    infoAdditionalData: []
                },
                welcomeName: ''
            }

            VertretungsplanLoad((vData) => {

                payLoad.vData = vData
                payLoad.welcomeName = capitalizeFirstLetter(name[0]) + ' ' + capitalizeFirstLetter(name[1])


                StundenplanLoad((sData) => {

                    payLoad.sData = sData

                    TasksLoad((tData) => {

                        payLoad.tData = tData

                        InfoLoad((iData) => {

                            payLoad.iData = iData

                            setRefreshing(false)
                            setHomeScreenData(payLoad)


                        })


                    })


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
                    <SettingsModal navigation={navigation}>

                    </SettingsModal>

                </View>
            </Modalize>

            <View style={style_DashboardScreen.headerView} >
                <Text numberOfLines={1} style={style_DashboardScreen.headerText}>{homeScreenData.welcomeName}</Text>

                <TouchableOpacity onPress={onOpen}>
                    <Ionicons name={'settings-outline'} size={25} color={'#a3a3a3'} />

                </TouchableOpacity>

                <Button title='nothing' onPress={() => {
                    let payLoad = {
                        vData: [],
                        sData: [[], []],
                        tData: [],
                        iData: {
                            infoAESData: 0
                        },
                        welcomeName: ''
                    }



                    setHomeScreenData(payLoad)


                }}>

                </Button>

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






                <HomeInfoAdditionalContainer data={homeScreenData.iData.infoAdditionalData} />

                <HomeContainer infoAESData={homeScreenData.iData.infoAESData} label='InfoAES' onPress={() => navigation.navigate('HomeScreenInfoAES')} />
                <HomeContainer vertretungData={homeScreenData.vData} label='Vertretung' onPress={() => navigation.navigate('HomeScreenVertretung')} />
                <HomeContainer stundenplanData={homeScreenData.sData} label='Stundenplan' onPress={() => navigation.navigate('HomeScreenStundenplan')} />
                <HomeContainer tasksData={homeScreenData.tData} label='Tasks' onPress={() => navigation.navigate('HomeScreenTasks')} />



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
        paddingTop: getStatusBarHeight() + 40,
        marginHorizontal: 20,
        //marginTop: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#dbdbdb',
        paddingBottom: 8

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
        paddingTop: 30,
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