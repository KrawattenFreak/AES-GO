import cheerio from 'react-native-cheerio';
import sphLogout from './SPH-logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ICAL from 'ical.js'

export default function getSPHData(sessionID, callback) {


    //GET VERTRETUNGSPLAN
    vertretungsplanFetch(sessionID, () => {

        stundenplanFetch(sessionID, () => {

            kalenderFetch(sessionID, () => {

                //LOGOUT - DONE WITH EVERY DOWNLOAD
                sphLogout(sessionID)

                if (callback)
                    callback.call(this)

            })

        })

    })

}


//VERTRETUNG
function vertretungsplanFetch(sessionID, callback) {
    fetch('https://start.schulportal.hessen.de/vertretungsplan.php', {
        method: 'GET',
        headers: {
            'Cookie': 'sid=' + sessionID
        },
        credentials: 'omit'
    })
        .then((resVertretung) => resVertretung.text()
            .then(resVertretungHTML => {

                const Vertretung = vertretungsplanHTMLParser(resVertretungHTML)

                AsyncStorage.setItem('vertretung', JSON.stringify(Vertretung)).then(() => {

                    //console.log(JSON.stringify(Vertretung))

                    callback.call(this)

                })
            })
        )
}

function vertretungsplanHTMLParser(htmlString) {

    let Vertretung = []

    const $ = cheerio.load(htmlString);

    $('h3').each((index1, ref1) => {

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

            if (pushed.stunde != null)
                Vertretung[index1]['data'].push(pushed)
        })

    })

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

        AsyncStorage.setItem('stundenplan', JSON.stringify(Stundenplan)).then(() => {
            //console.log(JSON.stringify(Stundenplan))
            callback.call(this)

        })

    }))


}


function stundenplanHTMLParser(htmlString) {

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

    return stundenplanDATA

}


//------------------------------------------------------------




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