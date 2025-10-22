import { readdirSync, readFileSync } from "fs";

try {
  const files = readdirSync(".");
  console.log("files: ", files);
  const content = readFileSync(files[0], "utf-8");
  console.log("content: ", content);
} catch (err) {
  console.log("err: ", err);
}
