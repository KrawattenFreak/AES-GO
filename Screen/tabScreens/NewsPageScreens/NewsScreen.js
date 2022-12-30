import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import cheerio from 'react-native-cheerio';
import { Animated, TouchableOpacity, RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text, FlatList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import MyColor from '../../Components/MyColor';
import Header from '../../Components/Header';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const headerHeight = 40

function NewsCard({ title, teaserText, teaserImageURL, onPress }) {


    return (
        <TouchableOpacity onPress={onPress}>
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
    );
}

const style_newsScreen_card = StyleSheet.create({
    cardBox: {
        width: 400,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 15,
        padding: 25,
        overflow: 'hidden',
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

    const [newsAES, setNewsAES] = useState(null);

    async function loadGraphicCards() {

        //ALL NEWS ENTRIES
        var listNewsTitle = [];

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
            listNewsTitle.push(entryOneNews);


        })

        return listNewsTitle

    }

    useEffect(() => {
        loadGraphicCards().then(val => {
            setNewsAES(val)
        })
    }, [])








    return (

        <View style={style_newsScreen.layout}>


            <Header label={"Neuigkeiten"} />


            <FlatList
                scrollEventThrottle={1000}
                contentContainerStyle={style_newsScreen.flatListContainerStyle}
                style={style_newsScreen.flatlist}
                data={newsAES}
                renderItem={({ item }) => {
                    return (

                        //SO TIM. ONPRESS FUNKTIONIERT HIER LEIDER NICHT. DU MUSST MAL SCHAUEN WORAN DAS LIEGT.
                        <NewsCard
                            title={item.header}
                            teaserText={item.teaserText}
                            teaserImageURL={item.teaserImageURL}
                            onPress={() => navigation.navigate('NewsScreenPage', { link: item.urlRedirect })}

                        />
                    )
                }}
                keyExtractor={item => item.id}



            />

            <StatusBar style="dark" />
        </View>


    );
}

const style_newsScreen = StyleSheet.create({
    layout: {
        flex: 1,
        alignItems: 'center',
    },
    flatlist: {
        width: '100%',
        flex: 1,


    },
    flatListContainerStyle: {
        alignItems: 'center',
        paddingTop: 140,
        //marginBottom: 80
    },

})