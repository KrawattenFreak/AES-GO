import { StyleSheet, View, Modal, ActivityIndicator, Text, Image, TouchableOpacity, TouchableWithoutFeedback, SectionList, FlatList, Animated, Vibration } from 'react-native';
import React, { useState, useEffect, useRef } from 'react'


export default function SettingsModal() {



    return (
        <View style={style.modalWrapper}>

            <Text>Einstellungen</Text>

        </View>
    )

}



const style = StyleSheet.create({
    modalWrapper: {
        height: 500,
        justifyContent: 'center',
        alignItems: 'center'
    }

})