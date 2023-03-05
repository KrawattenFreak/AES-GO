import AsyncStorage from '@react-native-async-storage/async-storage';


export default function InfoLoad(callback) {

    let infoData = {
        infoAESData: 0
    }

    AsyncStorage.getItem('infoAES').then((value) => {

        infoData.infoAESData = JSON.parse(value)

        //console.log(infoData)

        callback.call(this, infoData)

    })

}