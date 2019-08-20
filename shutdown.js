const shutdown = require("shutdownpc");
const http = require("http"),
  fs = require("fs"),
  path = require("path");

http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  if (path.basename(pathname) == "" || path.basename(pathname) == null) {
    res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    fs.readFile("index.html", function (err, data) {

      if (err) {
        var errStr = "";
        errStr += "\n" + err.stack;
        errStr += "\n" + 'Error code: ' + err.code;
        errStr += "\n" + 'Signal received: ' + err.signal;
        console.log(err.stack);
        console.log('Error code: ' + err.code);
        console.log('Signal received: ' + err.signal);
        res.end(errStr);
      } else {
        console.log("data=" + data);
        res.end(data);
      }
    });
  } else {
		shutdown.execute(req, res);
  }
}).listen(8888);
console.log("Server running at http://127.0.0.1:8888 /");