import { readdir, readFile } from "fs";
import { promisify } from "util";

const readdirPromise = promisify(readdir);
const readFilePromise = promisify(readFile);

readdirPromise(".")
  .then((files) => {
    console.log("files: ", files);
    return readFilePromise(files[0], "utf-8");
  })
  .then((content) => {
    console.log("content: ", content);
  })
  .catch((err) => {
    console.log("err: ", err);
  });
