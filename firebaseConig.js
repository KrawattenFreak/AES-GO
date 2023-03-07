import { getStorage, ref, getDownloadURL } from "firebase/storage";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



export default class fireBaseData {

    constructor() {

    }

    firebaseConfig = null

    app = null

    storage = null

    storageRef = null



    login() {

        this.firebaseConfig = {
            apiKey: "AIzaSyDazx86aVo5c7zLNLgRGufjYLLa_YwzjH8",
            authDomain: "sph-renewed.firebaseapp.com",
            projectId: "sph-renewed",
            storageBucket: "sph-renewed.appspot.com",
            messagingSenderId: "321557036453",
            appId: "1:321557036453:web:45367f4b6cb3b1004ebc4c",
            measurementId: "G-JB7GERN7L0"
        };

        // Initialize Firebase
        this.app = initializeApp(this.firebaseConfig);

        this.storage = getStorage(this.app);

        this.storageRef = ref(this.storage, 'info.json');

    }

    downloadInfo(callback) {

        getDownloadURL(this.storageRef).then(url => {

            //console.log(url)

            fetch(url)
                .then(raw => raw.text())
                .then(value => {

                    AsyncStorage.setItem('infoAdditional', value).then(() => {

                        callback.call()

                    })

                })

        })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        console.log("File doesn't exist")
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        console.log("User doesn't have permission to access the object")
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        console.log("User canceled the upload")
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                }
            })
    }


}
