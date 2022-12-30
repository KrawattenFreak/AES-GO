import * as React from 'react';
import { RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';


export default function HomeScreenStundenplan({ navigation }) {
    return (
        <View style={style_dashboardScreenStundenplan.placeholderView}>
            <Text>Incoming</Text>
        </View>

    );


}


const style_dashboardScreenStundenplan = new StyleSheet.create({
    placeholderView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})