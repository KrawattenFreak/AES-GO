import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { TouchableOpacity, Pressable, RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';



export default function VertretungContainer() {


    let dataVertretungVar = []

    const [loading, setLoading] = useState(true)
    const [dataVertretung, setDataVertretung] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('kurse').then((valueKurse) => {
            AsyncStorage.getItem('vertretung').then((valueVertretungsplan) => {

                //console.log(valueKurse)

                const valueVertretungsplanJSON = JSON.parse(valueVertretungsplan)[0]
                const valuevalueKurseJSON = JSON.parse(valueKurse)

                valueVertretungsplanJSON.data.forEach(vertretungEntry => {

                    valuevalueKurseJSON.data.forEach(myKursEntry => {



                        if (vertretungEntry.fach.includes(myKursEntry)) {
                            //console.log(vertretungEntry.art)

                            if (vertretungEntry.hinweis == 'Entfall' || vertretungEntry.art == 'kein Präs.Unt.' || vertretungEntry.art == 'Selbststudium') {
                                dataVertretungVar.push({ fach: myKursEntry, type: 'entfall', stunde: vertretungEntry.stunde, lehrkraft: vertretungEntry.lehrkraft })
                            } else if (vertretungEntry.art == 'Raum') {
                                dataVertretungVar.push({ fach: myKursEntry, type: 'raum', stunde: vertretungEntry.stunde, lehrkraft: vertretungEntry.lehrkraft, raum: vertretungEntry.raum, raum_alt: vertretungEntry.raum_alt })
                            } else if (vertretungEntry.art == 'Klausur') {
                                dataVertretungVar.push({ fach: myKursEntry, type: 'klausur', stunde: vertretungEntry.stunde, raum: vertretungEntry.raum })
                            } else {
                                dataVertretungVar.push({ fach: myKursEntry, type: '-', art: vertretungEntry.art, stunde: vertretungEntry.stunde, lehrkraft: vertretungEntry.lehrkraft, raum: vertretungEntry.raum })
                            }
                        }

                    });
                });

                //console.log(dataVertretung)
                setDataVertretung(dataVertretungVar)
                setLoading(false)

            })



        })
    }, []);


    return (

        <View style={style.contentView_content}>
            <View style={style.vertretungHeaderView}>

                <Ionicons name={'reader-outline'} size={20} color={'grey'} />
                <Text style={style.vertretungHeaderText}>
                    PERSÖNLICHER VERTRETUNGSPLAN
                </Text>


            </View>

            {
                (dataVertretung.length != 0) ?


                    <View style={style.myVertretungView}>

                        {
                            dataVertretung.map((data) => {

                                return (
                                    (data.type == 'entfall') ?
                                        <View style={style.VertretungEntryENTFALLView} key={generateUUID()}>
                                            <Text style={style.VertretungEntryTextStunde}>
                                                {data.stunde}
                                            </Text>

                                            <View style={style.VertretungEntryViewMiddle}>
                                                <Text style={style.VertretungEntryTextFett}>
                                                    {data.fach}
                                                </Text>
                                                <Text style={style.VertretungEntryTextLight}> bei </Text>
                                                <Text style={style.VertretungEntryTextFett}>
                                                    {data.lehrkraft}
                                                </Text>
                                            </View>
                                            <Ionicons name={'close-circle'} size={20} color={'white'} />
                                        </View> :


                                        (data.type == 'raum') ?
                                            <View style={style.VertretungEntryRAUMView} key={generateUUID()}>
                                                <Text style={style.VertretungEntryTextStunde}>
                                                    {data.stunde}
                                                </Text>
                                                <View style={style.VertretungEntryViewMiddle}>

                                                    <Text style={style.VertretungEntryTextFett}>
                                                        {data.fach}
                                                    </Text>
                                                    <Text style={style.VertretungEntryTextLight}> in </Text>
                                                    <Text style={style.VertretungEntryTextFett}>
                                                        {data.raum}
                                                    </Text>
                                                    <Text style={style.VertretungEntryTextLight}> bei </Text>
                                                    <Text style={style.VertretungEntryTextFett}>
                                                        {data.lehrkraft}
                                                    </Text>

                                                </View>
                                                <Ionicons name={'caret-up'} size={20} color={'white'} />
                                            </View> :

                                            (data.type == 'klausur') ?


                                                <View style={style.VertretungEntryKLAUSURView} key={generateUUID()}>
                                                    <Text style={style.VertretungEntryTextStunde}>
                                                        {data.stunde}
                                                    </Text>
                                                    <View style={style.VertretungEntryViewMiddle}>

                                                        <Text style={style.VertretungEntryTextLight}>
                                                            Klausur { }
                                                        </Text>
                                                        <Text style={style.VertretungEntryTextFett}>
                                                            {data.fach} { }
                                                        </Text>
                                                        <Text style={style.VertretungEntryTextLight}>
                                                            in { }
                                                        </Text>

                                                        <Text style={style.VertretungEntryTextFett}>
                                                            {data.raum} { }
                                                        </Text>

                                                    </View>
                                                    <Ionicons name={'document'} size={20} color={'white'} />
                                                </View> :

                                                <View style={style.VertretungEntrySONSTIGEView} key={generateUUID()}>
                                                    <Text style={style.VertretungEntryTextStunde}>
                                                        {data.stunde}
                                                    </Text>
                                                    <View style={style.VertretungEntryViewMiddle}>

                                                        <Text style={style.VertretungEntryTextFett}>
                                                            {data.art} { }
                                                        </Text>
                                                        <Text style={style.VertretungEntryTextFett}>
                                                            {data.fach} { }
                                                        </Text>
                                                        <Text style={style.VertretungEntryTextLight}>
                                                            bei { }
                                                        </Text>
                                                        <Text style={style.VertretungEntryTextFett}>
                                                            {data.lehrkraft} { }
                                                        </Text>
                                                        <Text style={style.VertretungEntryTextFett}>
                                                            {data.raum} { }
                                                        </Text>

                                                    </View>
                                                    <Ionicons name={'cloud-circle'} size={20} color={'white'} />
                                                </View>
                                )


                            })
                        }


                    </View> :
                    <View style={style.myVertretungNoEntriesView}>
                        <Ionicons name={'eye-off-outline'} size={20} color={'grey'} />
                        <Text style={style.myVertretungNoEntriesText}>Heute sind keine Einträge für eine deiner Kurse vorhanden.</Text>
                    </View>
            }

            <View style={style.myVertretungTapView}>
                <Text style={style.myVertretungTapText}>Tippe für den vollen Vertretungsplan</Text>
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
    myVertretungView: {
        width: '100%',
    },
    vertretungHeaderView: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    vertretungHeaderText: {
        fontSize: 15,
        fontWeight: '200',
        color: 'black',
        marginLeft: 10
    },

    VertretungEntryENTFALLView: {
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 6,

        flexDirection: 'row',
        justifyContent: 'space-between',


        //SHADOW
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,

        elevation: 4,
        marginBottom: 5
    },



    VertretungEntryRAUMView: {
        alignItems: 'center',
        backgroundColor: 'orange',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 6,

        flexDirection: 'row',
        justifyContent: 'space-between',


        //SHADOW
        shadowColor: "orange",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,

        elevation: 4,
        marginBottom: 5
    },

    VertretungEntrySONSTIGEView: {
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 6,

        flexDirection: 'row',
        justifyContent: 'space-between',


        //SHADOW
        shadowColor: "green",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,

        elevation: 4,
        marginBottom: 5
    },
    VertretungEntryKLAUSURView: {
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 6,

        flexDirection: 'row',
        justifyContent: 'space-between',


        //SHADOW
        shadowColor: "grey",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,

        elevation: 4,
        marginBottom: 5
    },

    VertretungEntryViewMiddle: {
        flexDirection: 'row',
        alignItems: 'center'
    },


    VertretungEntryTextStunde: {
        color: 'white',
        fontWeight: '300',
        fontSize: 17
    },
    VertretungEntryTextLight: {
        color: 'white',
        fontWeight: '300',
        fontSize: 12
    },
    VertretungEntryTextFett: {
        color: 'white',
        fontWeight: '800',
        fontSize: 17
    },



    myVertretungTapView: {
        alignItems: 'center',
        marginTop: 15
    },
    myVertretungTapText: {
        color: 'grey',
        fontSize: 10
    },


    myVertretungNoEntriesView: {
        marginVertical: 10,
        alignItems: 'center',
        backgroundColor: '#ffeeb8',
        borderColor: '#fccd3f',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    myVertretungNoEntriesText: {
        color: 'grey',
        marginTop: 5,
        fontWeight: '300'
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