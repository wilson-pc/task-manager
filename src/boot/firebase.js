import Firebase from "firebase/app";
import "firebase/firestore"; // eslint-disable-line
import "firebase/auth";
var firebaseConfig = {
  apiKey: "AIzaSyBH_ZZbaS02ax6lqWe1KWY9DY2vQZr7qng",
  authDomain: "task-manager-99709.firebaseapp.com",
  projectId: "task-manager-99709",
  storageBucket: "task-manager-99709.appspot.com",
  messagingSenderId: "1064678226326",
  appId: "1:1064678226326:web:51352800991bdc821505b7",
};
Firebase.initializeApp(firebaseConfig);
export default Firebase;
