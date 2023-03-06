import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator, Text, Image, TouchableOpacity } from 'react-native';



export default function HintStundenplan({ visible, onPress }) {

    return (
        <Modal
            transparent={true}
            animationType={'fade'}
            visible={visible}
            onRequestClose={() => {
                console.log('close modal');
            }}>
            <View style={styles.modalBackground}>

                <View style={styles.hintWrapper}>
                    <View style={styles.hintImageSection}>
                        <Image
                            source={require('../../../Image/Illustrations/hintVertretung.png')}
                            style={{
                                height: 130,
                                resizeMode: 'contain',
                                margin: 30,
                            }}
                        />
                    </View>
                    <View style={styles.hintTextSection}>
                        <Text style={styles.hintTextSectionText}>
                            Hey!{"\n"}
                            Hier kannst du deinen extra für dich und deinen Kursen zugeschnittenen Vertretungsplan anschauen. {"\n"}{"\n"}

                        </Text>
                    </View>
                    <View style={styles.hintButtontSection}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={onPress}>
                            <Text style={styles.buttonTextStyle}>VERSTANDEN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};



const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',

    },
    hintWrapper: {
        backgroundColor: '#FFFFFF',
        height: 400,
        width: 300,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
    },
    hintTextSection: {
        justifyContent: 'flex-start',
        flex: 3,
        marginTop: 10,
    },
    hintImageSection: {
        flex: 3,
        justifyContent: 'flex-start'
    },
    hintTextSectionText: {
        marginHorizontal: 30,
        color: '#474747',
        fontSize: 12,
        marginTop: 30,
        lineHeight: 18
    },


    buttonStyle: {
        backgroundColor: '#42a4f5',
        color: '#FFFFFF',
        borderColor: '#42a4f5',
        height: 40,
        alignItems: 'center',
        borderRadius: 5,
        width: '100%',
        justifyContent: 'center',
    },

    buttonTextStyle: {
        color: 'white'

    },
    hintButtontSection: {
        flex: 1.3,
        width: 200
    }
});