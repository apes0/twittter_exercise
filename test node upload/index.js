var http = require('http'),
    express = require('express'),
    Busboy = require('busboy'),
    path = require('path'),
    fs = require('fs');
  
var app = express();
  
app.get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input style="padding: 6px 25px;border-radius: 15px;background-color: deepskyblue;color: darkcyan;" type="file" name="filetoupload"><br>');
    res.write('<input type="submit" style="padding: 6px 25px;border-radius: 15px;background-color: deepskyblue;color: darkcyan;">');
    res.write('<iframe src="koda.html"</iframe>');
    res.write('</form>');
    return res.end();
})
  var name = ""
app.post('/fileupload', function (req, res) {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      name = filename;
      var saveTo = path.join(__dirname, 'uploads/' + filename);
      file.pipe(fs.createWriteStream(saveTo));
    });
  
    busboy.on('finish', function() {
      res.writeHead(200, { 'Connection': 'close' });
      res.end(name+" has been uploaded.");
    });
  
    return req.pipe(busboy);    
});
  
app.listen(3000);