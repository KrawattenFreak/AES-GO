import * as React from 'react';
import { RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';


export default function VertretungDataHeader({ date }) {

    return (
        <View style={style_VertretungDataHeader.wrapper}>

            <Text style={style_VertretungDataHeader.title}>
                {date}
            </Text>

        </View>


    )

}

const style_VertretungDataHeader = StyleSheet.create({

    wrapper: {
        marginHorizontal: 140,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#313131',
        borderRadius: 6,

        //SHADOW
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4

    },
    title: {
        textAlign: 'center',
        color: 'white'
    }


})