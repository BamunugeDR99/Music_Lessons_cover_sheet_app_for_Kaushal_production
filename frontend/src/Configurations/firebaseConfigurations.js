import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCN0PdzX6AqIQvqyOK9ExhKge2yfdZT0h8",
    authDomain: "kaushal-music-production-app.firebaseapp.com",
    projectId: "kaushal-music-production-app",
    storageBucket: "kaushal-music-production-app.appspot.com",
    messagingSenderId: "448208241058",
    appId: "1:448208241058:web:d86d7018c82a6fb3d532fb",
    measurementId: "G-H6YJQ53EJD"
  };


  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app); 
  export {storage, storage as default};