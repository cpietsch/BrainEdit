// Copyright (c) 2015 Christopher Pietsch

var express = require('express');
var gui = require('nw.gui');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var arduino = require('../arduino.js')();


app.use(express.static('public'));
server.listen(3000);

arduino.search();

var dataDirectory='public/data/';


// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/public/index.html');
// });

io.on('connection', function (socket) {
  socket.emit('init', { hello: 'world' });

  // sp.on("close", function () {
  //  console.log('serial closed');
  // });
  
  socket.on('arduinoStatus', function (fn) {
      fn(arduino.status);
  });

  socket.on('change', function (data) {
     console.log("socket change", data)
     
     // arduino.setFreq(data.freq, data.alt)
  });

  socket.on('listTracks', function (fn) {
    fs.readdir(dataDirectory,function(err,files){
        if (err) throw err;
        fn(files);
    });
  });

  socket.on('getTrack', function (file,fn) {
    fs.readFile(dataDirectory+file,'utf-8',function(err,raw){
      if (err) throw err;
      fn(JSON.parse(raw))
    });
  });

  socket.on('saveTrack', function (name,raw,fn) {
    fs.writeFile(dataDirectory+name, JSON.stringify(raw), function(err) {
        if (err) throw err;
        console.log("saveTrack",name,raw)
        fn(name);
    }); 
  });

  socket.on('stop', function () {
     console.log("socket stop")
     //todo stop brainmachine
     sp.write("0,0" +"\n", function(err, results) {
       console.log("serial 0",results)
     });
  });

});



