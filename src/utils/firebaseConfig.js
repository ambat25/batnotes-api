const { initializeApp } = require('firebase-admin/app');

const firebaseConfig = {
  apiKey: "AIzaSyDUN8kn7DSw2FE53EUdzYceliHS1ou9P-U",
  authDomain: "tailor-shop-e3434.firebaseapp.com",
  databaseURL: "https://tailor-shop-e3434.firebaseio.com",
  projectId: "tailor-shop-e3434",
  storageBucket: "tailor-shop-e3434.appspot.com",
  messagingSenderId: "159760251236",
  appId: "1:159760251236:web:7c96835f674bf0b9"
};


const firebaseInitializer = () => initializeApp(firebaseConfig);

module.exports = firebaseInitializer;
