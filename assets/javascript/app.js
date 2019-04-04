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

$("#add-train-btn").on("click", function(event){
event.preventDefault();

var trainName = $("#train-name-input").val().trim();
var trainDest = $("#role-input").val().trim();
var freqTrain = $("#frequency-input").val().trim();
var arrivalTrain = $("#arrival-input").val().trim();

var newTrain = {
  name: trainName,
  destination: trainDest,
  arrival: arrivalTrain,
  frequency: freqTrain
};

database.ref().push(newTrain);

$("#train-name-input").val("");
$("#role-input").val("");
$("#frequency-input").val("");
$("#arrival-input").val("");

});

database.ref().on("child_added", function(childSnapshot){

  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var freq = childSnapshot.val().frequency;
  var arrivalTrain = childSnapshot.val().arrival;
// Assumptions
var tFrequency = 3;
// Time is 3:30 AM
var firstTime = "03:30";

  var converted = moment(arrivalTrain, "HH:mm").subtract(1, "years");
  console.log(converted);
  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  // Difference between the times
  var diffTime = moment().diff(moment(converted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  // Time apart (remainder)
  var tRemainder = diffTime % freq;
  console.log(tRemainder);
  // Minute Until Train
  var tMinutesTillTrain = freq - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  var newRow = $("<tr>").append($("<td>").html(trainName),$("<td>").html(trainDest),$("<td>").html(freq),$("<td>").html(arrivalTrain), $("<td>").html(tMinutesTillTrain));



  $("#schedule-table").append(newRow);


});
