import cheerio from 'react-native-cheerio';
import sphLogout from './SPH-logout';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function getSPHData(sessionID, callback) {


    //GET VERTRETUNGSPLAN
    vertretungsplanInfoFetch(sessionID, () => {

        stundenplanFetch(sessionID, () => {

            kalenderFetch(sessionID, () => {

                unterrichtFetch(sessionID, () => {

                    //LOGOUT - DONE WITH EVERY DOWNLOAD
                    sphLogout(sessionID)

                    if (callback)
                        callback.call(this)

                })



            })

        })

    })

}


//VERTRETUNG
function vertretungsplanInfoFetch(sessionID, callback) {
    fetch('https://start.schulportal.hessen.de/vertretungsplan.php', {
        method: 'GET',
        headers: {
            'Cookie': 'sid=' + sessionID
        },
        credentials: 'omit'
    })
        .then((resVertretung) => resVertretung.text()
            .then(resVertretungInfoHTML => {

                const Vertretung = vertretungsplanHTMLParser(resVertretungInfoHTML)
                const InfoAES = infoAESParser(resVertretungInfoHTML)

                AsyncStorage.setItem('vertretung', JSON.stringify(Vertretung)).then(() => {

                    AsyncStorage.setItem('infoAES', JSON.stringify(InfoAES)).then(() => {

                        callback.call(this)

                    })

                })
            })
        )
}

function infoAESParser(htmlString) {

    const $ = cheerio.load(htmlString);

    let amountInfo = 0
    //let infoAESData = []

    $('.infos').each((index1, ref1) => {

        if (index1 == 0) {

            $(ref1).find('tr:not([class="subheader"])').each((index2, ref2) => {


                //infoAESData.push($(ref2).html())
                amountInfo++
            })

        }

    })

    //return infoAESData
    return amountInfo

}

function vertretungsplanHTMLParser(htmlString) {

    let Vertretung = []

    const $ = cheerio.load(htmlString);

    $('h3').not('.hidden-xs').each((index1, ref1) => {

        const date = $(ref1).text().slice(16)

        Vertretung.push({ date: date })

        Vertretung[index1]['data'] = []

        $('#vtable' + date.replace('.', '_').replace('.', '_')).find('tr').each((index2, ref2) => {

            let pushed = {
                stunde: null,
                klasse: null,
                lehrkraft: null,
                art: null,
                fach: null,
                raum: null,
                raum_alt: null,
                hinweis: null,
                id: null
            }

            $(ref2).find('td').each((index3, ref3) => {

                const raw_ref3 = $(ref3).text().replace(/\s/g, '')

                switch (index3) {
                    case 0:
                        pushed.stunde = raw_ref3
                        break
                    case 1:
                        pushed.klasse = raw_ref3
                        break
                    case 2:
                        pushed.lehrkraft = raw_ref3
                        break
                    case 3:
                        pushed.art = raw_ref3
                        break
                    case 4:
                        pushed.fach = raw_ref3
                        break
                    case 5:
                        pushed.raum = raw_ref3
                        break
                    case 6:
                        pushed.raum_alt = raw_ref3
                        break
                    case 7:
                        pushed.hinweis = raw_ref3
                }

            })

            pushed.id = generateUUID()

            if (pushed.stunde != null) {

                if ($(ref2).find('b').text() != "Keine Eintr??ge!") {
                    Vertretung[index1]['data'].push(pushed)
                } else {
                    Vertretung[index1]['data'].push({
                        stunde: -1,
                        klasse: -1,
                        lehrkraft: -1,
                        art: -1,
                        fach: -1,
                        raum: -1,
                        raum_alt: -1,
                        hinweis: -1,
                        id: -1
                    })
                }

            }
        })

    })

    //console.log(Vertretung)

    return Vertretung

}

//------------------------------------------------------------


//STUNDENPLAN
function stundenplanFetch(sessionID, callback) {
    fetch('https://start.schulportal.hessen.de/stundenplan.php', {
        method: 'GET',
        headers: {
            'Cookie': 'sid=' + sessionID
        },
        credentials: 'omit'
    }).then((response) => response.text().then((responseHTML) => {

        const Stundenplan = stundenplanHTMLParser(responseHTML)

        AsyncStorage.setItem('stundenplan', JSON.stringify(Stundenplan[0])).then(() => {



            const kurse = [...new Set(Stundenplan[1])];

            AsyncStorage.setItem('kurse', JSON.stringify({ data: kurse })).then(() => {


                const aktuelleWoche = Stundenplan[2]
                AsyncStorage.setItem('aktuelleWoche', aktuelleWoche).then(() => {


                    callback.call(this)
                })

            })


        })

    }))


}

function stundenplanHTMLParser(htmlString) {

    let persKurseArr = []

    let stundenplanDATA =
    {
        own: {
            montag: {},
            dienstag: {},
            mittwoch: {},
            donnerstag: {},
            freitag: {},
        },
        all: {
            montag: {},
            dienstag: {},
            mittwoch: {},
            donnerstag: {},
            freitag: {},
        }
    }

    const umrechnenZahlWochentag = {
        1: 'montag',
        2: 'dienstag',
        3: 'mittwoch',
        4: 'donnerstag',
        5: 'freitag',
    }

    const $ = cheerio.load(htmlString);


    //OWN-STUNDENPLAN -------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------
    let dategueltigOwn;
    const dateRawOwn = $('#own').find('div[class="plan"]').attr('data-date')


    if (dateRawOwn !== undefined) {
        const dateArrayOwn = dateRawOwn.split('-')
        dategueltigOwn = dateArrayOwn[2] + ' ' + dateArrayOwn[1] + ' ' + dateArrayOwn[0]
        stundenplanDATA.own['dategueltig'] = dategueltigOwn

        $('#own').find('tbody').find('tr').each((index1, ref1) => {

            $(ref1).find('td').each((index2, ref2) => {

                if (typeof $(ref2).attr('rowspan') !== 'undefined') {

                    stundenplanDATA.own[umrechnenZahlWochentag[String(index2)]][String(index1 + 1)] = {
                        data: []
                    }

                    $(ref2).find('.stunde').each((index3, ref3) => {

                        const fachDATA = $(ref3).find('b').text().replace(/\s/g, '')



                        persKurseArr.push(fachDATA)

                        //console.log(fachDATA)



                        const lehrkraftDATA = $(ref3).find('small').text().replace(/\s/g, '')
                        const stundenDATA = $(ref2).attr('rowspan')

                        const wocheData = () => {
                            if ($(ref3).find('.badge').text() != '')
                                return $(ref3).find('.badge').text()
                            else {
                                return 'all'
                            }
                        }

                        const raw_ref3 = $(ref3).text().replace(/\s/g, '')
                        const raumDATA = raw_ref3.replace(fachDATA, '').replace(lehrkraftDATA, '').replace(wocheData(), '')



                        stundenplanDATA.own[umrechnenZahlWochentag[String(index2)]][String(index1 + 1)].data.push(
                            {
                                fach: fachDATA,
                                raum: raumDATA,
                                lehrkraft: lehrkraftDATA,
                                woche: wocheData(),
                                //stunden: stundenDATA
                                //rawData: $(ref3).text().replace(/\s/g, '')
                            }
                        )

                        stundenplanDATA.own[umrechnenZahlWochentag[String(index2)]][String(index1 + 1)].stunden = stundenDATA

                    })
                }
            })
        })

    }



    //------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------



    //ALL-STUNDENPLAN -------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------
    let dategueltigAll;
    const dateRawAll = $('#all').find('div[class="plan"]').attr('data-date')
    const dateArrayAll = dateRawAll.split('-')
    dategueltigAll = dateArrayAll[2] + ' ' + dateArrayAll[1] + ' ' + dateArrayAll[0]
    stundenplanDATA.all['dategueltig'] = dategueltigAll

    $('#all').find('tbody').find('tr').each((index1, ref1) => {

        $(ref1).find('td').each((index2, ref2) => {

            if (typeof $(ref2).attr('rowspan') !== 'undefined') {

                stundenplanDATA.all[umrechnenZahlWochentag[String(index2)]][String(index1 + 1)] = {
                    data: []
                }

                $(ref2).find('.stunde').each((index3, ref3) => {

                    const fachDATA = $(ref3).find('b').text().replace(/\s/g, '')
                    const lehrkraftDATA = $(ref3).find('small').text().replace(/\s/g, '')
                    const stundenDATA = $(ref2).attr('rowspan')


                    const wocheData = () => {
                        if ($(ref3).find('.badge').text() != '')
                            return $(ref3).find('.badge').text()
                        else {
                            return 'all'
                        }
                    }

                    const raw_ref3 = $(ref3).text().replace(/\s/g, '')
                    const raumDATA = raw_ref3.replace(fachDATA, '').replace(lehrkraftDATA, '').replace(wocheData(), '')


                    stundenplanDATA.all[umrechnenZahlWochentag[String(index2)]][String(index1 + 1)].data.push(
                        {
                            fach: fachDATA,
                            raum: raumDATA,
                            lehrkraft: lehrkraftDATA,
                            woche: wocheData(),
                            //stunden: stundenDATA
                            //rawData: $(ref3).text().replace(/\s/g, '')
                        }
                    )

                    stundenplanDATA.all[umrechnenZahlWochentag[String(index2)]][String(index1 + 1)].stunden = stundenDATA

                })
            }
        })
    })
    //------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------


    let aktuelleWoche

    $('#aktuelleWoche').each((index10, ref10) => {

        aktuelleWoche = $(ref10).text()

    })



    return [stundenplanDATA, persKurseArr, aktuelleWoche]

}

//------------------------------------------------------------


//KALENDER
function kalenderFetch(sessionID, callback) {

    //GET ICAL URL
    fetch('https://start.schulportal.hessen.de/kalender.php', {
        method: 'POST',
        headers: {
            'Cookie': 'sid=' + sessionID,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: 'f=getEvents&year=0&start=year&k=&s=',
        credentials: 'omit'
    }).then((response) => response.json().then((response) => {

        //console.log(response)

        const data = {
            data: response
        }

        AsyncStorage.setItem('kalender', JSON.stringify(response)).then(() => {
            callback.call(this)

        })



    }))


}

//------------------------------------------------------------


//UNTERRICHT
function unterrichtFetch(sessionID, callback) {

    fetch('https://start.schulportal.hessen.de/meinunterricht.php', {
        method: 'GET',
        headers: {
            'Cookie': 'sid=' + sessionID
        },
        credentials: 'omit'
    }).then((response) => response.text().then((responseHTML) => {

        const Unterricht = unterrichtHTMLParser(responseHTML)

        AsyncStorage.setItem('unterricht', JSON.stringify(Unterricht)).then(() => {

            //console.log(JSON.stringify(Unterricht))

            callback.call(this)

        })



    }))

}

function unterrichtHTMLParser(htmlString) {

    let unterrichtDATA = []

    const $ = cheerio.load(htmlString);

    $('#aktuellTable').find('tbody tr').each((index1, ref1) => {

        let payLoad = {
            header: null,
            fach: null,
            teacher: null,
            done: null,
            date: null,
            homework: null,
            content: null,
            id: null
        }

        payLoad.header = $(ref1).find('.thema').text()
        payLoad.fach = $(ref1).find('h3 .name').text()
        payLoad.teacher = $(ref1).find('.teacher button').attr('title')
        payLoad.done = ($(ref1).find('span[class="undone"]').text() == '')
        payLoad.date = $(ref1).find('.datum').text()
        payLoad.homework = $(ref1).find('.realHomework').text()//.replace(/(\r\n|\n|\r)/gm, "")
        payLoad.content = $(ref1).find('.inhalt').text()
        payLoad.id = $(ref1).attr('data-book')

        unterrichtDATA.push(payLoad)


    })

    return (unterrichtDATA)

}


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