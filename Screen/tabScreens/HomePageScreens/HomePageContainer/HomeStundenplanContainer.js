import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { TouchableOpacity, Pressable, RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons'

import StundenplanLoad from '../../../../code/SPH_Loading/StundenplanLoad';




export default function StundenplanContainer({ stundenplanData }) {


    const todayKurse = stundenplanData[1]
    const aktuelleWoche = stundenplanData[0]

    //const [todayKurse, setTodayKurse] = useState([])
    //const [aktuelleWoche, setAktuelleWoche] = useState([])



    return (
        <View style={style.contentView_content}>
            <View style={style.stundenplanHeaderView}>

                <Ionicons name={'albums'} size={20} color={'grey'} />
                <Text style={style.stundenplanHeaderText}>
                    PERSÖNLICHER STUNDENPLAN
                </Text>

            </View>


            {

                todayKurse.length != 0 ?

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
                                                                <></>
                                                        }
                                                    </View>
                                                )

                                            })

                                        }

                                    </View>

                                )

                            })

                        }


                    </View> :

                    <View style={style.myStundenplanNoEntriesView}>
                        <MaterialIcons name="auto-awesome" size={20} color="orange" />
                        <Text style={style.myStundenplanNoEntriesText}>WOCHENENDE</Text>
                    </View>

            }

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
        borderWidth: 0,

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
        paddingVertical: 20,

    },
    contentView_contentText: {
        fontSize: 15,
        color: 'grey',

    },



    stundenplanHeaderView: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    stundenplanHeaderText: {
        fontSize: 15,
        fontWeight: '800',
        color: 'grey',
        marginLeft: 10,

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
        color: '#42a4f5',
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
    },



    myStundenplanNoEntriesView: {
        marginVertical: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#dadae8',
        borderWidth: 0,
        borderRadius: 10,
        padding: 20,

        //SHADOW
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.05,
        shadowRadius: 15,

        elevation: 4,
    },
    myStundenplanNoEntriesText: {
        color: 'black',
        marginTop: 5,
        fontWeight: '700',
        fontSize: 10,
        color: 'grey'
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