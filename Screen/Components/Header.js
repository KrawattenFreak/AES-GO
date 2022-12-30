import * as React from 'react';
import { TouchableOpacity, Pressable, RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';


export default function Header({ label }) {
    return (

        <View style={style_header.header}>
            <Text style={style_header.label}>
                {label}
            </Text>
        </View>

    )

}

const style_header = StyleSheet.create({
    header: {
        marginTop: 80,
        height: 40,
        width: '100%',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 0

    },
    label: {
        marginHorizontal: 20,
        fontSize: 30,
        fontWeight: "bold",
        color: 'rgb(1, 1, 1)'
    }
})