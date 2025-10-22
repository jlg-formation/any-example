import { readdir, readFile } from "fs";

readdir(".", (err, files) => {
  if (err) {
    console.log("err: ", err);
    return;
  }
  console.log("files: ", files);
  readFile(files[0], "utf-8", (err, content) => {
    if (err) {
      console.log("err: ", err);
      return;
    }
    console.log("content: ", content);
  });
});
