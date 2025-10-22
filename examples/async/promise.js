import { readdir, readFile } from "fs/promises";

readdir(".")
  .then((files) => {
    console.log("files: ", files);
    return readFile(files[0], "utf-8");
  })
  .then((content) => {
    console.log("content: ", content);
  })
  .catch((err) => {
    console.log("err: ", err);
  });
