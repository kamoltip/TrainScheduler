

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

    

    trainNm = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    freq = $("#freq-input").val().trim();
    arrival = $("#arrival-input").val().trim();

    console.log(trainNm);
    console.log(destination);
    console.log(freq);
    console.log(arrival);

    var newTrain = {
      name : trainNm,
      destination : destination,
      freq : freq,
      arrival : arrival 
    }

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

    var TtrainNm = childSnapshot.val().name;
    var Tdestination = childSnapshot.val().destination;
    var Tfreq = childSnapshot.val().freq;
    var Tarrival = childSnapshot.val().arrival;
    var firstTimeConverted = moment(Tarrival, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    var tRemainder = diffTime % Tfreq;
    console.log(tRemainder);
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    var tMinutesTillTrain = Tfreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "m").format("hh:mm A");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  
    $("#trainTb > tbody").append("<tr><td>" + TtrainNm + "</td><td>" + Tdestination + "</td><td>" + Tfreq + " mins" + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  });



