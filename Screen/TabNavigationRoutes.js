import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomePage from './tabScreens/HomePage';
import NewsPage from './tabScreens/NewsPage';
import SettingsPage from './tabScreens/SettingsPage';
import EventsPage from './tabScreens/EventsPage';
import TasksPage from './tabScreens/Tasks';


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

                    } else if (route.name === 'MySchool') {
                        iconName = focused ? 'library' : 'library-outline';

                    } else if (route.name === '3D') {
                        iconName = focused ? 'cube' : 'cube-outline';

                    } else if (route.name === 'Events') {
                        iconName = focused ? 'receipt' : 'receipt-outline';

                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false
            })}
        >
            <Tab.Screen name="MySchool" component={HomePage} />
            <Tab.Screen name="News" component={NewsPage} />
            <Tab.Screen name="3D" component={TasksPage} />
            <Tab.Screen name="Events" component={EventsPage} />
            <Tab.Screen name="Settings" component={SettingsPage} />

        </Tab.Navigator>



    );


}