
import firebase from 'firebase/compat/app';


import 'firebase/compat/auth';
import 'firebase/compat/database';


const firebaseConfig = {
  apiKey: "AIzaSyCHsEJ-jq3cj2alCYD-8VTSN1WH9fGxmV8",
  authDomain: "letmeask-4adc8.firebaseapp.com",
  databaseURL: "https://letmeask-4adc8-default-rtdb.firebaseio.com",
  projectId: "letmeask-4adc8",
  storageBucket: "letmeask-4adc8.appspot.com",
  messagingSenderId: "257037703765",
  appId: "1:257037703765:web:af2f90d824c936cd2b92dc"
};


firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }