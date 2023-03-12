import AsyncStorage from '@react-native-async-storage/async-storage';



export default function VertretungsplanLoad(callback) {

    let dataVertretungVar = []

    AsyncStorage.getItem('kurse').then((valueKurse) => {
        AsyncStorage.getItem('vertretung').then((valueVertretungsplan) => {

            //console.log(valueKurse)

            const valueVertretungsplanJSON = JSON.parse(valueVertretungsplan)[0]
            const valuevalueKurseJSON = JSON.parse(valueKurse)

            valueVertretungsplanJSON.data.forEach(vertretungEntry => {

                valuevalueKurseJSON.data.forEach(myKursEntry => {


                    //console.log(vertretungEntry.fach)
                    //console.log(myKursEntry)


                    //vertreungsEntry.fach.includes(myKursEntry)

                    if (vertretungEntry.fach == myKursEntry) {
                        //console.log(vertretungEntry.art)

                        if (vertretungEntry.hinweis == 'Entfall' || vertretungEntry.art == 'kein Präs.Unt.' || vertretungEntry.art == 'Selbststudium') {
                            dataVertretungVar.push({ fach: myKursEntry, type: 'entfall', stunde: vertretungEntry.stunde, lehrkraft: vertretungEntry.lehrkraft })
                        } else if (vertretungEntry.art == 'Raum') {
                            dataVertretungVar.push({ fach: myKursEntry, type: 'raum', stunde: vertretungEntry.stunde, lehrkraft: vertretungEntry.lehrkraft, raum: vertretungEntry.raum, raum_alt: vertretungEntry.raum_alt })
                        } else if (vertretungEntry.art == 'Klausur') {
                            dataVertretungVar.push({ fach: myKursEntry, type: 'klausur', stunde: vertretungEntry.stunde, raum: vertretungEntry.raum })
                        } else {
                            dataVertretungVar.push({ fach: myKursEntry, type: '-', art: vertretungEntry.art, stunde: vertretungEntry.stunde, lehrkraft: vertretungEntry.lehrkraft, raum: vertretungEntry.raum })
                        }
                    }

                });
            });

            //console.log(dataVertretung)
            callback.call(this, dataVertretungVar)

        })



    })







}