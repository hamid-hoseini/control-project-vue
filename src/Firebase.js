import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

//const settings = {timestampsInSnapshots: true};
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBlB1AJfvxiCA_87iMyBFOTtVE1GDtXBX4",
    authDomain: "control-project-1770c.firebaseapp.com",
    databaseURL: "https://control-project-1770c.firebaseio.com",
    projectId: "control-project-1770c",
    storageBucket: "control-project-1770c.appspot.com",
    messagingSenderId: "694836890432",
    appId: "1:694836890432:web:1a6960da7de7436f"
  };
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

//firebase.firestore().settings(settings);

export default firebaseApp;