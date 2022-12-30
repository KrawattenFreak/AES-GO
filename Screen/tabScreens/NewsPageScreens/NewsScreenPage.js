import * as React from 'react';
import { View } from 'react-native';
//import { WebView } from 'react-native-webview';
import WebView from 'react-native-webview';


export default function NewsScreenPage({ route, navigation }) {

    const { link } = route.params;

    //----------------------------------------


    const javascript_HideHeader = () => {

        const jsRemoval = [
            'document.querySelector(".maincontent-wrap").style.transform = "translateY(-30px)";',
            'document.querySelector(".news-backlink-wrap ").style.display="none";',
            'document.getElementById("page-header").style.display = "none";',
            'document.getElementById("footer").style.display = "none";',
            'document.querySelector(".copyright").style.display = "none";',
            'document.querySelector(".frame-header").style.display="none";',
            'document.querySelector(".scroll-top").style.display="none";',
        ]
        let jsRemovalString = '';

        jsRemoval.forEach(c => { jsRemovalString = jsRemovalString + c })

        return jsRemovalString;
    }

    //const [singleNewsAES, setSingleNewsAES] = useState(null);
    //
    //    async function loadNews() {
    //
    //        
    //
    //        //PARSE HTML
    //        const searchUrl = link;
    //        const response = await fetch(searchUrl);   // fetch page
    //
    //        //GET HTML STRING
    //        const htmlString = await response.text();  // get response text
    //        
    //        const $ = cheerio.load(htmlString)
    //
    //
    //        return $('div[class="article"]').html();
    //        
    //    }
    //
    //
    //    useEffect(() => {
    //        loadNews().then(val => {
    //            setSingleNewsAES(val)
    //        })
    //    }, [])
    //
    //
    //----------------------------------------
    return (
        //<View></View>
        <WebView pointerEvents="" originWhitelist={['*']} source={{ uri: link }} injectedJavaScript={javascript_HideHeader()} />
    );


}