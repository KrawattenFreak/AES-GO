import { StyleSheet, View, Modal, ActivityIndicator, Text, Image, TouchableOpacity, TouchableWithoutFeedback, SectionList, FlatList, Animated, Vibration } from 'react-native';
import React, { useState, useEffect, useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import Loader from '../Components/Loader';
import EventContainer from './EventsPageScreens/EventContainer';
import { Modalize } from 'react-native-modalize';
import EventModal from './EventsPageScreens/EventModal';



export default function EventsPage({ navigation }) {

    const [filter, setFilter] = useState(JSON.stringify({
        4: true,
        11: true,
        9: true,
        7: true,
        3: true,
        1: true,
        14: true,
        16: true,
        8: true,
    }))


    const animated = useRef(new Animated.Value(0)).current;

    const modalizeRef = useRef(null);

    const [kalender, setKalender] = useState('')

    const [loading, setLoading] = useState(true)


    let listEvents = [];

    const onOpen = () => {
        modalizeRef.current?.open();
    };


    useEffect(() => {


        AsyncStorage.getItem('kalender').then(value => {


            JSON.parse(value).forEach(event => {

                const eventStartDate = new Date(String(event.Anfang).slice(0, 10))
                const eventEndDate = new Date(String(event.Ende).slice(0, 10))


                if (isDateInFuture(eventStartDate)) {

                    const copyEventStartDate = eventStartDate

                    let soon = true
                    if (isDateInFuture(copyEventStartDate.setDate(copyEventStartDate.getDate() - 7))) {
                        soon = false
                    }

                    listEvents.push({
                        summary: event.title,
                        dtstart: {
                            day: String(event.Anfang).slice(8, 10),
                            month: String(event.Anfang).slice(5, 7),
                            year: String(event.Anfang).slice(0, 4)
                        },
                        dtend: {
                            day: String(event.Ende).slice(8, 10),
                            month: String(event.Ende).slice(5, 7),
                            year: String(event.Ende).slice(0, 4)
                        },
                        id: generateUUID(),
                        soon: soon,
                        isDate: event.allDay,
                        description: event.description,
                        location: event.Ort,
                        tStart: String(event.Anfang).slice(11, 16),
                        tEnd: String(event.End).slice(11, 16),
                        category: event.category
                    })

                }

            })


            setKalender(listEvents)
            setLoading(false)

        })


    }, [])


    let filterKalender = []

    if (loading == false) {
        if (kalender != []) {
            kalender.forEach(element => {
                if (JSON.parse(filter)[element.category])
                    filterKalender.push(element)
            })
        }

    }

    let noEvents = false


    if (JSON.stringify(filterKalender) == "[]") {
        noEvents = true
    }



    function isDateInFuture(date) {
        return date > Date.now()
    }


    const [scrollViewWidth, setScrollViewWidth] = React.useState(0);
    const boxWidth = 310;
    const boxDistance = scrollViewWidth - boxWidth;
    const halfBoxDistance = boxDistance / 2;
    const pan = React.useRef(new Animated.ValueXY()).current;

    return (

        <View style={{ flex: 1, }}>



            <Modalize ref={modalizeRef} panGestureAnimatedValue={animated} adjustToContentHeight style={style.modalize}>
                <View style={style.wrapperModal}>
                    <EventModal filter={filter} setFilter={setFilter}>

                    </EventModal>

                </View>
            </Modalize>

            <Loader loading={loading} />



            {loading ? <View></View> :

                <View style={style.wrapper}>
                    <View style={style.dropDownView}>
                        <TouchableOpacity onPress={onOpen}>
                            <View style={style.iconView}>
                                <Ionicons name={'filter'} size={20} color={'#575757'} />
                            </View>
                        </TouchableOpacity>

                    </View>

                    {
                        noEvents ?
                            <View style={style.noEventsView}>
                                <Ionicons name={"eye-off"} size={20} color={'#383838'}></Ionicons>
                                <Text style={style.noEventsText}>
                                    KEINE VEFÜGBAREN EVENTS
                                </Text>
                                <Text style={style.noEventsDescription}>
                                    Überprüfe deine Filtereinstellungen
                                </Text>
                            </View> :
                            <View></View>

                    }


                    <FlatList


                        horizontal={true}

                        data={filterKalender}
                        contentInsetAdjustmentBehavior="never"
                        snapToAlignment="center"
                        decelerationRate="fast"
                        showsHorizontalScrollIndicator={false}
                        automaticallyAdjustContentInsets={false}
                        scrollEventThrottle={1}
                        renderItem={({ item, index }) => {

                            return (

                                //<Animated.View style={{
                                //    transform: [
                                //        {
                                //            scale: pan.x.interpolate({
                                //                inputRange: [
                                //                    (index - 1) * boxWidth - halfBoxDistance,
                                //                    index * boxWidth - halfBoxDistance,
                                //                    (index + 1) * boxWidth - halfBoxDistance, // adjust positioning
                                //                ],
                                //                outputRange: [0.8, 1, 0.8], // scale down when out of scope
                                //                extrapolate: 'clamp',
                                //            }),
                                //        },
                                //    ],
                                //}}>

                                <EventContainer
                                    title={item.summary}
                                    dtstart={addLeadingZeros(item.dtstart.day, 2) + '. ' + addLeadingZeros(item.dtstart.month, 2) + '. ' + item.dtstart.year}
                                    dtend={addLeadingZeros(item.dtend.day, 2) + '. ' + addLeadingZeros(item.dtend.month, 2) + '. ' + item.dtend.year}
                                    soon={item.soon}
                                    isDate={item.isDate}
                                    time={

                                        (item.tEnd != '') ?
                                            item.tStart + ' - ' + item.tEnd :
                                            item.tStart

                                    }
                                    dtstartyear={item.dtstart.year}
                                    description={item.description}
                                    location={item.location}
                                    category={item.category}
                                />
                                //</Animated.View>
                            )

                        }}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: pan.x } } }],
                            {
                                useNativeDriver: false,
                            },
                        )}
                        contentOffset={{ x: halfBoxDistance * -1, y: 0 }}
                        onLayout={(e) => {
                            setScrollViewWidth(e.nativeEvent.layout.width);
                        }}
                        contentInset={{
                            left: halfBoxDistance,
                            right: halfBoxDistance,
                        }}


                        //OPTIMIZATION
                        initialNumToRender={5}
                        snapToInterval={boxWidth}
                        maxToRenderPerBatch={10}

                    />
                </View>


            }


            <StatusBar style="dark" />
        </View >

    )


}





const style = StyleSheet.create({
    wrapper: {
        flex: 1
    },


    layout: {
        flex: 1,
    },

    sectionList: {


    },
    sectionListContainerStyle: {

    },
    dropDownView: {
        marginTop: 50,
        width: '100%',
        alignItems: 'flex-end'
    },


    modalize: {
        //marginTop: 50
    },

    //--------------------------------------------------------------

    wrapperModal: {
        justifyContent: 'center',
        marginVertical: 20,
        paddingHorizontal: 30,
        paddingTop: 10
    },
    iconView: {
        padding: 10,
        marginRight: 20,
        backgroundColor: 'white',
        borderRadius: 13,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
    },
    noEventsView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noEventsText: {
        fontWeight: '300',
        fontSize: 17,
        marginTop: 10,
        color: '#383838'

    },
    noEventsDescription: {
        marginTop: 20,
        color: '#383838',
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
function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}