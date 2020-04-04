import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAfLltQ_t5X0bqCivZSDrIV7Jmmf076Jtc",
  authDomain: "wauw-ispp-s3.firebaseapp.com",
  databaseURL: "https://wauw-ispp-s3.firebaseio.com",
  projectId: "wauw-ispp-s3",
  storageBucket: "wauw-ispp-s3.appspot.com",
  messagingSenderId: "191130769894",
  appId: "1:191130769894:web:b866775f14d7f420cb1e27",
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

//Get all requests
export let requests = [];
db.ref("pruebasRequests")
  .orderByChild("pending")
  .equalTo(true)
  .on("value", function (snap) {
    snap.forEach(function (child) {
      requests.push(child.val());
    });
  });

// export let requests = [];
// db.ref()
//   .child("requests")
//   .orderByChild("date")
//   .on("child_added", snap => {
//     requests.push(snap.val());
//   });
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
