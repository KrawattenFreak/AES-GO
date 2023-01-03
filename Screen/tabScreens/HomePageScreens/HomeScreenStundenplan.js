import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler'


import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Loader from '../../Components/Loader';


export default function HomeScreenStundenplan({ navigation }) {

    const [loading, setLoading] = useState(true)
    const [stundenplanData, setStundenplanData] = useState({})
    const [state, setState] = useState(0)

    //const faecher2 = { "own": { "montag": { "1": { "data": [{ "fach": "P1", "raum": "B501", "lehrkraft": "EVE", "woche": "all" }], "stunden": "2" }, "3": { "data": [{ "fach": "et5", "raum": "B501", "lehrkraft": "STE", "woche": "all" }], "stunden": "2" }, "8": { "data": [{ "fach": "e5", "raum": "A106", "lehrkraft": "MRK", "woche": "WA" }], "stunden": "2" }, "10": { "data": [{ "fach": "pw5", "raum": "A102", "lehrkraft": "DEB", "woche": "WA" }, { "fach": "M1", "raum": "B504", "lehrkraft": "HIE", "woche": "WB" }], "stunden": "2" } }, "dienstag": { "1": { "data": [{ "fach": "d6", "raum": "A106", "lehrkraft": "KLE", "woche": "all" }], "stunden": "2" }, "3": { "data": [{ "fach": "M1", "raum": "A209", "lehrkraft": "HIE", "woche": "all" }], "stunden": "2" } }, "mittwoch": { "1": { "data": [{ "fach": "d6", "raum": "A109", "lehrkraft": "KLE", "woche": "all" }], "stunden": "2" }, "3": { "data": [{ "fach": "e5", "raum": "A204", "lehrkraft": "MRK", "woche": "all" }], "stunden": "2" }, "8": { "data": [{ "fach": "mu5", "raum": "A204", "lehrkraft": "BRN", "woche": "all" }], "stunden": "2" }, "10": { "data": [{ "fach": "P1", "raum": "B503", "lehrkraft": "EVE", "woche": "WB" }], "stunden": "2" } }, "donnerstag": { "1": { "data": [{ "fach": "M1", "raum": "A111", "lehrkraft": "HIE", "woche": "all" }], "stunden": "2" }, "3": { "data": [{ "fach": "P1", "raum": "B503", "lehrkraft": "EVE", "woche": "all" }], "stunden": "2" }, "5": { "data": [{ "fach": "pw5", "raum": "A110", "lehrkraft": "DEB", "woche": "all" }], "stunden": "2" }, "8": { "data": [{ "fach": "et5", "raum": "A103", "lehrkraft": "STE", "woche": "WA" }, { "fach": "g5", "raum": "A103", "lehrkraft": "ENG", "woche": "WB" }], "stunden": "2" } }, "freitag": { "3": { "data": [{ "fach": "i5", "raum": "B403", "lehrkraft": "HMS", "woche": "all" }], "stunden": "2" }, "5": { "data": [{ "fach": "g5", "raum": "A111", "lehrkraft": "ENG", "woche": "all" }], "stunden": "2" }, "8": { "data": [{ "fach": "s6", "raum": "T4", "lehrkraft": "BLD", "woche": "all" }], "stunden": "2" } }, "dategueltig": "28 11 2022" }, "all": { "montag": { "1": { "data": [{ "fach": "pw7", "raum": "A109", "lehrkraft": "KSI", "woche": "all" }, { "fach": "P1", "raum": "B501", "lehrkraft": "EVE", "woche": "all" }, { "fach": "p5", "raum": "B503", "lehrkraft": "BAU", "woche": "all" }], "stunden": "2" }, "3": { "data": [{ "fach": "et6", "raum": "A110", "lehrkraft": "SAB", "woche": "all" }, { "fach": "ev5", "raum": "A111", "lehrkraft": "FOE", "woche": "all" }, { "fach": "ka5", "raum": "B102", "lehrkraft": "KAS", "woche": "all" }, { "fach": "et5", "raum": "B501", "lehrkraft": "STE", "woche": "all" }], "stunden": "2" }, "5": { "data": [{ "fach": "gb5", "raum": "A101", "lehrkraft": "RAV", "woche": "all" }, { "fach": "e6", "raum": "A111", "lehrkraft": "GRM", "woche": "WB" }, { "fach": "g6", "raum": "A204", "lehrkraft": "SAE", "woche": "all" }], "stunden": "2" }, "8": { "data": [{ "fach": "E1", "raum": "A101", "lehrkraft": "BAR", "woche": "WA" }, { "fach": "pw6", "raum": "A101", "lehrkraft": "GSL", "woche": "WB" }, { "fach": "E2", "raum": "A102", "lehrkraft": "RAV", "woche": "WA" }, { "fach": "e5", "raum": "A106", "lehrkraft": "MRK", "woche": "WA" }, { "fach": "c5", "raum": "B101", "lehrkraft": "KIS", "woche": "WB" }, { "fach": "C1", "raum": "B103", "lehrkraft": "BIB", "woche": "WB" }, { "fach": "P2", "raum": "B503", "lehrkraft": "BAU", "woche": "WB" }], "stunden": "2" }, "10": { "data": [{ "fach": "pw5", "raum": "A102", "lehrkraft": "DEB", "woche": "WA" }, { "fach": "PW1", "raum": "A107", "lehrkraft": "NEU", "woche": "WA" }, { "fach": "M1", "raum": "B504", "lehrkraft": "HIE", "woche": "WB" }], "stunden": "2" } }, "dienstag": { "1": { "data": [{ "fach": "sPA5", "raum": "A102", "lehrkraft": "BRA", "woche": "all" }, { "fach": "f5", "raum": "A103", "lehrkraft": "TIB", "woche": "all" }, { "fach": "d6", "raum": "A106", "lehrkraft": "KLE", "woche": "all" }, { "fach": "l5", "raum": "A107", "lehrkraft": "BTR", "woche": "all" }], "stunden": "2" }, "3": { "data": [{ "fach": "m5", "raum": "A101", "lehrkraft": "THI", "woche": "all" }, { "fach": "M1", "raum": "A209", "lehrkraft": "HIE", "woche": "all" }, { "fach": "m6", "raum": "B302", "lehrkraft": "WAL", "woche": "all" }], "stunden": "2" }, "5": { "data": [{ "fach": "b5", "raum": "B103", "lehrkraft": "BRS", "woche": "all" }, { "fach": "b6", "raum": "B302", "lehrkraft": "KLE", "woche": "all" }, { "fach": "B1", "raum": "B304", "lehrkraft": "GRP", "woche": "all" }], "stunden": "2" }, "8": { "data": [{ "fach": "d7", "raum": "A110", "lehrkraft": "SUT", "woche": "WB" }], "stunden": "2" } }, "mittwoch": { "1": { "data": [{ "fach": "d5", "raum": "A101", "lehrkraft": "REI", "woche": "all" }, { "fach": "D1", "raum": "A107", "lehrkraft": "HMM", "woche": "WA" }, { "fach": "d6", "raum": "A109", "lehrkraft": "KLE", "woche": "all" }, { "fach": "d7", "raum": "A111", "lehrkraft": "SUT", "woche": "WA" }], "stunden": "2" }, "3": { "data": [{ "fach": "E1", "raum": "A102", "lehrkraft": "BAR", "woche": "all" }, { "fach": "e6", "raum": "A107", "lehrkraft": "GRM", "woche": "all" }, { "fach": "E2", "raum": "A111", "lehrkraft": "RAV", "woche": "all" }, { "fach": "e5", "raum": "A204", "lehrkraft": "MRK", "woche": "all" }], "stunden": "2" }, "5": { "data": [{ "fach": "pw6", "raum": "A101", "lehrkraft": "GSL", "woche": "all" }, { "fach": "c5", "raum": "B101", "lehrkraft": "KIS", "woche": "all" }, { "fach": "C1", "raum": "B103", "lehrkraft": "BIB", "woche": "all" }, { "fach": "P2", "raum": "B503", "lehrkraft": "BAU", "woche": "all" }], "stunden": "2" }, "8": { "data": [{ "fach": "K15", "raum": "", "lehrkraft": "SAEs", "woche": "all" }, { "fach": "ds5", "raum": "A112", "lehrkraft": "KSI", "woche": "all" }, { "fach": "mu5", "raum": "A204", "lehrkraft": "BRN", "woche": "all" }, { "fach": "k6", "raum": "A206", "lehrkraft": "FLE", "woche": "all" }, { "fach": "K1", "raum": "B201", "lehrkraft": "SAE", "woche": "all" }], "stunden": "2" }, "10": { "data": [{ "fach": "pw7", "raum": "A101", "lehrkraft": "KSI", "woche": "WB" }, { "fach": "B1", "raum": "B301", "lehrkraft": "GRP", "woche": "WA" }, { "fach": "b6", "raum": "B302", "lehrkraft": "KLE", "woche": "WA" }, { "fach": "p5", "raum": "B501", "lehrkraft": "BAU", "woche": "WB" }, { "fach": "P1", "raum": "B503", "lehrkraft": "EVE", "woche": "WB" }], "stunden": "2" } }, "donnerstag": { "1": { "data": [{ "fach": "m6", "raum": "A101", "lehrkraft": "WAL", "woche": "all" }, { "fach": "m5", "raum": "A105", "lehrkraft": "THI", "woche": "all" }, { "fach": "M1", "raum": "A111", "lehrkraft": "HIE", "woche": "all" }], "stunden": "2" }, "3": { "data": [{ "fach": "D1", "raum": "A107", "lehrkraft": "HMM", "woche": "all" }, { "fach": "E1", "raum": "A205", "lehrkraft": "BAR", "woche": "all" }, { "fach": "S1", "raum": "B105", "lehrkraft": "THI", "woche": "all" }, { "fach": "K1", "raum": "B201", "lehrkraft": "SAE", "woche": "all" }, { "fach": "P1", "raum": "B503", "lehrkraft": "EVE", "woche": "all" }, { "fach": "S1", "raum": "T2", "lehrkraft": "THI", "woche": "all" }], "stunden": "2" }, "5": { "data": [{ "fach": "pw5", "raum": "A110", "lehrkraft": "DEB", "woche": "all" }, { "fach": "d7", "raum": "A111", "lehrkraft": "SUT", "woche": "WA" }, { "fach": "d7", "raum": "A111", "lehrkraft": "SUT", "woche": "WB" }, { "fach": "PW1", "raum": "B101", "lehrkraft": "NEU", "woche": "all" }], "stunden": "2" }, "8": { "data": [{ "fach": "ev5", "raum": "A101", "lehrkraft": "FOE", "woche": "WA" }, { "fach": "gb5", "raum": "A101", "lehrkraft": "RAV", "woche": "WB" }, { "fach": "g6", "raum": "A102", "lehrkraft": "SAE", "woche": "WB" }, { "fach": "et5", "raum": "A103", "lehrkraft": "STE", "woche": "WA" }, { "fach": "g5", "raum": "A103", "lehrkraft": "ENG", "woche": "WB" }, { "fach": "et6", "raum": "A108", "lehrkraft": "SAB", "woche": "WA" }, { "fach": "ka5", "raum": "A111", "lehrkraft": "KAS", "woche": "WA" }], "stunden": "2" }, "10": { "data": [{ "fach": "f5", "raum": "", "lehrkraft": "TIBs", "woche": "WB" }, { "fach": "l5", "raum": "A102", "lehrkraft": "BTR", "woche": "WA" }, { "fach": "sPA5", "raum": "A104", "lehrkraft": "BRA", "woche": "WB" }], "stunden": "2" } }, "freitag": { "1": { "data": [{ "fach": "C1", "raum": "B103", "lehrkraft": "BIB", "woche": "all" }, { "fach": "P2", "raum": "B503", "lehrkraft": "BAU", "woche": "all" }], "stunden": "2" }, "3": { "data": [{ "fach": "d5", "raum": "A101", "lehrkraft": "REI", "woche": "all" }, { "fach": "D1", "raum": "A107", "lehrkraft": "HMM", "woche": "all" }, { "fach": "i5", "raum": "B403", "lehrkraft": "HMS", "woche": "all" }, { "fach": "s5", "raum": "T4", "lehrkraft": "PFI", "woche": "all" }, { "fach": "s5", "raum": "T5", "lehrkraft": "PFI", "woche": "all" }], "stunden": "2" }, "5": { "data": [{ "fach": "E2", "raum": "A101", "lehrkraft": "RAV", "woche": "all" }, { "fach": "PW1", "raum": "A107", "lehrkraft": "NEU", "woche": "all" }, { "fach": "g5", "raum": "A111", "lehrkraft": "ENG", "woche": "all" }, { "fach": "B1", "raum": "B304", "lehrkraft": "GRP", "woche": "all" }], "stunden": "2" }, "7": { "data": [{ "fach": "S1", "raum": "A111", "lehrkraft": "THI", "woche": "all" }, { "fach": "S1", "raum": "T1", "lehrkraft": "THI", "woche": "all" }, { "fach": "S1", "raum": "T2", "lehrkraft": "THI", "woche": "all" }], "stunden": "1" }, "8": { "data": [{ "fach": "S1", "raum": "A111", "lehrkraft": "THI", "woche": "all" }, { "fach": "K1", "raum": "B201", "lehrkraft": "SAE", "woche": "WB" }, { "fach": "b5", "raum": "B301", "lehrkraft": "BRS", "woche": "WA" }, { "fach": "S1", "raum": "T1", "lehrkraft": "THI", "woche": "all" }, { "fach": "S1", "raum": "T2", "lehrkraft": "THI", "woche": "all" }, { "fach": "s6", "raum": "T4", "lehrkraft": "BLD", "woche": "all" }], "stunden": "2" } }, "dategueltig": "28 11 2022" } }

    useEffect(() => {

        AsyncStorage.getItem('stundenplan').then((value) => {

            setStundenplanData(JSON.parse(value))

            setLoading(false);

        })

    }, [])

    const faecher = faecherParse(stundenplanData)


    return (


        <View style={{ flex: 1 }}>
            <Loader loading={loading} />

            {loading ?

                <View></View>

                :
                state == 0 ?
                    <HomeScreenStundenplanOWN faecher={faecher} /> :

                    <ScrollView>

                        <HomeScreenStundenplanALL faecher={faecher} />
                    </ScrollView>

            }

            {
                loading ?

                    <View></View>

                    :

                    <View style={style_HomeScreenStundenplanScreen.menu}>

                        <SegmentedControl
                            values={['Persönlich', 'Gesamtplan']}
                            selectedIndex={state}
                            onChange={(event) => {
                                setState(event.nativeEvent.selectedSegmentIndex);
                            }}
                        />

                    </View>
            }
        </View >
    )

}

const style_HomeScreenStundenplanScreen = StyleSheet.create({

    menu: {
        height: 60,
        justifyContent: 'center',
        padding: 20,
        borderTopColor: '#e8e8e8',
        borderTopWidth: 0.5,
        backgroundColor: 'white',
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4
    }

})

function HomeScreenStundenplanALL({ navigation, faecher }) {


    const [zoomLVL, setZoomLVL] = useState({
        index: 1,
        value: 1000,
        adapt: false
    })

    return (

        //<GestureDetector gesture={pinchGesture}>

        <View style={style_HomeScreenStundenplanAll.wrapper}>

            <SegmentedControl
                values={['0.5x', '1x', '2x']}
                selectedIndex={zoomLVL.index}
                onChange={(event) => {
                    switch (event.nativeEvent.selectedSegmentIndex) {
                        //case 0:
                        //    setZoomLVL({
                        //        index: 0,
                        //        value: null,
                        //        adapt: true
                        //    })
                        //    break
                        case 0:
                            setZoomLVL({
                                index: 0,
                                value: 700,
                                adapt: false
                            })
                            break
                        case 1:
                            setZoomLVL({
                                index: 1,
                                value: 1000,
                                adapt: false
                            })
                            break
                        case 2:
                            setZoomLVL({
                                index: 2,
                                value: 1800,
                                adapt: false
                            })
                            break


                    }

                }}
            />

            <View style={style_HomeScreenStundenplanAll.stundenplanView}>

                <View style={style_HomeScreenStundenplanAll.stundenplanHeader}>

                    <View style={style_HomeScreenStundenplanAll.stundenplanHeaderSectionStunde}>
                        <Text style={style_HomeScreenStundenplanAll.stundenplanHeaderSectionText}> Std.</Text>
                    </View>

                    <View style={style_HomeScreenStundenplanAll.stundenplanHeaderSection}>
                        <Text style={style_HomeScreenStundenplanAll.stundenplanHeaderSectionText}>Montag</Text>
                    </View>

                    <View style={style_HomeScreenStundenplanAll.stundenplanHeaderSection}>
                        <Text style={style_HomeScreenStundenplanAll.stundenplanHeaderSectionText}>Dienstag</Text>
                    </View>

                    <View style={style_HomeScreenStundenplanAll.stundenplanHeaderSection}>
                        <Text style={style_HomeScreenStundenplanAll.stundenplanHeaderSectionText}>Mittwoch</Text>
                    </View>

                    <View style={style_HomeScreenStundenplanAll.stundenplanHeaderSection}>
                        <Text style={style_HomeScreenStundenplanAll.stundenplanHeaderSectionText}>Donnerstag</Text>
                    </View>

                    <View style={style_HomeScreenStundenplanAll.stundenplanHeaderSection}>
                        <Text style={style_HomeScreenStundenplanAll.stundenplanHeaderSectionText}>Freitag</Text>
                    </View>


                </View>

                <View style={style_HomeScreenStundenplanAll.stundenplanBody}>

                    <View style={style_HomeScreenStundenplanAll.stundenplanBodyRowStunde}>

                        <View style={style_HomeScreenStundenplanAll.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanAll.stundenplanStundeSectionText}>1</Text>
                        </View>


                        <View style={style_HomeScreenStundenplanAll.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanAll.stundenplanStundeSectionText}>2</Text>
                        </View>

                        <View style={style_HomeScreenStundenplanAll.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanAll.stundenplanStundeSectionText}>3</Text>
                        </View>

                        <View style={style_HomeScreenStundenplanAll.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanAll.stundenplanStundeSectionText}>4</Text>
                        </View>

                        <View style={style_HomeScreenStundenplanAll.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanAll.stundenplanStundeSectionText}>5</Text>
                        </View>

                        <View style={style_HomeScreenStundenplanAll.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanAll.stundenplanStundeSectionText}>6</Text>
                        </View>

                        <View style={style_HomeScreenStundenplanAll.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanAll.stundenplanStundeSectionText}>7</Text>
                        </View>

                        <View style={style_HomeScreenStundenplanAll.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanAll.stundenplanStundeSectionText}>8</Text>
                        </View>

                        <View style={style_HomeScreenStundenplanAll.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanAll.stundenplanStundeSectionText}>9</Text>
                        </View>

                        <View style={style_HomeScreenStundenplanAll.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanAll.stundenplanStundeSectionText}>10</Text>
                        </View>

                        <View style={style_HomeScreenStundenplanAll.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanAll.stundenplanStundeSectionText}>11</Text>
                        </View>

                    </View>


                    {
                        faecher.all.map((data, index) => {
                            return (
                                <View style={style_HomeScreenStundenplanAll.stundenplanBodyRow} key={generateUUID()}>

                                    {

                                        faecher.all[index].map((data2, index2) => {

                                            if (data2.stunden == '2') {
                                                return (
                                                    <View style={[style_HomeScreenStundenplanAll.stundenplanBodySection, { height: zoomLVL.value / 5.5 }]} key={generateUUID()}>

                                                        {

                                                            faecher.all[index][index2].data.map((data3, index3) => {
                                                                return (
                                                                    <View style={style_HomeScreenStundenplanAll.stundenplanEinFachInSection} key={generateUUID()}>
                                                                        <Text style={style_HomeScreenStundenplanAll.stundenplanFachInSection} key={generateUUID()}>
                                                                            {data3.fach}
                                                                        </Text>

                                                                        <Text style={style_HomeScreenStundenplanAll.stundenplanRaumInSection} key={generateUUID()}>
                                                                            {data3.lehrkraft + ' | ' + data3.raum}
                                                                        </Text>

                                                                    </View>
                                                                )

                                                            })

                                                        }

                                                    </View>
                                                )

                                            } else if (data2.stunden == '1') {
                                                return (
                                                    <View style={[style_HomeScreenStundenplanAll.stundenplanBodySection, { height: zoomLVL.value / 11 }]} key={generateUUID()}>

                                                        {

                                                            faecher.all[index][index2].data.map((data3, index3) => {
                                                                return (
                                                                    <Text key={generateUUID()}>
                                                                        {data3.fach}
                                                                    </Text>
                                                                )

                                                            })

                                                        }

                                                    </View>
                                                )
                                            } else if (data2.stunden == '-1') {
                                                return (
                                                    <View style={[style_HomeScreenStundenplanAll.keineStunde, { height: zoomLVL.value / 11, padding: 8 }]} key={generateUUID()}>

                                                        <View style={style_HomeScreenStundenplanAll.keineStundeInner}>

                                                        </View>

                                                    </View>
                                                )
                                            }
                                        })

                                    }

                                </View>
                            )
                        })

                    }

                </View>

            </View>

        </View >
        //</GestureDetector>
    )
}

const style_HomeScreenStundenplanAll = new StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    stundenplanView: {
        //        height: '100%',
    },
    stundenplanHeader: {
        height: 30,
        backgroundColor: '#313131',
        flexDirection: 'row',
        borderRadius: 5,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4
    },
    stundenplanBody: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },
    stundenplanHeaderSection: {
        flex: 1,
        marginHorizontal: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    stundenplanHeaderSectionText: {
        fontSize: 11,
        fontWeight: '300',
        color: 'white'
    },
    stundenplanHeaderSectionStunde: {
        flex: 0.5,
        marginHorizontal: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    stundenplanBodySection: {
        backgroundColor: 'white',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',

        borderColor: '#dadae8',
        borderWidth: 0.5,
        borderRadius: 10,

        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4
    },


    keineStundeInner: {
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#dadae8',
        height: '100%',
        borderRadius: 10
    },


    //keineStunde: {
    //    height: zoomLVL() / 11,
    //},
    //eineStunde: {
    //    height: zoomLVL() / 11,
    //},
    //zweiStunden: {
    //    height: zoomLVL() / 5.5,
    //},

    stundenplanBodySectionStunde: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },

    stundenplanBodyRowStunde: {
        flex: 0.5,
        marginHorizontal: 1,
    },
    stundenplanBodyRow: {
        flex: 1,
        marginHorizontal: 1
    },
    stundenplanStundeSectionText: {

    },

    stundenplanEinFachInSection: {
        //backgroundColor: 'red',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        //backgroundColor: '#fafafa',
        margin: 5,
        borderRadius: 10
    },


    //EIN FACH IN SECTION

    stundenplanFachInSection: {

    },

    stundenplanRaumInSection: {
        fontWeight: '200',
        fontSize: 10
    }

})


function HomeScreenStundenplanOWN({ navigation, faecher }) {

    return (
        <View style={style_HomeScreenStundenplanOwn.wrapper}>

            <View style={style_HomeScreenStundenplanOwn.stundenplanView}>

                <View style={style_HomeScreenStundenplanOwn.stundenplanHeader}>

                    <View style={style_HomeScreenStundenplanOwn.stundenplanHeaderSectionStunde}>
                        <Text style={style_HomeScreenStundenplanOwn.stundenplanHeaderSectionText}> Std.</Text>
                    </View>

                    <View style={style_HomeScreenStundenplanOwn.stundenplanHeaderSection}>
                        <Text style={style_HomeScreenStundenplanOwn.stundenplanHeaderSectionText}>Montag</Text>
                    </View>

                    <View style={style_HomeScreenStundenplanOwn.stundenplanHeaderSection}>
                        <Text style={style_HomeScreenStundenplanOwn.stundenplanHeaderSectionText}>Dienstag</Text>
                    </View>

                    <View style={style_HomeScreenStundenplanOwn.stundenplanHeaderSection}>
                        <Text style={style_HomeScreenStundenplanOwn.stundenplanHeaderSectionText}>Mittwoch</Text>
                    </View>

                    <View style={style_HomeScreenStundenplanOwn.stundenplanHeaderSection}>
                        <Text style={style_HomeScreenStundenplanOwn.stundenplanHeaderSectionText}>Donnerstag</Text>
                    </View>

                    <View style={style_HomeScreenStundenplanOwn.stundenplanHeaderSection}>
                        <Text style={style_HomeScreenStundenplanOwn.stundenplanHeaderSectionText}>Freitag</Text>
                    </View>


                </View>

                <View style={style_HomeScreenStundenplanOwn.stundenplanBody}>

                    <View style={style_HomeScreenStundenplanOwn.stundenplanBodyRowStunde}>

                        <View style={style_HomeScreenStundenplanOwn.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanOwn.stundenplanStundeSectionText}>1</Text>
                        </View>


                        <View style={style_HomeScreenStundenplanOwn.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanOwn.stundenplanStundeSectionText}>2</Text>
                        </View>

                        <View style={style_HomeScreenStundenplanOwn.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanOwn.stundenplanStundeSectionText}>3</Text>
                        </View>

                        <View style={style_HomeScreenStundenplanOwn.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanOwn.stundenplanStundeSectionText}>4</Text>
                        </View>

                        <View style={style_HomeScreenStundenplanOwn.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanOwn.stundenplanStundeSectionText}>5</Text>
                        </View>

                        <View style={style_HomeScreenStundenplanOwn.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanOwn.stundenplanStundeSectionText}>6</Text>
                        </View>

                        <View style={style_HomeScreenStundenplanOwn.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanOwn.stundenplanStundeSectionText}>7</Text>
                        </View>

                        <View style={style_HomeScreenStundenplanOwn.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanOwn.stundenplanStundeSectionText}>8</Text>
                        </View>

                        <View style={style_HomeScreenStundenplanOwn.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanOwn.stundenplanStundeSectionText}>9</Text>
                        </View>

                        <View style={style_HomeScreenStundenplanOwn.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanOwn.stundenplanStundeSectionText}>10</Text>
                        </View>

                        <View style={style_HomeScreenStundenplanOwn.stundenplanBodySectionStunde}>
                            <Text style={style_HomeScreenStundenplanOwn.stundenplanStundeSectionText}>11</Text>
                        </View>

                    </View>


                    {
                        faecher.own.map((data, index) => {
                            return (
                                <View style={style_HomeScreenStundenplanOwn.stundenplanBodyRow} key={generateUUID()}>

                                    {

                                        faecher.own[index].map((data2, index2) => {

                                            if (data2.stunden == '2') {
                                                return (
                                                    <View style={[style_HomeScreenStundenplanOwn.stundenplanBodySection, style_HomeScreenStundenplanOwn.zweiStunden]} key={generateUUID()}>

                                                        {

                                                            faecher.own[index][index2].data.map((data3, index3) => {
                                                                return (
                                                                    <View style={style_HomeScreenStundenplanOwn.stundenplanEinFachInSection} key={generateUUID()}>
                                                                        <Text style={style_HomeScreenStundenplanOwn.stundenplanFachInSection} key={generateUUID()}>
                                                                            {data3.fach}
                                                                        </Text>

                                                                        <Text style={style_HomeScreenStundenplanOwn.stundenplanRaumInSection} key={generateUUID()}>
                                                                            {data3.lehrkraft + ' | ' + data3.raum}
                                                                        </Text>

                                                                    </View>
                                                                )

                                                            })

                                                        }

                                                    </View>
                                                )

                                            } else if (data2.stunden == '1') {
                                                return (
                                                    <View style={[style_HomeScreenStundenplanOwn.stundenplanBodySection, style_HomeScreenStundenplanOwn.eineStunde]} key={generateUUID()}>

                                                        {

                                                            faecher.own[index][index2].data.map((data3, index3) => {
                                                                return (
                                                                    <View style={style_HomeScreenStundenplanOwn.stundenplanEinFachInSection} key={generateUUID()}>
                                                                        <Text style={style_HomeScreenStundenplanOwn.stundenplanFachInSection} key={generateUUID()}>
                                                                            {data3.fach}
                                                                        </Text>

                                                                        <Text style={style_HomeScreenStundenplanOwn.stundenplanRaumInSection} key={generateUUID()}>
                                                                            {data3.lehrkraft + ' | ' + data3.raum}
                                                                        </Text>

                                                                    </View>
                                                                )

                                                            })

                                                        }

                                                    </View>
                                                )
                                            } else if (data2.stunden == '-1') {
                                                return (
                                                    <View style={[style_HomeScreenStundenplanOwn.keineStunde]} key={generateUUID()}>




                                                        <View style={style_HomeScreenStundenplanOwn.keineStundeInner}>

                                                        </View>






                                                    </View>
                                                )
                                            }
                                        })

                                    }

                                </View>
                            )
                        })

                    }

                </View>

            </View>

        </View >

    );

}

const style_HomeScreenStundenplanOwn = new StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    stundenplanView: {
        height: '100%',
    },
    stundenplanHeader: {
        height: 30,
        backgroundColor: '#313131',
        flexDirection: 'row',
        borderRadius: 5,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4
    },
    stundenplanBody: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,

    },
    stundenplanHeaderSection: {
        flex: 1,
        marginHorizontal: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    stundenplanHeaderSectionText: {
        fontSize: 12,
        fontWeight: '300',
        color: 'white'
    },
    stundenplanHeaderSectionStunde: {
        flex: 0.5,
        marginHorizontal: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },


    stundenplanBodySection: {
        backgroundColor: 'white',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',

        borderColor: '#dadae8',
        borderWidth: 0.5,
        borderRadius: 10,

        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4
    },

    keineStunde: {
        height: (100 / 11) + '%',
        //borderBottomColor: '#dadae8',
        //borderBottomWidth: 1,
        padding: 8
    },

    keineStundeInner: {
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#dadae8',
        height: '100%',
        borderRadius: 10
    },

    eineStunde: {
        height: 100 / 11 + '%',
    },
    zweiStunden: {
        height: 100 / 5.5 + '%',
    },

    stundenplanBodySectionStunde: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },

    stundenplanBodyRowStunde: {
        flex: 0.5,
        marginHorizontal: 1,
        height: '100%'
    },
    stundenplanBodyRow: {
        flex: 1,
        marginHorizontal: 1,
        height: '100%'
    },
    stundenplanStundeSectionText: {

    },

    stundenplanEinFachInSection: {
        //backgroundColor: 'red',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        //backgroundColor: '#fafafa',
        margin: 5,
        borderRadius: 10
    },


    //EIN FACH IN SECTION

    stundenplanFachInSection: {

    },

    stundenplanRaumInSection: {
        fontWeight: '200',
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



function faecherParse(faecher2) {




    let faecher = {
        own: [],
        all: []
    }

    for (let selection in faecher2) {

        for (let key in faecher2[selection]) {

            if (key != "dategueltig") {
                let anzahlFaecher = []

                for (let i = 1; i <= 11; i++) {

                    let unterricht = false

                    for (let key2 in faecher2[selection][key]) {

                        if (+key2 == i) {
                            let push1 = faecher2[selection][key][key2]
                            push1.stunde = +key2
                            anzahlFaecher.push(faecher2[selection][key][key2])
                            unterricht = true

                        }

                    }

                    if (unterricht == false) {

                        if (i == 1) {

                            anzahlFaecher.push({
                                data: [],
                                stunde: i,
                                stunden: "-1"
                            })

                        } else {

                            if (anzahlFaecher[i - 2].stunden == "2") {
                                anzahlFaecher.push({
                                    data: [],
                                    stunde: i,
                                    stunden: "0"
                                })
                            } else {
                                anzahlFaecher.push({
                                    data: [],
                                    stunde: i,
                                    stunden: "-1"
                                })
                            }

                        }

                    }

                }

                faecher[selection].push(
                    anzahlFaecher
                )

            }

        }

    }

    return (faecher)
}