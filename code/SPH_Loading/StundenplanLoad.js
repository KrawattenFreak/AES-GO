import AsyncStorage from '@react-native-async-storage/async-storage';



let weekdays = new Array(7)
weekdays[0] = "sonntag";
weekdays[1] = "montag";
weekdays[2] = "dienstag";
weekdays[3] = "mittwoch";
weekdays[4] = "donnerstag";
weekdays[5] = "freitag";
weekdays[6] = "samstag";






export default function StundenplanLoad(callback) {


    let stundenplanDATA = []

    AsyncStorage.getItem('stundenplan').then((value) => {


        AsyncStorage.getItem('aktuelleWoche').then((value2) => {

            let todayKursePre = []

            stundenplanDATA[0] = value2

            const date = new Date()

            const valueStundenplan = JSON.parse(value)

            if (valueStundenplan.own[weekdays[date.getDay()]] != undefined) {

                const currentDay = Object.entries(valueStundenplan.own[weekdays[date.getDay()]])
                //const currentDay = Object.entries(valueStundenplan.own['samstag'])



                for (const oneKurs of currentDay) {
                    todayKursePre.push(oneKurs)
                }
            }
            //else {
            //    console.log("Wochenende")
            //}

            stundenplanDATA[1] = todayKursePre

            //console.log(stundenplanDATA)
            callback.call(this, stundenplanDATA)


        })

    })

}