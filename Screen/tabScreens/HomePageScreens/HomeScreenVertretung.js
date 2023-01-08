import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { SectionList, FlatList, RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';

import HintVertretung from '../../Components/Hints/HintVertretung';
import Loader from '../../Components/Loader';


import VertretungContainer from './Vertretung/VertretungContainer';
import VertretungDataHeader from './Vertretung/VertretungDateHeader';

export default function HomeScreenVertretung({ navigation }) {

    const [visibleHint, setVisibleHint] = useState(true)
    const [loading, setLoading] = useState(true)
    const [vertretungData, setVertretungData] = useState({})

    useEffect(() => {

        AsyncStorage.getItem('vertretung').then((value) => {

            setVertretungData(JSON.parse(value))

            setLoading(false);

        })

    }, [])

    return (
        <View style={style_HomeScreenVertretung.wrapper}>

            <HintVertretung visible={visibleHint} onPress={() => {

                setVisibleHint(false)

            }} />

            <Loader loading={loading} />

            {
                loading ?

                    <View></View>

                    :

                    <SectionList
                        sections={vertretungData}
                        keyExtractor={(item, index) => item + index}
                        contentContainerStyle={{ paddingTop: 10, paddingBottom: 10 }}
                        renderItem={({ item }) =>
                            <VertretungContainer
                                stunde={item.stunde}
                                klasse={item.klasse}
                                lehrkraft={item.lehrkraft}
                                art={item.art}
                                fach={item.fach}
                                raum={item.raum}
                                raum_alt={item.raum_alt}
                                hinweis={item.hinweis}
                            />
                        }
                        renderSectionHeader={({ section }) => (
                            <VertretungDataHeader date={section.date} />
                        )}
                    />

            }

        </View>

    );


}


const style_HomeScreenVertretung = new StyleSheet.create({

    wrapper: {
        //marginHorizontal: 20
    },

})