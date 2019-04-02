var config = {
  apiKey: "AIzaSyC_uqaiJnpKUSt8i9JkAUlA4VLY367B_A4",
  authDomain: "train-scheduler-40e73.firebaseapp.com",
  databaseURL: "https://train-scheduler-40e73.firebaseio.com",
  projectId: "train-scheduler-40e73",
  storageBucket: "train-scheduler-40e73.appspot.com",
  messagingSenderId: "821644960224"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = $("#train-name-input").val().trim();
var trainRole = $("#role-input").val().trim();
var freqTrain = $("#frequency-input").val().trim();
var arrivalTrain = $("#arrival-input").val().trim();

var newTrain = {
  name: trainName,
  role: trainRole,
  arrival: arrivalTrain,
  frequency: freqTrain
};

database.ref().push(newTrain);

$("#train-name-input").val("");
$("#role-input").val("");
$("#frequency-input").val("");
$("#arrival-input").val("");
