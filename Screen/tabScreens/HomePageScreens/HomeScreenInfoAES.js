import { TouchableOpacity, Pressable, RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text, Dimensions, PixelRatio, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import InfoLoad from '../../../code/SPH_Loading/InfoLoad';
import { WebView } from 'react-native-webview';
import SPH_auth from '../../../code/SPH_Networking/SPH-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cheerio from 'react-native-cheerio/lib/cheerio';
import Loader from '../../Components/Loader';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';



export default function HomeScreenInfoAES({ navigation }) {

    const [loading, setLoading] = useState(true)
    const [infoAESData, setInfoAESData] = useState([])

    useEffect(() => {

        loadInfoCards()

    }, [])



    async function loadInfoCards() {

        AsyncStorage.getItem('user_credentials').then((valueRaw) => {

            const value = JSON.parse(valueRaw)

            SPH_auth(value.user_name, value.user_password, (sid) => {

                fetch('https://start.schulportal.hessen.de/vertretungsplan.php', {
                    method: 'GET',
                    headers: {
                        'Cookie': 'sid=' + sid
                    },
                    credentials: 'omit'
                })
                    .then((resVertretung) => resVertretung.text()
                        .then(resVertretungInfoHTML => {

                            const $ = cheerio.load(resVertretungInfoHTML)

                            let infoAESData = []

                            $('.infos').each((index1, ref1) => {

                                if (index1 == 0) {

                                    $(ref1).find('tr:not([class="subheader"])').each((index2, ref2) => {
                                        infoAESData.push($(ref2).html())
                                    })

                                }

                            })

                            setInfoAESData(infoAESData)
                            setLoading(false)

                        })
                    )
            })

        })

    }

    //console.log(infoAESData[0])

    return (
        <View>
            <Loader loading={loading}></Loader>

            <ScrollView>
                {
                    infoAESData.map((data1, index1) => {

                        return (

                            <TouchableOpacity onPress={() => navigation.navigate('HomeScreenInfoAESSingle', { data: infoAESData[index1] })} style={style.webViewView} key={generateUUID()}>
                                <WebView
                                    style={style.webView}
                                    source={{ html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><style>p, span, h1, h2, h3, h4, h5, h6{font-family: "Arial"}</style><body>' + data1 + '</body></html>' }}
                                    bounces={false}
                                    scrollEnabled={false}
                                    scalesPageToFit={true}
                                />
                                <LinearGradient
                                    style={style.gradientView}
                                    colors={['black', 'rgba(255, 255, 255, 0)']}
                                    start={{ x: 2, y: 4 }} end={{ x: 0, y: 4 }}

                                >
                                    <View style={style.gradientViewView}>
                                        <View style={style.gradientViewIconView}>
                                            <Ionicons style={style.gradientViewIcon} name={'alert-circle'} size={20} color={'#42a4f5'} />
                                        </View>
                                        <Ionicons style={style.gradientViewIcon} name={'caret-forward-outline'} size={20} color={'white'} />
                                    </View>
                                </LinearGradient>


                            </TouchableOpacity>
                        )


                    })


                }

            </ScrollView>
        </View >
    )

}



const style = StyleSheet.create({


    webViewView: {
        flex: 1,
        paddingHorizontal: 15,
        marginVertical: 10,
        //SHADOW
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,

        elevation: 4,

    },

    webView: {
        width: '100%',
        paddingVertical: 1,
        height: 200,
        borderRadius: 10,

        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,


    },
    gradientView: {
        height: 200,
        marginTop: -200,

        borderRadius: 10,
    },
    gradientViewView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 20
    },
    gradientViewIcon: {
        //SHADOW
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,

        elevation: 4,
    },

    gradientViewIconView: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 8,
        borderRadius: 12,
        //SHADOW
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,

        elevation: 4,
        position: 'absolute',
        right: -10,
        top: 10
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