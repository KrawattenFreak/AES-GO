import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeContainer from './HomePageScreens/HomeScreenContainer';
import HomeScreenStundenplan from './HomePageScreens/HomeScreenStundenplan';
import HomeScreenVertretung from './HomePageScreens/HomeScreenVertretung';



import { RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';


const Stack = createStackNavigator();

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}



export default function HomePage({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: true, headerBackTitle: 'Zurück' }}>
            <Stack.Screen label='Home' name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreenVertretung" component={HomeScreenVertretung} options={{ title: 'Vertretungsplan' }} />
            <Stack.Screen name="HomeScreenStundenplan" component={HomeScreenStundenplan} options={{ title: 'Stundenplan' }} />
        </Stack.Navigator>

    );
}


function HomeScreen({ navigation }) {

    const [refreshing, setRefreshing] = React.useState(false);
    const [welcomeName, setWelcomeName] = React.useState('')

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    AsyncStorage.getItem('user_name').then((value) => {
        const name = value.split('.')
        setWelcomeName(capitalizeFirstLetter(name[0]) + ' ' + capitalizeFirstLetter(name[1]))
    })

    return (
        <View style={style_DashboardScreen.wrapper}>
            <View style={style_DashboardScreen.headerView} >
                <Text style={style_DashboardScreen.headerText}>{welcomeName}'s Profil</Text>
            </View>
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            } contentContainerStyle={style_DashboardScreen.contentView}>

                <HomeContainer label='Vertretung' onPress={() => navigation.navigate('HomeScreenVertretung')} />
                <HomeContainer label='Stundenplan' onPress={() => navigation.navigate('HomeScreenStundenplan')} />
                <View style={{ marginTop: 20 }}>
                    <Button
                        onPress={() => AsyncStorage.removeItem('user_name')}
                        title="Remove user_name"
                    />
                </View>

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
        marginTop: 80

    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: 'rgb(1, 1, 1)'
    },
    contentView: {
        width: '100%',
        alignItems: "center",
        marginTop: 30,
        //backgroundColor: 'red'

    },


})




//MY FUNCTIONS

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}