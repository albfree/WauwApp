import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyD5wCzqji50oFhF_a3nUT4bG3HGwYK20W4",
    authDomain: "wauw-ispp-fs.firebaseapp.com",
    databaseURL: "https://wauw-ispp-fs.firebaseio.com",
    projectId: "wauw-ispp-fs",
    storageBucket: "wauw-ispp-fs.appspot.com",
    messagingSenderId: "424386340759",
    appId: "1:424386340759:web:8283f35c3f6dbd18f386d2"
  };

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

// Para queries que no están puestas en ningún lado, usad la variable db
export var db = app.database();

// Custom queries
// Get all owners
export var owners = [];
db.ref()
  .child("owners")
  .orderByChild("id")
  .on("value", (snap) => {
    owners = snap.val();
  });

// Get all walkers
export var walkers = [];
db.ref()
  .child("walkers")
  .orderByChild("id")
  .on("value", (snap) => {
    walkers = snap.val();
  });

// Get all wauwers
export let wauwers = [];
db.ref()
  .child("wauwers")
  .orderByChild("id")
  .on("child_added", (snap) => {
    wauwers = snap.val();
  });
