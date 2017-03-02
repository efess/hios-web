var express = require('express'),
    smokes = require('../model/smokes'),
    path = require('path'), 
    router = express.Router();
  
/* GET home page. */
router.get('/', function(req, res) {
    console.log(path.join(__dirname+'/../../public/index.html'));
     res.sendFile(path.join(__dirname+'/../../../public/index.html'));
});

router.get('/eventstest', function(req, res) {
    var deviceId = req.query.deviceId;
    var fromTime = 0;
    var toTime = 9443881643;
    
    var tokens = [
        deviceId,
        fromTime, // seconds since epoch...
        toTime,
        req.query.gran || 3600,
        req.query.limit || 100,
    ];
    
    smokes.getEvents(tokens)
        .then(function(data){
            res.send(JSON.stringify(data));
        }, function(){
            res.send('ERROR');
        });
});

router.use('/undercabinet', require('./undercabinet'));
router.use('/smokes', require('./smokes'));
router.use('/environment', require('./environment'));
router.use('/admin', require('./admin'));
router.use('/weather', require('./weather'));

module.exports = router