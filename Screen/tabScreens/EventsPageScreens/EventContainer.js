import * as React from 'react';
import { RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';


export default function EventContainer({ label, title, picture, onPress, description, dtstart, dtend, soon, dtstartyear, isDate, time, location, category }) {







    let categoryIconName
    let categoryColorName
    let categoryTitleName

    switch (category) {
        case "4":
            categoryTitleName = 'Events'
            categoryIconName = 'earth'
            categoryColorName = 'green'
            break;
        case "11":
            categoryTitleName = 'Klausur'
            categoryIconName = 'document'
            categoryColorName = 'red'
            break;
        case "9":
            categoryTitleName = 'Schulwoche'
            categoryIconName = 'caret-down-circle'
            categoryColorName = 'grey'
            break;
        case "7":
            categoryTitleName = 'Ferien'
            categoryIconName = 'airplane'
            categoryColorName = 'pink'
            break;
        case "3":
            categoryTitleName = 'Lehren und Lernen'
            categoryIconName = 'school'
            categoryColorName = 'cyan'
            break;
        case "1":
            categoryTitleName = 'Konferenz'
            categoryIconName = 'chatbubbles'
            categoryColorName = 'peachpuff'
            break;
        case "14":
            categoryTitleName = 'Abitur'
            categoryIconName = 'glasses'
            categoryColorName = 'yellow'
            break;
        case "16":
            categoryTitleName = 'Elterngespräch'
            categoryIconName = 'chatbox-ellipses'
            categoryColorName = '#432eff'
            break;
        case "8":
            categoryTitleName = 'Fortbildung'
            categoryIconName = 'library'
            categoryColorName = '#ceff2e'
            break;

        default:
            categoryTitleName = '...'
            categoryIconName = 'bookmarks'
            categoryColorName = 'grey'
            break;
    }


    return (
        <View style={style.wrapper}>


            <View style={style.container}>
                <View style={style.top}>
                    <LinearGradient
                        colors={[categoryColorName, 'black']}
                        style={style.linearGradient}
                        start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}

                    >
                        <ImageBackground source={require('../../../Image/placeholderEvent.jpg')} resizeMode="cover" style={style.image} imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                        </ImageBackground>
                    </LinearGradient>

                </View>

                <View style={style.bottom}>
                    {soon ?
                        <View style={style.soonWrapper}>
                            <Text style={style.soonText}>DEMNÄCHST</Text>
                        </View> :
                        <View></View>
                    }

                    <View style={style.bottomTitle}>
                        <View style={style.bottomTitleView}>


                            <Ionicons name={categoryIconName} size={20} color={'#575757'} />
                            <Text style={style.categoryTitleName}>{String(categoryTitleName).toUpperCase()}</Text>
                            <Text style={style.bottomTitleText}>
                                {title}
                            </Text>
                        </View>

                        {description == '' ?

                            <View></View> :

                            <View style={style.bottomDescriptionView}>
                                <Text style={style.bottomDescriptionText}>
                                    {String(description).split('<br />').join('')}
                                </Text>
                            </View>
                        }






                    </View>


                    <View style={style.bottomDate}>

                        {
                            location == null ? <View></View> :
                                <View style={style.bottomLocationView}>
                                    <Ionicons name={"location"} size={30} color={'#1c1c1c'} />
                                    <Text style={style.bottomLocationText}>
                                        {String(location).toUpperCase()}
                                    </Text>
                                </View>
                        }
                        {
                            isDate ? <View></View> :
                                <Text style={style.bottomTimestart}>{time}</Text>
                        }
                        {

                            dtstart == dtend ?
                                <Text style={style.bottomDtstart}>
                                    {dtstart}
                                </Text> :
                                <Text style={style.bottomDtstart}>
                                    {String(dtstart).replace(dtstartyear, '') + '  -  ' + dtend}
                                </Text>

                        }
                    </View>


                </View>


            </View>

        </View >



    )

}


const style = StyleSheet.create({
    wrapper: {
        marginHorizontal: 5,
        width: 300,
        flex: 1,
        justifyContent: 'center',
        marginVertical: 30,
        //marginTop: 100,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
        flex: 1,


    },

    container: {
        borderRadius: 30,
        flex: 1,
        backgroundColor: '#242424',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

    },

    top: {
        height: 150
    },
    bottom: {
        //borderTopWidth: 1,
        borderTopColor: '#dadae8',
        justifyContent: 'center',
        alignItems: 'center',
        //paddingHorizontal: 10,

        //paddingHorizontal: 30,
        paddingVertical: 20,
        flex: 1,
        //justifyContent: 'space-between',


    },

    bottomTitle: {
        flex: 2,
        width: '100%',
        paddingHorizontal: 20
    },

    bottomTitleView: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 20,
        marginTop: -50,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
        alignItems: 'center',
        padding: 16,
    },

    bottomTitleText: {
        fontWeight: '700',
        fontSize: 22,
        textAlign: 'center',
        color: 'black',

    },

    bottomDescriptionView: {

        marginVertical: 10,

        backgroundColor: '#1c1c1c',
        padding: 20,
        borderRadius: 10
    },
    bottomDescriptionText: {
        color: 'white',
        fontWeight: '300',
        fontSize: 15
    },

    bottomLocationView: {
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
        backgroundColor: 'white',
        marginBottom: 20
    },

    bottomLocationText: {
        color: '#1c1c1c',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '300'
    },


    bottomDtstart: {
        color: 'white',
        fontSize: 22,
        fontWeight: '300',
    },
    bottomTimestart: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '400',
    },
    bottomDate: {
        flex: 0.5,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    image: {
        flex: 1,
        justifyContent: "center",
        borderRadius: 80,
        opacity: 0.5
    },

    linearGradient: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

    },
    soonWrapper: {
        position: 'absolute',
        top: -170,
        //left: 30,
        justifyContent: 'flex-end',
        padding: 10,
        paddingHorizontal: 30,
        backgroundColor: 'red',
        borderRadius: 10,
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 4,

    },
    soonText: {
        shadowColor: '#1c1c1c',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 4,
        color: 'white',
        fontWeight: '200',
        fontSize: 30,
        textAlign: 'center',

    },
    categoryTitleName: {
        fontWeight: '200',
        fontSize: 13,
        marginBottom: 5,
        color: '#575757',
        marginTop: 2
    }
})