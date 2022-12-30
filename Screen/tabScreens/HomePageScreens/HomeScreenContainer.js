import * as React from 'react';
import { TouchableOpacity, Pressable, RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function HomeContainer({ navigation, label, onPress }) {


    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <View style={style.contentView_content}>
                    <Text style={style.contentView_contentText}>{label}</Text>


                </View>
            </TouchableOpacity>
        </View>
    );

}

const style = StyleSheet.create({
    contentView_content: {
        alignItems: 'center',
        justifyContent: 'center',
        //CODE:001
        width: 400,
        height: 200,
        backgroundColor: 'rgb(250, 250, 250)',
        borderRadius: 10,
        borderColor: '#dadae8',
        borderWidth: 0.5,

        //SHADOW
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.05,
        shadowRadius: 5,

        elevation: 4,

        marginBottom: 20,
    },
    contentView_contentText: {
        fontSize: 15,
        color: 'grey'

    }

})