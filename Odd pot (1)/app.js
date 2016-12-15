var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = 8080;
var fs = require('fs');
var util = require('util');

connections = [];

server.listen(process.env.PORT || port);
console.log('running');

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
    connections.push(socket);
    console.log(' %s people voted', connections.length);

    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log(' voter disconnected', connections.length);

    });

    // function updateUsernames(){
    // io.emit('get users', users);
    // }
    // 
    // 
    // 
    // function updateMessage(){
    // io.emit('get message', chatlog);
    // }


    socket.on('send message', function(data) {
        // var str = data.split(" ");
        console.log("message read", data);

        fs.readFile('my_file.json', 'utf8', function(err, json) {

        	if (json == undefined) {
        		fs.appendFile('./my_file.json', util.inspect({}), 'utf-8');
        	}

            console.log("JSON read", json);

            var color =  data.color.toLowerCase();
            var word =  data.word.toLowerCase();

            // check if the color already exists
            if (json.word === undefined) {
            	// if it does not 
            	// create object
                var obj = {
                    color: color,
                    words: [word]
                }

 
                // add object to JSON file
                fs.appendFile('./my_file.json', util.inspect(obj), 'utf-8');
            } 
            // if it does
            else {
            	// add new emotion
            	json.words.push(word);
            }
        });

           

        // fs.appendFile('./my_file.json', util.inspect(obj), 'utf-8');

        // console.log(obj);

        //console.log(data);
    });
});