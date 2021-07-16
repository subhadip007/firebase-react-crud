
import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyBZxsDdckwC10nWjfiF0JYC0dL4lyR4zVg",
  authDomain: "kiflon.firebaseapp.com",
  databaseURL: 'https://kiflon-default-rtdb.firebaseio.com/',
  projectId: "kiflon",
  storageBucket: "kiflon.appspot.com",
  messagingSenderId: "916936170229",
  appId: "1:916936170229:web:7a1b95200e5c511af283bc"

}




if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}else {
   firebase.app(); 
}




export  default firebase;


