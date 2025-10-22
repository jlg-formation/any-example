import { readdir, readFile } from "fs";

const promisify = (func) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      func(...args, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  };
};

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
