import { RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text, Animated, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const dateConvert = (dateString) => {
    return new Date(dateString)
}


export default function HomeInfoAdditionalContainer({ data }) {

    const date = new Date()

    return (
        <View style={style.wrapper}>
            {

                data.map(data1 => {

                    return (
                        <View key={generateUUID()}>
                            {
                                (date > dateConvert(data1.startDate)) ?

                                    <View style={style.singleInfoView}>

                                        <Text style={style.singleInfoHeader} >
                                            {data1.header}
                                        </Text>

                                        <Text style={style.singleInfoText} >
                                            {data1.body}
                                        </Text>

                                    </View> :

                                    <View style={style.singleInfoView}>
                                        <View style={style.singleInfoViewNotActive} >

                                            <Ionicons name={'lock-closed'} size={20} color={'#3d3d3d'} />
                                            <Text style={style.singleInfoViewNotActiveText}>Dieser Inhalt ist noch nicht freigeschaltet.</Text>

                                        </View>
                                    </View>

                            }

                        </View>
                    )


                })


            }
        </View>
    )
}


const style = StyleSheet.create({


    wrapper: {
        width: '100%'
    },
    singleInfoView: {
        backgroundColor: 'red',
        marginHorizontal: 20,
        marginBottom: 10,
        padding: 20,



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
    },

    singleInfoHeader: {
        fontWeight: '800',
        marginBottom: 10,
        color: '#3d3d3d'

    },
    singleInfoText: {

    },
    singleInfoViewNotActive: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },

    singleInfoViewNotActiveText: {
        marginLeft: 10,
        fontWeight: '800',
        color: '#3d3d3d'
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