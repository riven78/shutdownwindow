const http = url = require("url"),
  path = require("path"),
  child_process = require('child_process');

class shutdownpc {
  execute(req, res) {
    var pathname = url.parse(req.url).pathname;
    if (path.basename(pathname) == "shutdownpc") {
      var workerProcess = child_process.exec("shutdown.exe -s -t 30", function (error, stdout, stderr) {
        res.writeHead(200, {"Content-Type": "text/plain"});
        var errStr = "";
        if (error) {
          errStr += "\n" + error.stack;
          errStr += "\n" + 'Error code: ' + error.code;
          errStr += "\n" + 'Signal received: ' + error.signal;
          console.log(error.stack);
          console.log('Error code: ' + error.code);
          console.log('Signal received: ' + error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

        errStr += "\n" + 'stdout: ' + stdout;
        errStr += "\n" + 'stderr: ' + stderr;
        res.end(errStr);
      });
      workerProcess.on('exit', function (code) {
        console.log('子进程已退出，退出码 ' + code);
      });
    }
  }
}