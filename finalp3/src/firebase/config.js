import app from 'firebase/app'; 
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAtCSpLSh07pxexnEK1Gn1DNWXP0UWbEuE",
    authDomain: "final-progra-3.firebaseapp.com",
    projectId: "final-progra-3",
    storageBucket: "final-progra-3.appspot.com",
    messagingSenderId: "175370551170",
    appId: "1:175370551170:web:330b8b89e524780891d99b"
  };

export const auth = firebase.auth(); 
export const storage = app.storage(); 
export const db = app.firestore(); 
