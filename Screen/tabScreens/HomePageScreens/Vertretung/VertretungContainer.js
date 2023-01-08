import * as React from 'react';
import { RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';



export default function VertretungContainer({ stunde, klasse, lehrkraft, art, fach, raum, raum_alt, hinweis }) {

    let ioniconName = ''
    let ioniconColor = ''

    switch (hinweis) {
        case 'Entfall':
            ioniconName = 'close-circle'
            ioniconColor = 'red'
            break
        case 'Raum':
            ioniconName = 'caret-up'
            ioniconColor = 'orange'
            break

        default:
            ioniconName = 'cloud-circle'
            ioniconColor = 'green'


    }




    return (
        <View style={style_VertretungContainer.wrapper}>

            <View style={style_VertretungContainer.leftView}>


                <Ionicons name={ioniconName} size={30} color={ioniconColor} />


                <Text style={style_VertretungContainer.hinweis}>
                    {hinweis ? String(hinweis).toUpperCase() : "-"}
                </Text>



            </View>

            <View style={style_VertretungContainer.middleView}>

                <View style={style_VertretungContainer.middleViewTop}>
                    <Text style={style_VertretungContainer.fach}>
                        {fach ? fach : "-"}
                    </Text>
                </View>

                <View style={style_VertretungContainer.middleViewBottom}>
                    <Text numberOfLines={1} style={style_VertretungContainer.lehrer}>
                        {lehrkraft ? String(lehrkraft).replace(/,/g, ', ') : "-"}
                    </Text>
                </View>


            </View>

            <View style={style_VertretungContainer.rightView}>

                <Text style={style_VertretungContainer.stunde}>
                    {stunde ? String(stunde).replace('-', ' - ') : "-"}
                </Text>

            </View>


        </View >


    )
}




const style_VertretungContainer = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: 'white',
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 11,

        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4

    },


    //STUNDE
    rightView: {
        flex: 1,
        //backgroundColor: 'red',
        justifyContent: 'center'
    },

    stunde: {
        textAlign: 'right',
        marginRight: 20,
        fontSize: 18,
        color: '#4E4E4E'
    },
    //--------

    middleView: {
        flex: 2,
        flexDirection: 'column'
    },

    //FACH
    middleViewTop: {
        flex: 5,
        //backgroundColor: 'green',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    fach: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#4E4E4E'
    },
    //-------

    //LEHRKRAFT
    middleViewBottom: {
        flex: 4,
        //backgroundColor: 'pink',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    lehrer: {
        fontWeight: 'normal',
        //fontFamily: (Platform.OS === 'android') ? 'sans-serif-light' : 'HelveticaNeue-UltraLight',
        color: '#4E4E4E',
        marginTop: 4,
        textAlign: 'center',
        marginHorizontal: 30,
        fontWeight: '300'
    },
    //-----------


    //HINWEIS
    leftView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hinweis: {
        color: '#4E4E4E',
        fontSize: 11,
        fontWeight: '300'
    }
    //--------



})