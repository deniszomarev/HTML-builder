const fs = require("fs");

fs.readdir(
  "./05-merge-styles/styles/",
  { withFileTypes: true },
  (err, files) => {
    if (err) console.log(err);
    else {
      fs.writeFile(
        "./05-merge-styles/project-dist/bundle.css",
        "",
        function () {
          console.log("bundle.css cleared");
        }
      );
      files.forEach((file) => {
        if (file.name.match(/[^.]+$/gm)[0] === "css") {
          const stream = new fs.ReadStream(
            `05-merge-styles/styles/${file.name}`,
            {
              encoding: "utf-8",
            }
          );
          stream.on("readable", function () {
            let data = stream.read();
            if (data) {
              fs.appendFile(
                "./05-merge-styles/project-dist/bundle.css",
                data,
                function (err) {
                  if (err) throw err;
                  console.log(`${file.name} added`);
                }
              );
            }
          });
        }
      });
    }
  }
);
