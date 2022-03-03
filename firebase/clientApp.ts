import firebase, { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";



// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIRE_BASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIRE_BASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIRE_BASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIRE_BASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIRE_BASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIRE_BASE_MESSAGING_APP_ID,
//     measurementId: process.env.NEXT_PUBLIC_FIRE_BASE_MEASUREMENT_ID
//   };

const firebaseConfig = {
  apiKey: "AIzaSyDJLdo8CUee_QiBaH8z3cIU7GorCxJIDb8",
  authDomain: "expeed-3781d.firebaseapp.com",
  projectId: "expeed-3781d",
  storageBucket: "expeed-3781d.appspot.com",
  messagingSenderId: "747281546768",
  appId: "1:747281546768:web:94e6179a7951cb13ce1495",
  measurementId: "G-BWHHVGLGC1"
};





// Initialize Firebase

// if(!firebase.getApps.length){
//   firebase.initializeApp(firebaseConfig);
// }
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

  // export default firebase;




