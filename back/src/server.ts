import express from "express";
import serveIndex from "serve-index";
import morgan from "morgan";

import { api } from "./api";

const app = express();
const wwwDir = "../front/dist/front/browser";
const port = process.env.AGS_PORT || 3000;

app.use(morgan("tiny"));
app.use("/api", api);

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.get("/*", (req, res) => {
  res.sendFile("index.html", { root: wwwDir });
});

app.listen(3000, () => {
  console.log(`Successfully started on port ${port}`);
});
