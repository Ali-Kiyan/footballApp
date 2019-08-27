import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
const firebaseConfig = {
    apiKey: "AIzaSyDOOmBZal8QcM7FN1O37rTXnxRNlkh0G2A",
    authDomain: "football-app-99d17.firebaseapp.com",
    databaseURL: "https://football-app-99d17.firebaseio.com",
    projectId: "football-app-99d17",
    storageBucket: "",
    messagingSenderId: "793333909089",
    appId: "1:793333909089:web:071c4035c3a9be2c"
  };
  firebase.initializeApp(firebaseConfig)

  const firebaseDB = firebase.database();
  firebaseDB.ref('matches').once('value').then((snapshot)=> {
      console.log(snapshot.val()) 
  })