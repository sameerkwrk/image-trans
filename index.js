import express from "express";
import nunjucks from "nunjucks";
import { resolve } from "path";
import { fileURLToPath } from "url";
import converter from "./converter.js";
import { dirname } from "path";
import helmet from "helmet";
import cors from "cors";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(helmet());

nunjucks.configure(resolve(__dirname, "templates"), {
  express: app,
  autoscape: true,
  noCache: false,
});

app.get("/", function (req, res) {
  res.render("./pages/home.html");
});

app.get("/bot", function (req, res) {
  res.render("./pages/bot.html");
});
app.get("/converter", function (req, res) {
  res.render("./pages/convert.html");
});

app.get("/about", function (req, res) {
  res.render("./pages/about.html");
});

app.post("/convert", multer().array("photos", 10), (req, res, next) => {
  res.set({
    "Content-Type": "application/pdf",
  });
  converter(req.files, res);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The_flaSK Server Started At http://localhost:${PORT}/`);
});
