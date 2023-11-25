// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDvWYzNAUksWJFcYkYiH0C6eRH-er40BGw",
  authDomain: "lets-chat-app-8c446.firebaseapp.com",
  databaseURL: "https://lets-chat-app-8c446-default-rtdb.firebaseio.com",
  projectId: "lets-chat-app-8c446",
  storageBucket: "lets-chat-app-8c446.appspot.com",
  messagingSenderId: "27135759499",
  appId: "1:27135759499:web:8f457f798b653c5082708e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addroom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("roomname- " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML+=row
      //End code
      });});}
getData();

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location = "index.html";
}