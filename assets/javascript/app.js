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

  var converted = moment(arrivalTrain, "HH:mm").subtract(1, "years");

  // Current Time
  var currentTime = moment();

  // Difference between the times
  var diffTime = moment().diff(moment(converted), "minutes");

  // Time apart (remainder)
  var tRemainder = diffTime % freq;

  // Minute Until Train
  var tMinutesTillTrain = freq - tRemainder;

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  var newRow = $("<tr>").append($("<td>").html(trainName),$("<td>").html(trainDest),$("<td>").html(freq),$("<td>").html(arrivalTrain), $("<td>").html(tMinutesTillTrain));

  $("#schedule-table").append(newRow);

});
