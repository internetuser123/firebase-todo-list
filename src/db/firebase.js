import { initializeApp } from 'firebase/app';

import {
  getFirestore
} from 'firebase/firestore';

const firebaseConfig = {
 // Din config
 apiKey: "AIzaSyAdUuWpnqwfGkF-WbGpbPsZl5_MMhLi4Q8",

  authDomain: "fir-todolist-react.firebaseapp.com",

  projectId: "fir-todolist-react",

  storageBucket: "fir-todolist-react.appspot.com",

  messagingSenderId: "615578182947",

  appId: "1:615578182947:web:fb5c770433ac18d78d9896"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db