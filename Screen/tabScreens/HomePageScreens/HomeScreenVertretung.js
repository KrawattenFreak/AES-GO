import * as React from 'react';
import { RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';


export default function HomeScreenVertretung({ navigation }) {
    return (
        <View style={style_dashboardScreenVertretung.placeholderView}>
            <Text>Incoming</Text>

        </View>

    );


}


const style_dashboardScreenVertretung = new StyleSheet.create({
    placeholderView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})