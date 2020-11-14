import  firebase from "firebase/app"

import "firebase/auth"
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyCcMefXgGDsJz8uXvoGbNxGPO_NeknVgHc",
    authDomain: "projeto-stock-trader.firebaseapp.com",
    databaseURL: "https://projeto-stock-trader.firebaseio.com",
    projectId: "projeto-stock-trader",
    storageBucket: "projeto-stock-trader.appspot.com",
    messagingSenderId: "503864533997",
    appId: "1:503864533997:web:39f7f3b31f8007153e3de4"
};

let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }