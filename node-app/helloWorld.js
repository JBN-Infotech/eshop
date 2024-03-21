var http = require('http');
var url = require('url');
var fs = require('fs');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var dt = require('./date');

/**
 * 'req' argument that represents the request from the client. 
 * This object has a property called "url" which holds the part of the 'url' that comes after the domain name
 */

/** Reads a file and prints in browser. */
const readFromFile = (res) => {
  // Serving the HTML file
  fs.readFile('demoFile.html', function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}

/** Prints a string Hello world with the current date and time. */
const helloWorld = (req, res) => {
  res.write("\n Hello World" + dt.myDateTime());
}

/** Prints the url and splits them */
const urlHandler = (req, res) => {
  res.write('\n URL = ' + req.url);

  // Split the Query String
  var q = url.parse(req.url, true).query;
  var txt = q.year + " " + q.month;
  res.write('\n Split Url = ' + txt);
}

/** Creates a event handler.
 * The provided code snippet is meant to be executed in a Node.js environment, not directly in a web browser. */
const eventHandler = () => {
  var myEventHandler = () =>  console.log('I hear a scream!');

  // Assign the event handler to an event:
  // can use 'once' instead of 'on'
  eventEmitter.on('scream', myEventHandler);

  // Fire the 'scream' event:
  eventEmitter.emit('scream');
}

http.createServer(function (req, res) {
  // Check the URL to decide what to serve
  if (req.url.includes('/demo')) {
    readFromFile(res);
  } else {
  
    helloWorld(req, res);
    urlHandler(req, res);
    eventHandler();

    res.end();  
  }
}).listen(8080, () => console.log('Server running on port 8080'));
