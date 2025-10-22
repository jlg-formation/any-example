import { readdir, readFile } from "fs/promises";

try {
  const files = await readdir(".");
  console.log("files: ", files);
  const content = await readFile(files[0], "utf-8");
  console.log("content: ", content);
} catch (err) {
  console.log("err: ", err);
}
