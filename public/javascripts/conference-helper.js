// Display warning on page
function displayWarning(warningText) {
    $("#warning").css("display", "block");
    $("#warningMsg").html(warningText);
}

// Browser compatibility check
// Let's check if the browser supports notifications
if (!("Notification" in window)) {
    displayWarning("This browser does not support notifications.");
}

// Let's check if the browser supports Conferencing
navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

if (navigator.getUserMedia) {
    $("#browserCompt").addClass("glyphicon glyphicon glyphicon-ok");
    $("#btnContinue").attr("disabled", false);  // Enable the Continue Button

    navigator.getUserMedia({ audio: true, video: { width: 1280, height: 720 } },
       function (stream) {
           var video = document.querySelector('video');
           video.src = window.URL.createObjectURL(stream);
           video.onloadedmetadata = function (e) {
               video.play();
           };

           MediaStreamTrack.getSources(function (data) {
               for (var i = 0; i < data.length; i++) {
                   var label;
                   if (data[i].kind === "audio") {
                       label = data[i].label.length > 0 ? data[i].label : "Audio Device";
                       $("#selectAudio").append($("<option>", { value: data[i].id }).text(label));
                   }
                   else {
                       label = data[i].label.length > 0 ? data[i].label : "Video Device";
                       $("#selectCamera").append($("<option>", { value: data[i].id }).text(label));
                   }
               }
           });
       },
       function (err) {
           displayWarning("The following error occurred: " + err.name);
       }
    );
} else {
    $("#browserCompt").addClass("glyphicon glyphicon-exclamation-sign");
    displayWarning("This browser does not support conferencing.");
    $("#btnContinue").attr("disabled", true);   // Disable the Continue Button
}