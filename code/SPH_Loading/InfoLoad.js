import AsyncStorage from '@react-native-async-storage/async-storage';


export default function InfoLoad(callback) {

    let infoData = {
        infoAESData: 0,
        infoAdditionalData: []
    }

    AsyncStorage.getItem('infoAES').then((value) => {

        infoData.infoAESData = JSON.parse(value)

        AsyncStorage.getItem('infoAdditional').then(value2 => {

            infoData.infoAdditionalData = JSON.parse(value2)

            callback.call(this, infoData)

        })

    })

}