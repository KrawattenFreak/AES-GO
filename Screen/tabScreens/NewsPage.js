import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';


import NewsScreen from './NewsPageScreens/NewsScreen';
import NewsScreenPage from './NewsPageScreens/NewsScreenPage';

import HintNews from '../Components/Hints/HintNews';

const Stack = createStackNavigator();

export default function NewsPage({ navigation }) {
    const [visibleHint, setVisibleHint] = useState(true)

    return (


        <View style={{ flex: 1 }}>
            <HintNews visible={visibleHint} onPress={() => {

                setVisibleHint(false)

            }} />

            <Stack.Navigator initialRouteName="NewsScreen" screenOptions={{ headerShown: true, headerBackTitle: 'Zurück' }}>
                <Stack.Screen name="NewsScreen" component={NewsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="NewsScreenPage" component={NewsScreenPage} options={{ title: 'Neuigkeit' }} />
            </Stack.Navigator>
        </View>

    );
}