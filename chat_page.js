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
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = ""
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code

      console.log(firebase_message_id);
      console.log(message_data);
      name = message_data['name'];
      message = message_data['message'];
      like = message_data['like'];

      name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
      message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
      like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
      span_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

      row = name_with_tag + message_with_tag + like_button + span_tag;
      document.getElementById("output").innerHTML += row;

//End code
      } });  }); }
getData();

function logout() {
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location = "index.html";
}


function updateLike(message_id) {
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;

      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}