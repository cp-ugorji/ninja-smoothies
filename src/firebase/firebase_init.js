import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCRVrI3Kd9tkVV6mjjwsvY5qC_gYnKwVnQ",
    authDomain: "chux-udemy-ninja-smoothies.firebaseapp.com",
    databaseURL: "https://chux-udemy-ninja-smoothies.firebaseio.com",
    projectId: "chux-udemy-ninja-smoothies",
    storageBucket: "chux-udemy-ninja-smoothies.appspot.com",
    messagingSenderId: "153350452130"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

//export firestore database
export default firebaseApp.firestore();