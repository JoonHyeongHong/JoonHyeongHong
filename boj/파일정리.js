const fs = require("fs");
const input = fs
  .readFileSync("/home/sesa/JS_Cote/boj/example.txt")
  .toString()
  .trim()
  .split("\n");
const n = Number(input.shift());
const files = {};
const regex = new RegExp(/.+(\.)/, "i");
for (const row of input) {
  const extension = row.replace(regex, "");
  files[extension] ??= 0;
  files[extension]++;
}

const fileArr = [];
for (const extension in files) {
  fileArr.push([extension + " " + files[extension]]);
}
fileArr.sort();
console.log(fileArr.join("\n"));
