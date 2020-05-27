import firebase from 'firebase/app';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyB8Q_DK2Q1iZ9hGNN2TqY8W81MfdL8zcjo",
    authDomain: "sujeitocoder.firebaseapp.com",
    databaseURL: "https://sujeitocoder.firebaseio.com",
    projectId: "sujeitocoder",
    storageBucket: "sujeitocoder.appspot.com",
    messagingSenderId: "18182191029",
    appId: "1:18182191029:web:44321891f9bf7e1f964bfc"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;