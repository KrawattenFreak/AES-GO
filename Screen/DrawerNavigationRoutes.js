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


export default function DrawerNavigationRoutes() {

    return (

        <View style={{ marginTop: 200 }}>
            <Button
                onPress={() => AsyncStorage.removeItem('user_name')}
                title="Remove user_name"

            />
        </View>

    );


}