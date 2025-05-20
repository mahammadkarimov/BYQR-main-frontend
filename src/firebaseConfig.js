import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBGvIeKMiT-Xs6bdxLV2IaHLmwRZjSbGQ4",
  authDomain: "byqr-417fa.firebaseapp.com",
  databaseURL: "https://byqr-417fa-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "byqr-417fa",
  storageBucket: "byqr-417fa.appspot.com",
  messagingSenderId: "1076136273781",
  appId: "1:1076136273781:web:df3a333eb23a59421f953c",
  measurementId: "G-DEMV5KYYH5"
};


export const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

export default database
