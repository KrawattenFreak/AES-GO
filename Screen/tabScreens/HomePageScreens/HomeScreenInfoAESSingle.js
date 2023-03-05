import { TouchableOpacity, Pressable, RefreshControl, ScrollView, Platform, StyleSheet, Button, View, Text } from 'react-native';
import WebView from 'react-native-webview';



export default function HomeScreenInfoAESSingle({ route }) {

    return (
        <View style={style.wrapper}>
            <WebView
                style={style.webView}
                source={{ html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><style>p{font-family: "Arial"}</style><body>' + route.params.data + '</body></html>' }}
                scalesPageToFit={false}
            />
        </View>
    )
}


const style = StyleSheet.create({

    wrapper: {

        flex: 1

    },

    webView: {
        flex: 1
    }

})