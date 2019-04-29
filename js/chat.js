$(function() {

  var messagesRef = firebase.database().ref('chat_list');
  $("#messageInput").keypress(function (e) {
    if (e.keyCode == 13) {
      var name = $("#nameInput").val();
      var text = $("#messageInput").val();
      messagesRef.push({name:name, text:text});
      $("#messageInput").val("");
    }
  });
  messagesRef.limitToLast(10).on("child_added", function (snapshot) {
    var message = snapshot.val();
    $("<div/>").text(message.text).prepend($("<em/>")
      .text(message.name + ": ")).appendTo($("#messagesDiv"));
    $("#messagesDiv")[0].scrollTop = $("#messagesDiv")[0].scrollHeight;
  });
});

function split(str) {
  var l = (str.indexOf(":"));
  if(l > 0)
    return  str.toUpperCase(str.slice(0, l));
  else
    return "";     
}
$(document).ready(function() {
  $('.planetOrbit').click(function(e){
    e.preventDefault();
    $('.planetOrbit').css("border-color", "#112B3D");
    $(this).css("border-color","#AADAFA")
  });
  $('.sun').click(function(e){
    e.preventDefault();
    $('.planetOrbit').css("border-color", "#112B3D");
  });
});

