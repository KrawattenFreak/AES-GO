import * as React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useState, useEffect, useRef } from 'react';
import cheerio from 'react-native-cheerio';
import { Animated, TouchableOpacity, SectionList, RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text, sectionList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import MyColor from '../../Components/MyColor';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';

//const AnimatedsectionList = Animated.createAnimatedComponent(sectionList)
//const headerHeight = 40

function NewsCard({ title, teaserText, teaserImageURL, onPress }) {


    return (
        <View style={style_newsScreen_card.wrapper2}>
            <TouchableOpacity onPress={onPress} style={style_newsScreen_card.wrapper}>
                <View style={style_newsScreen_card.cardBox}>
                    <View style={style_newsScreen_card.cardBoxLayoutTop}>
                        <Text style={style_newsScreen_card.cardHeader}>{title}</Text>
                        <Image
                            source={{ uri: teaserImageURL }}
                            style={(teaserImageURL != undefined)
                                ? style_newsScreen_card.cardTeaserImage
                                : [style_newsScreen_card.cardTeaserImage, { width: 0 }]}
                        />

                    </View>
                    <Text style={{ marginTop: 15, color: '#2b2b2b', lineHeight: 21 }}>
                        {teaserText}
                    </Text>

                </View>
            </TouchableOpacity>
        </View>
    );
}

const style_newsScreen_card = StyleSheet.create({
    wrapper: {

        width: '100%',
        alignItems: 'center',

    },
    cardBox: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 15,
        padding: 25,
        overflow: 'hidden',
        flex: 1,
        borderColor: '#dadae8',
        borderWidth: 0.5,



    },
    cardHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        color: MyColor.headline,
        flex: 1,
        marginRight: 15
    },
    cardBoxLayoutTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',

    },
    cardTeaserImage: {
        height: 50,
        width: 50,
        borderRadius: 10
        //marginTop: 20
    }
})




export default function NewsScreen({ navigation }) {

    const [loading, setLoading] = useState(true)
    const [newsAES, setNewsAES] = useState(null);

    async function loadGraphicCards() {

        //ALL NEWS ENTRIES
        var listNewsTitle = [{
            title: 'Neuigkeiten',
            data: []
        }];

        //PARSE HTML
        const searchUrl = `https://www.aes-maintal.de/aktuelles/neuigkeiten/`;
        const response = await fetch(searchUrl);   // fetch page

        //GET HTML STRING
        const htmlString = await response.text();  // get response text
        const $ = cheerio.load(htmlString);


        //FIND H3 IN CLASS-ARTICLE
        $('div[class="article articletype-0"]').each((idx, ref) => {

            const elemHeader = $(ref).find('h3');
            const elemTeaserText = $(ref).find('p');
            const elemTeaserImage = $(ref).find('img');
            const elemLink = $(ref).find('h3 > a');

            const entryOneNews = {
                //REMOVE FIRST CHARACTER FROM H3 BECAUSE SOMEONE DECIDED TO ADD AN EMPTY CHARACTER AT THE BEGINNING OF EACH H3
                "header": elemHeader.text().substring(1),
                "teaserText": elemTeaserText.text(),
                "teaserImageURL": (elemTeaserImage.attr('src') == undefined) ? undefined : 'https://www.aes-maintal.de' + elemTeaserImage.attr('src'),
                "urlRedirect": 'https://www.aes-maintal.de' + elemLink.attr('href'),
                "id": idx
            }

            //console.log(entryOneNews)
            listNewsTitle[0].data.push(entryOneNews);


        })

        return listNewsTitle

    }

    useEffect(() => {
        loadGraphicCards().then(val => {
            setNewsAES(val)
            setLoading(false)
        })
    }, [])


    return (



        <View style={style_newsScreen.layout}>

            <Loader loading={loading} />



            {loading ? <View></View> :

                <SectionList
                    style={style_newsScreen.sectionList}
                    contentContainerStyle={style_newsScreen.sectionListContainerStyle}
                    sections={newsAES}
                    keyExtractor={(item, index) => item + index}
                    stickySectionHeadersEnabled={false}
                    renderItem={({ item }) => {

                        return (

                            <NewsCard
                                title={item.header}
                                teaserText={item.teaserText}
                                teaserImageURL={item.teaserImageURL}
                                onPress={() => navigation.navigate('NewsScreenPage', { link: item.urlRedirect })}

                            />
                        )
                    }}
                    renderSectionHeader={({ section: { title } }) => (
                        <Header label={title} />
                    )}
                />

            }


            <StatusBar style="dark" />
        </View>


    );
}

const style_newsScreen = StyleSheet.create({
    layout: {
        flex: 1,
        alignItems: 'center',
    },
    sectionList: {
        width: '100%',
        flex: 1,

    },
    sectionListContainerStyle: {
        paddingTop: getStatusBarHeight() + 20,
        marginHorizontal: 20,


        //marginBottom: 80
    },

})