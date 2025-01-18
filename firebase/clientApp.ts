import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore"; 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const clientCredentials =  {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
}

const app = initializeApp(clientCredentials);

export default app; 