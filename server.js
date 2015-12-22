var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

//Sending file data and Error responses
//Helper function - 1
function send404(response){
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

//Helper function - 2 XXX Serve data
function sendFile(response, filePath, fileContents){
  response.writeHead(
    200,
    {'content-type': mime.lookup(path.basename(filePath)) }
  );
  response.end(fileContents);
}

//Helper function - 3 XXX Making it fast, using Cache
function serveStatic(response, cache, absPath){
  if (cache[absPath]){                // Check if cache exists or not
    sendFile(response, absPath, cache[absPath]); //Load from cache - serve it!
  }
  else{           // Else cache it
      fs.exists(absPath, function(exists){ //Check if the path exists
        if (exists){
          fs.readFile(absPath, function(err, data){
            if (err)
              send404(response);      // If file path exists but file doesnt exists
            else {
              cache[absPath] = data;  // Load the data into cache memory
              sendFile(response, absPath, data);  // serve it!
            }
          });
        }
        else{
          send404(response);
        }
      });
  }
}
// Now lets create a server.
var server = http.createServer(function(request, response){
  var filePath = false;

  if (request.url == '/'){
    filePath = 'public/index.html';
  }
  else{
    filePath = 'public' +request.url;
  }
  var absPath = './' + filePath;
  serveStatic(response, cache, absPath);
});
