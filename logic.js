

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDKaNfsdl5SO1Cy-kCT28vhPD51o3pHeq0",
    authDomain: "trainscheduler-c9f1a.firebaseapp.com",
    databaseURL: "https://trainscheduler-c9f1a.firebaseio.com",
    projectId: "trainscheduler-c9f1a",
    storageBucket: "trainscheduler-c9f1a.appspot.com",
    messagingSenderId: "1019331482845"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event){
    event.preventDefault();

    var trainNm = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var freq = $("#freq-input").val().trim();
    var arrival = $("#arrival-input").val().trim().substract(10, "years").format("X");


    console.log(trainNm);
    console.log(destination);
    console.log(freq);
    console.log(arrival);

    var newTrain = {
      name : trainNm,
      destination : destination,
      freq : freq,
      arrival : arrival 
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.freq);
    console.log(newTrain.arrival);

    alert("New Train successfully added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#freq-input").val("");
  $("#arrival-input").val("");

  return false;
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey){

  console.log(childSnapshot.val());

    var trainNm = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var freq = childSnapshot.val().freq;
    var arrival = childSnapshot.val().arrival;

    var minAway = moment().diff(moment.unix(arrival),"minutes");
    var timeRemain = moment().diff(moment.unix(arrival), "minutes") % freq;
    var minutes = freq - timeRemain;
    var nextTrain = moment().add(minutes, "m").format("HH:mm A");

    console.log(minutes);
    console.log(arrival);
    console.log(moment().format("hh:mm A"));
    console.log(arrival);
    console.log(moment().format("X"));

    $("#trainTb > tbody").append("<tr><td>" + trainNm + "</td><td>" + destination + "</td><td>" + freq + " mins" + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
  });



