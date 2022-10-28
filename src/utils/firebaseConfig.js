const { initializeApp } = require('firebase-admin/app');

const firebaseConfig = {
  apiKey: "AIzaSyBDun8Q3Ehq8nSP3W6IvYdQIGRRHEwKQls",
  authDomain: "batnotes-25.firebaseapp.com",
  projectId: "batnotes-25",
  storageBucket: "batnotes-25.appspot.com",
  messagingSenderId: "697431665943",
  appId: "1:697431665943:web:2a39dea123196f2d519b52",
  measurementId: "G-G6WKQQ20BK"
};


const firebaseInitializer = () => initializeApp(firebaseConfig);

module.exports = firebaseInitializer;
