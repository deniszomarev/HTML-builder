const fs = require("fs");

//fs.ReadStream наследует от stream.Readable
const stream = new fs.ReadStream("./01-read-file/text.txt", {
  encoding: "utf-8",
});

stream.on("readable", function () {
  var data = stream.read();
  if (data) {
    console.log(data);
  }
});

stream.on("end", function () {
  //console.log("THE END");
});
