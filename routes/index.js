var express = require('express');
var router = express.Router();

var settings = require('../models/settings');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Configure System' });
});

router.get('/conference', function (req, res, next) {
    res.render('conference', { title: 'Start a conference' });
});

router.post('/save-settings', function (req, res) {

    var defaultMic = req.body.defaultMic;
    var defaultCam = req.body.defaultCam;

    settings.update({ isCurrentSetting: true }, { $set: { isCurrentSetting: false, multi: true } }, function (err, updated) {
        if (err) {
            console.log(err);
            res.status(500).send('Database error occurred: ' + error);
        } else {
            console.log(updated);
            settings.findOne({
                defaultMic: defaultMic,
                defaultCam: defaultCam
            }, function (error, setting) {
                if (error) {
                    console.log(error);
                    res.status(500).send('Database error occurred: ' + error);
                } else if (setting) {

                    setting.isCurrentSetting = true;
                    setting.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Database error occurred: ' + error);
                        } else {
                            res.status(200).send('Settings saved');
                        }
                    });
                } else {
                    var newSetting = new settings();
                    newSetting.defaultMic = defaultMic;
                    newSetting.defaultCam = defaultCam;
                    newSetting.isCurrentSetting = true;
                    newSetting.savedOn = getDateTime();

                    newSetting.save(function (err, savedSetting) {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Database error occurred: ' + err);
                        } else if (savedSetting) {
                            res.status(200).send('Settings saved');
                        } else {
                            res.status(403).send('Unknown error occurred');
                        }
                    });
                }
            });
        }
    });

});

module.exports = router;

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + "::" + hour + ":" + min + ":" + sec;
}