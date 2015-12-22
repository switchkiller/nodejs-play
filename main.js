var http = require("http");
var fs = require('fs');
http.createServer(function(require, response){
  response.writeHead(200, {'Content-type':'text/plain'});
  fs.readFile('input.txt', function (err, data){
    if (err) return console.error(err);
    response.end(data.toString());
  });
}).listen(8081);

console.log('Serving at 127.0.0.1:8081');
