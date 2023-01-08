import * as React from 'react';
import { RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';


export default function VertretungDataHeader({ date }) {

    return (
        <View style={style_VertretungDataHeader.viewWrapper}>
            <View style={style_VertretungDataHeader.wrapper}>

                <Text style={style_VertretungDataHeader.title}>
                    {date}
                </Text>

            </View>

        </View>
    )

}

const style_VertretungDataHeader = StyleSheet.create({

    wrapper: {
        //width: 100,
        paddingHorizontal: 30,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#313131',
        borderRadius: 6,
        alignItems: 'center',

        //SHADOW
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4

    },

    viewWrapper: {
        alignItems: 'center'
    },

    title: {
        textAlign: 'center',
        color: 'white'
    }


})