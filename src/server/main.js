var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var config = require('./config');
var db = require('./db');
var mqttClient = require('./mqtt/client');

var app = express();

function startServer(config){
    app.use(express.static(path.join(__dirname, '../../public')));    
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    
    var port = process.env.PORT || config.listenPort || 8080;
    app.use(express.static(config.publicDir));
    app.use(require('./controllers'));
    
    app.listen(port);
    console.log('Server is listening on port ' + port);
}

config.load()
    .then((config) => {
        return db.init(config.store)
            .then(startServer.bind(null, config),  (err) => {  console.log("Failure init db: " + err); });
    },  (err) => {  console.log("Failure loadin config: " + err); })