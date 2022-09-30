import express from "express";
import nunjucks from "nunjucks";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import PDFDocument from "pdfkit";
import { createWriteStream } from "fs";
import { randomBytes } from "crypto";
import cors from "cors";
import formidable from "formidable";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pdf = new PDFDocument();

const converter = (images) => {
  const tocken = randomBytes(6).toString("hex");
  pdf.pipe(createWriteStream(`${tocken}_theflask.pdf`));
  images.forEach((element) => {
    pdf.addPage().image(element, {
      fit: [500, 400],
      align: "center",
      valign: "center",
    });
  });

  pdf.end();
};

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

nunjucks.configure(resolve(__dirname, "templates"), {
  express: app,
  autoscape: true,
  noCache: false,
});

app.get("/", function (req, res) {
  console.log("A New request encoutered", req.ip);
  res.render("./pages/home.html");
});

app.get("/bot", function (req, res) {
  console.log("A New request encoutered", req.ip);
  res.render("./pages/bot.html");
});
app.get("/converter", function (req, res) {
  console.log("A New request encoutered", req.ip);
  res.render("./pages/convert.html");
});

app.get("/about", function (req, res) {
  console.log("A New request encoutered", req.ip);
  res.render("./pages/about.html");
});

app.post("/convert", (req, res, next) => {
  const form = formidable({ multiples: true });
  let status;
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      status = false;
      return;
    }
    console.log({ files });
  });
  status = true;
  res.json({ status: status });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);
