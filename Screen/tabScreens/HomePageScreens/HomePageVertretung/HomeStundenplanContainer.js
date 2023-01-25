import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { TouchableOpacity, Pressable, RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';






export default function StundenplanContainer() {

    let weekdays = new Array(7)
    weekdays[0] = "sonntag";
    weekdays[1] = "montag";
    weekdays[2] = "dienstag";
    weekdays[3] = "mittwoch";
    weekdays[4] = "donnerstag";
    weekdays[5] = "freitag";
    weekdays[6] = "saturday";

    const [todayKurse, setTodayKurse] = useState([])
    const [aktuelleWoche, setAktuelleWoche] = useState([])



    useEffect(() => {

        AsyncStorage.getItem('stundenplan').then((value) => {


            AsyncStorage.getItem('aktuelleWoche').then((value2) => {

                let todayKursePre = []
                setAktuelleWoche(value2)

                const date = new Date()

                const valueStundenplan = JSON.parse(value)
                //const currentDay = Object.entries(valueStundenplan.own[weekdays[date.getDay()]])
                const currentDay = Object.entries(valueStundenplan.own['montag'])

                for (const oneKurs of currentDay) {
                    todayKursePre.push(oneKurs)
                }

                setTodayKurse(todayKursePre)

            })

        })

    }, [])



    return (
        <View style={style.contentView_content}>
            <View style={style.stundenplanHeaderView}>

                <Ionicons name={'albums-outline'} size={20} color={'grey'} />
                <Text style={style.stundenplanHeaderText}>
                    PERSÖNLICHER STUNDENPLAN
                </Text>

            </View>

            <View style={style.myStundenplanView}>

                {
                    todayKurse.map((data) => {

                        return (
                            <View key={generateUUID()}>

                                {
                                    data[1].data.map((data2) => {

                                        return (
                                            <View key={generateUUID()}>
                                                {
                                                    (data2.woche == 'all' || data2.woche == aktuelleWoche) ?
                                                        <View style={style.myStundenplanEntry} key={generateUUID()}>

                                                            <Text style={style.myStundenplanEntryTextFach}>
                                                                {data2.fach}
                                                            </Text>

                                                            <Text style={style.myStundenplanEntryTextRaum}>
                                                                {data2.raum}
                                                            </Text>

                                                        </View> :
                                                        <Text></Text>
                                                }
                                            </View>
                                        )

                                    })

                                }

                            </View>

                        )

                    })

                }


            </View>

            <View style={style.stundenplanTapView}>
                <Text style={style.stundenplanTapText}>Tippe für den vollen Stundenplan</Text>
                <Ionicons name={'caret-down-outline'} size={15} color={'grey'} />
            </View>

        </View>
    )







}

const style = StyleSheet.create({
    contentView_content: {
        alignItems: 'center',
        //justifyContent: 'center',
        //CODE:001
        marginHorizontal: 20,
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
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    contentView_contentText: {
        fontSize: 15,
        color: 'grey'

    },



    stundenplanHeaderView: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    stundenplanHeaderText: {
        fontSize: 15,
        fontWeight: '200',
        color: 'black',
        marginLeft: 10
    },

    myStundenplanView: {
        flexDirection: 'row'
    },

    myStundenplanEntry: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginHorizontal: 10,
        borderRadius: 10,
        borderColor: '#dadae8',
        borderWidth: 0.3,



    },
    myStundenplanEntryTextFach: {
        textAlign: 'center',
        fontWeight: '800',
        color: 'tomato',
        fontSize: 16
    },
    myStundenplanEntryTextRaum: {
        textAlign: 'center',
        fontWeight: '300',
        color: 'grey',
        fontSize: 10
    },


    stundenplanTapView: {
        alignItems: 'center',
        marginTop: 15
    },
    stundenplanTapText: {
        color: 'grey',
        fontSize: 10
    }

})


function generateUUID() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx-xxxxxx3xx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}