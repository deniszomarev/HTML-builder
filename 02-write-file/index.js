const fs = require("fs");
const readline = require("readline");
const { stdin: input, stdout: output } = require("process");

let writeableStream = fs.createWriteStream("./02-write-file/text.txt");

const rl = readline.createInterface({ input, output });

console.log("Enter text:");

rl.on("close", () => {
  console.log("Goodbye");
  writeableStream.end();
});

rl.on("line", (input) => {
  if (input == "exit") {
    rl.close();
  } else {
    writeableStream.write(input + "\n");
  }
});
