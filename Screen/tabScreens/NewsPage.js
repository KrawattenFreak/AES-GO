import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import NewsScreen from './NewsPageScreens/NewsScreen';
import NewsScreenPage from './NewsPageScreens/NewsScreenPage';


const Stack = createStackNavigator();

export default function NewsPage({ navigation }) {
    return (

        <Stack.Navigator initialRouteName="NewsScreen" screenOptions={{ headerShown: true }}>
            <Stack.Screen name="NewsScreen" component={NewsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NewsScreenPage" component={NewsScreenPage} options={{ title: 'Neuigkeit' }} />
        </Stack.Navigator>

    );
}