import {
    ActivityIndicator,
    View,
    StyleSheet,
    Image,
    Text,
    Button,
    TouchableHighlight
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomePage from './tabScreens/HomePage';
import NewsPage from './tabScreens/NewsPage';
//import NewsPage from './tabScreens/NewsPage';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



export default function TabNavigationRoutes() {

    return (


        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home-sharp'
                            : 'home-outline';
                    } else if (route.name === 'News') {

                        iconName = focused ? 'newspaper' : 'newspaper-outline';

                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-list' : 'ios-list-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false
            })}
        >
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="News" component={NewsPage} />
            <Tab.Screen name="Settings" component={HomePage} />

        </Tab.Navigator>



    );


}