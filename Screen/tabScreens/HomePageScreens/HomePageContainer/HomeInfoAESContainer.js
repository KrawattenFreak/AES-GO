import { TouchableOpacity, Pressable, RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';




export default function InfoAESContainer({ infoAESData }) {

    return (

        <View style={style.contentView_content}>
            <View style={style.infoAESHeaderView}>

                <Ionicons name={'alert-circle'} size={20} color={'grey'} />
                <Text style={style.infoAESHeaderText}>
                    OFFIZIELLE MELDUNGEN
                </Text>

            </View>

            <View style={style.infoAESRightView}>

                <View style={style.infoAESNumberView}>
                    <Text style={style.infoAESNumber}>
                        {infoAESData}

                    </Text>
                </View>

                <Ionicons name={'caret-forward-outline'} size={15} color={'grey'} />
            </View>



        </View>


    )


}


const style = StyleSheet.create({
    contentView_content: {

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginHorizontal: 20,
        backgroundColor: 'rgb(250, 250, 250)',
        borderRadius: 10,
        borderColor: '#42a4f5',
        borderWidth: 1,






        //SHADOW
        shadowColor: "#42a4f5",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.05,
        shadowRadius: 5,

        elevation: 4,

        marginBottom: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,

    },
    contentView_contentText: {
        fontSize: 15,
        color: 'grey',

    },
    infoAESHeaderView: {
        //marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoAESHeaderText: {
        fontSize: 15,
        fontWeight: '800',
        color: 'grey',
        marginLeft: 10,

    },



    infoAESRightView: {
        flexDirection: 'row',
        alignItems: 'center'
    },





    infoAESNumberView: {
        backgroundColor: '#42a4f5',
        padding: 10,
        borderRadius: 15,
        marginRight: 10
    },

    infoAESNumber: {

        fontFamily: 'threeFont',
        fontSize: 20,
        color: 'white'


    }

})