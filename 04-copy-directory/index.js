const fs = require("fs");
const { copyFile } = require("fs/promises");

const newFilesPath = "./04-copy-directory/files-copy";

function copyDir() {
  fs.promises.mkdir(newFilesPath, { recursive: true });
  fs.readdir(
    "./04-copy-directory/files/",
    { withFileTypes: true },
    (err, files) => {
      if (err) console.log(err);
      else {
        files.forEach((file) => {
          try {
            copyFile(
              `./04-copy-directory/files/${file.name}`,
              `./04-copy-directory/files-copy/${file.name}`
            );
          } catch {
            console.log("The files could not be copied");
          }
        });
      }
    }
  );
}

copyDir();
