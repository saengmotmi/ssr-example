import express from "express";
import fs from "fs";
import path from "path";
import * as url from "url";
import { renderToString } from "react-dom/server";
import React from "react";
import App from "./App";
import { ServerStyleSheet } from "styled-components";

const app = express();
const html = fs.readFileSync(
  path.resolve(__dirname, "../dist/index.html"),
  "utf8"
);
app.use("/dist", express.static("dist"));

app.get("favicon.ico", (req, res) => res.sendStatus(204));
app.get("*", (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const page =
    parsedUrl.pathname && parsedUrl.pathname !== "/"
      ? parsedUrl.pathname.substr(1)
      : "home";

  const sheet = new ServerStyleSheet();
  const renderString = renderToString(sheet.collectStyles(<App page={page} />));
  const styles = sheet.getStyleTags();
  console.log(styles);
  const initialData = { page };
  const result = html
    .replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
    .replace("__DATA_FROM_SERVER__", JSON.stringify(initialData)) // head script에 server 측 주입
    .replace("__STYLE_FROM_SERVER__", styles); // head script에 데이터 주입

  res.send(result);
});

app.listen(3000);
