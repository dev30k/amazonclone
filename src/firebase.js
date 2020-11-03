// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import { firebase } from 'fire';
import  firebase from 'firebase';
 

const firebaseConfig = {
  apiKey: "AIzaSyBneAd0303L8ZI9UDJ_y32ZfMcssTcqrNI",
  authDomain: "real-d1d81.firebaseapp.com",
  databaseURL: "https://real-d1d81.firebaseio.com",
  projectId: "real-d1d81",
  storageBucket: "real-d1d81.appspot.com",
  messagingSenderId: "199418716930",
  appId: "1:199418716930:web:1766070696de3fe9cd581b",
  measurementId: "G-8BH4DXHL43"
};

const firebaseApp =firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore();
const auth=firebase.auth();

export {db,auth};