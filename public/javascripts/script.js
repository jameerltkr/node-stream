// Display messages on page
function displayMessage(messageText, messageType) {

    if (messageType.indexOf("warning") > -1) {
        var html = '';
        html += '<div class="alert alert-danger alert-dismissible" role="alert">';
        html += '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span></button>';
        html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
        html += '<span aria-hidden="true">&times;</span></button>';
        html += messageText;
        html += '</div>';

        $("#message").html(html);

    } else if (messageType.indexOf("success") > -1) {
        var html = '';
        html += '<div class="alert alert-success alert-dismissible" role="alert">';
        html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
        html += '<span aria-hidden="true">&times;</span></button>';
        html += messageText;
        html += '</div>';

        $("#message").html(html);
    }

}

$(document).ready(function () {

    $("#btnContinue").click(function () {

        var defaultAudioId, defaultCameraId, returnVal;

        defaultAudioId = $("#selectAudio").val();
        defaultCameraId = $("#selectCamera").val();

        if (defaultAudioId == 0) {
            displayMessage("Select a default microphone", "warning");
            returnVal = false;
        }

        if (defaultCameraId == 0) {
            displayMessage("Select a default camera", "warning");
            returnVal = false;
        }

        // Save settings in database
        $.ajax('/save-settings', {
            type: 'POST',
            data: JSON.stringify({ "defaultMic": defaultAudioId, "defaultCam": defaultCameraId }),
            contentType: 'application/json',
            success: function (data) {
                if (data) {
                    returnVal = true;
                }
            },
            error: function (err) {
                alert(JSON.parse(err.responseText).error);
                returnVal = false;
            }
        });

        return returnVal;

    });

});