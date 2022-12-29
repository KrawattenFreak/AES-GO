import { JSEncrypt } from 'jsencrypt'
import CryptoJS from "react-native-crypto-js";
import cheerio from 'react-native-cheerio';

const jCryption_crypt = new JSEncrypt();

let aespw = 0

let sessionID = 0


export default function SPH_auth(userName, userPassword, callback) {

    //JCRYPTION TRY
    normalGETsph(userName, userPassword, (data) => {

        //normalGETjCryptionJS().then((jCryptionResponse)=>{

        sessionID = data[1]

        const password = jCryption_encrypt(generateUUID(), generateUUID())

        jCryption_authenticate(password, 'https://start.schulportal.hessen.de/ajax.php?f=rsaPublicKey', "https://start.schulportal.hessen.de/ajax.php?f=rsaHandshake&s=" + Math.floor(Math.random() * 2000), function (AESKey) {
            aespw = AESKey

            normalPOSTsphUSERDATA(data[0], (data2) => {

                sessionID = String(data2).split(';')[2].slice(13)

                callback.call(this, sessionID)

                //loggedInWithSidGETsph().then(response => {
                //
                //
                //
                //})
            })
        })
        //})


    })


}

//SEND FORM WITH USER-DATA------------------------------------------------------------

//GET SESSIONID & FORM
function normalGETsph(userName, userPassword, callback) {
    //PARSE HTML
    const searchUrl = 'http://start.schulportal.hessen.de/index.php?i=5220';

    fetch(searchUrl,
        {
            headers: { 'Cookie': '' }
        }
    ).then((response) => {

        const data = response.headers.get('Set-Cookie');

        response.text().then((resHTML) => {

            //GET HTML STRING
            //const htmlString = resHTML;  // get response text
            const $ = cheerio.load(resHTML);

            $('#inputEmail').val(userName)
            $('#inputPassword').val(userPassword)



            let seesionID = String(data).split(';')[1].slice(13)

            callback.call(this, [$('#all').serialize(), seesionID])

        })

    })





}

async function normalGETjCryptionJS() {

    const response = await fetch('https://start.schulportal.hessen.de/libs/jcryption/jquery.jcryption.3.1.0.js',
        {
            method: 'post',
            headers: {
                'Cookie': 'i=5220; sid=' + sessionID,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            }

        })

    return response.text()

}

async function normalPOSTsphUSERDATA(form, callback) {

    fetch("https://start.schulportal.hessen.de/ajax.php",
        {
            method: 'post',
            body: 'crypt=' + encodeURIComponent(jCryption_encrypt(form, aespw)),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': 'i=5220; complianceCookie=on; sid=' + sessionID,
            }
        }).then((response) => {
            callback.call(this, response.headers.get('Set-Cookie'))

        })

}

async function loggedInWithSidGETsph() {
    const searchUrl = `https://start.schulportal.hessen.de/meinunterricht.php`;
    const response = await fetch(searchUrl,
        {
            method: 'get',
            headers: { 'Cookie': 'i=5220; sid=' + sessionID }
        });

    return response.text()
}


//----------------------------------------------------------------------------------------------------



//JCRYPTION AUTH--------------------------------------------------------------------------------------
function jCryption_authenticate(AESEncryptionKey, publicKeyURL, handshakeURL, success, failure) {
    jCryption_getPublicKey(publicKeyURL, function () {
        jCryption_encryptKey(AESEncryptionKey, function (encryptedKey) {
            jCryption_handshake(handshakeURL, encryptedKey, function (response) {
                if (jCryption_challenge(response.challenge, AESEncryptionKey)) {



                    success.call(this, AESEncryptionKey)

                } else {

                    console.log("ich gehe sterben")

                }
            });
        });
    });
};

//------------PUBKEY--------------
function jCryption_getPublicKey(publicKeyURL, callback) {
    normalGETpubKey(publicKeyURL).then(res => {

        jCryption_crypt.setKey(JSON.parse(res).publickey)
        callback.call(this);

    })
}
async function normalGETpubKey(publicKeyURL) {
    const searchUrl = publicKeyURL;
    const response = await fetch(searchUrl,
        {
            method: 'get',
            headers: { 'Cookie': 'i=5220; sid=' + sessionID }
        })

    return response.text()
}
//--------------------------------

function jCryption_encryptKey(secret, callback) {
    var encryptedString = jCryption_crypt.encrypt(secret);
    callback(encryptedString);
};

function jCryption_encrypt(data, secret) {
    return CryptoJS.AES.encrypt(data, secret) + "";
};

function jCryption_decrypt(data, secret) {
    return hex2string(CryptoJS.AES.decrypt(data, secret) + "");
}

function jCryption_challenge(challenge, secret) {
    var decrypt = jCryption_decrypt(challenge, secret);

    if (decrypt == secret) {
        return true;
    }
};


//-------------HANDSHAKE-----------
function jCryption_handshake(url, encrypted, callback) {

    normalPOSThandshake(url, encrypted).then(response => {
        callback.call(this, JSON.parse(response))

    })
}

async function normalPOSThandshake(url, encrypted) {

    const encryptedURLENCODET = encodeURIComponent(encrypted)

    const response = await fetch(url,
        {
            method: 'post',
            body: "key=" + encryptedURLENCODET,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Cookie': 'i=5220; sid=' + sessionID }
        });

    return response.text()
}

//---------------------------------


async function ajax_loginPOSTsph() {

}


//-------------------------------------------------------------------------------------------------------



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

function hex2string(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
};