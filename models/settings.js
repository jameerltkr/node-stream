var mongoose = require('mongoose');

module.exports = mongoose.model('Settings', {
    defaultMic: String,
    defaultCam: String,
    isCurrentSetting: Boolean,
    savedOn: String
});