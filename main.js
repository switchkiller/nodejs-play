var http = require("http");

http.createServer(function(require, response){
  response.writeHead(200, {'Content-type':'text/plain'});
  response.end('Hey There\n');
}).listen(8081);

console.log('Serving at 127.0.0.1:8081');
