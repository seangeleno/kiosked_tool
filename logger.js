module.exports = function (req, res, next) {
  var url = req.url, method = req.method, start = +new Date(), stream = process.stdout;
  res.on('finish', function () {
    var duration = +new Date() - start;
    var message = "Method: " + method + "\nURL: " + url + "\nDuration: " + duration + "ms\n";
    stream.write(message);
  });
  next();
};
