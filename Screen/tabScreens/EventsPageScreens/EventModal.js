import { StyleSheet, View, Modal, ActivityIndicator, Text, Image, TouchableOpacity, TouchableWithoutFeedback, SectionList, FlatList, Animated, Vibration, Button } from 'react-native';
import React, { useState, useEffect, useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';




export default function EventModal({ setFilter, filter }) {




    const arrCategory = [
        {
            categoryTitle: 'Events',
            categoryNumber: 4,
            categoryIconName: 'earth'
        },
        {
            categoryTitle: 'Klausur',
            categoryNumber: 11,
            categoryIconName: 'document'
        },
        {
            categoryTitle: 'Schulwoche',
            categoryNumber: 9,
            categoryIconName: 'caret-down-circle'
        },
        {
            categoryTitle: 'Ferien',
            categoryNumber: 7,
            categoryIconName: 'airplane'
        },
        {
            categoryTitle: 'Lehren und Lernen',
            categoryNumber: 3,
            categoryIconName: 'school'
        },
        {
            categoryTitle: 'Konferenz',
            categoryNumber: 1,
            categoryIconName: 'chatbubbles'
        },
        {
            categoryTitle: 'Abitur',
            categoryNumber: 14,
            categoryIconName: 'glasses'
        },
        {
            categoryTitle: 'Elterngespräch',
            categoryNumber: 16,
            categoryIconName: 'chatbox-ellipses'
        },
        {
            categoryTitle: 'Fortbildung',
            categoryNumber: 8,
            categoryIconName: 'library'
        },
    ]

    return (
        <>
            <View style={style.headerView} key={generateUUID()}>

                <Text style={style.headerText}>Filter</Text>

            </View>

            <View style={style.modalView} key={generateUUID()}>
                {
                    arrCategory.map((element, index) => {
                        return (
                            <TouchableOpacity key={generateUUID()} style={style.wrapperModalTouchable} onPress={() => {

                                let showCategories = JSON.parse(filter)
                                showCategories[element.categoryNumber] = !JSON.parse(filter)[element.categoryNumber]
                                setFilter(JSON.stringify(showCategories))

                            }}>
                                <View style={style.wrapperModalView} key={generateUUID()}>

                                    {
                                        JSON.parse(filter)[element.categoryNumber] ?
                                            <Ionicons name={'square'} size={20} color={'#575757'} /> :
                                            <Ionicons name={'square-outline'} size={20} color={'#575757'} />

                                    }
                                    <Text key={generateUUID()} style={style.wrapperModalText}>{String(element.categoryTitle).toUpperCase()}</Text>
                                </View>
                                <View style={style.wrapperModalViewIcon}>
                                    <Ionicons name={element.categoryIconName} size={20} color={'#575757'} />

                                </View>

                            </TouchableOpacity>
                        )
                    })

                }
            </View>
            <View style={style.filterButtonsView}>
                <TouchableOpacity style={style.filterButtonsTouchable} onPress={() => {
                    setFilter(JSON.stringify(
                        {
                            4: true,
                            11: true,
                            9: true,
                            7: true,
                            3: true,
                            1: true,
                            14: true,
                            16: true,
                            8: true,
                        }
                    ))

                }

                }>
                    <Text style={style.filterButtonsText}>ALLES</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.filterButtonsTouchable} onPress={() => {
                    setFilter(JSON.stringify(
                        {
                            4: false,
                            11: false,
                            9: false,
                            7: false,
                            3: false,
                            1: false,
                            14: false,
                            16: false,
                            8: false,
                        }
                    ))

                }

                }>
                    <Text style={style.filterButtonsText}>NICHTS</Text>
                </TouchableOpacity>

            </View>
        </>
    )
}


const style = StyleSheet.create({



    checkbox: {
        margin: 8,
        padding: 10
    },



    wrapperModalView: {
        flexDirection: 'row',
        alignItems: 'center',
        //paddingVertical: 10,


    },

    modalView: {
        marginBottom: 20,

    },

    headerView: {
        marginBottom: 10

    },

    headerText: {
        fontSize: 30,
        fontWeight: '700',
    },
    wrapperModalText: {
        fontSize: 14,
        fontWeight: '300',
        marginLeft: 15
    },
    wrapperModalTouchable: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f7f7f7',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ededed'
    },
    wrapperModalViewIcon: {

    },


    filterButtonsView: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    filterButtonsTouchable: {
        backgroundColor: 'tomato',
        padding: 10,
        borderRadius: 5
    },
    filterButtonsText: {
        color: 'white',
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