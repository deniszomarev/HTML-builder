const fs = require("fs");
const path = require("path");

const folder = "./03-files-in-folder/secret-folder/";

fs.readdir(
  "./03-files-in-folder/secret-folder",
  { withFileTypes: true },
  (err, files) => {
    if (err) console.log(err);
    else {
      console.log("\nCurrent directory filenames:");
      files.forEach((file) => {
        const filePath = path.join(folder, file.name);
        fs.stat(filePath, (error, stats) => {
          if (stats.isFile()) {
            console.log(
              `${file.name.replace(/\.[^.]+$/gm, "")} - ${path
                .extname(filePath)
                .slice(1)} - ${stats.size} byte`
            );
          }
        });
      });
    }
  }
);
