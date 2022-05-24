const fs = require("fs");
const rimraf = require("rimraf");
const { copyFile } = require("fs/promises");

async function createFolder() {
  try {
    //await fs.promises.access("./06-build-page/project-dist/");
    // rimraf("./06-build-page/project-dist/", function () {
    //   console.log("cleared project-dist");
    // });
    await fs.promises.mkdir("./06-build-page/project-dist/", {
      recursive: true,
    });
  } catch {
    console.log("rimraf err");
    // await fs.promises.mkdir("./06-build-page/project-dist/", {
    //   recursive: true,
    // });
  }
}

async function createHTML() {
  try {
    await copyFile(
      "./06-build-page/template.html",
      "./06-build-page/project-dist/index.html"
    );
  } catch {
    console.log("template.html could not be copied");
  }
  try {
    const newTemplate = await fs.promises.readFile(
      "./06-build-page/project-dist/index.html",
      "utf8"
    );
    //console.log(newTemplate);
    await htmlInject(newTemplate);
  } catch {
    console.log("index.html could not be read");
  }
}

async function htmlInject(data) {
  const header = await fs.promises.readFile(
    "./06-build-page/components/header.html",
    { encoding: "utf8" }
  );
  const articles = await fs.promises.readFile(
    "./06-build-page/components/articles.html",
    { encoding: "utf8" }
  );
  const footer = await fs.promises.readFile(
    "./06-build-page/components/footer.html",
    { encoding: "utf8" }
  );
  //console.log(data);
  if (data) {
    data = data
      .replace("{{header}}", header)
      .replace("{{articles}}", articles)
      .replace("{{footer}}", footer);
  }
  //console.log(data);

  await fs.promises.writeFile("./06-build-page/project-dist/index.html", data);
}

async function createStyles() {
  fs.readdir(
    "./06-build-page/styles/",
    { withFileTypes: true },
    (err, files) => {
      if (err) console.log(err);
      else {
        fs.writeFile("./06-build-page/project-dist/style.css", "", function () {
          console.log("style.css cleared");
        });
        files.forEach((file) => {
          if (file.name.match(/[^.]+$/gm)[0] === "css") {
            const stream = new fs.ReadStream(
              `./06-build-page/styles/${file.name}`,
              {
                encoding: "utf-8",
              }
            );
            stream.on("readable", function () {
              let data = stream.read();
              if (data) {
                fs.appendFile(
                  "./06-build-page/project-dist/style.css",
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
}

async function createAssets() {
  try {
    // await fs.promises.access("./06-build-page/project-dist/assets/");
    // rimraf("./06-build-page/project-dist/assets", function () {
    //   console.log("cleared project-dist/assets");
    // });
    await fs.promises.mkdir("./06-build-page/project-dist/assets", {
      recursive: true,
    });
  } catch {
    console.log("mkdir cant create assets");
  }

  //   const srcDir = `./06-build-page/assets/`;
  //   const destDir = `./06-build-page/project-dist/assets`;

  //   await fse.copy(srcDir, destDir, { overwrite: true }, function (err) {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       console.log("/project-dist/assets copied");
  //     }
  //   });
}

async function buildPage() {
  await createFolder();
  await createHTML();
  await createStyles();
  await createAssets();
}

buildPage();
