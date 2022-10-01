import express from "express";
import nunjucks from "nunjucks";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import PDFDocument from "pdfkit";
import { randomBytes } from "crypto";
import sizeOf from "buffer-image-size";
import cors from "cors";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const converter = (images, res) => {
  const pdf = new PDFDocument({
    size: "a5",
    autoFirstPage: false,
  });
  const tocken = randomBytes(6).toString("hex") + ".pdf";
  pdf.info["Title"] = tocken;
  images.forEach((element) => {
    const dimensions = sizeOf(element.buffer);
    pdf.addPage().image(element.buffer, {
      align: "center",
      valign: "center",
      fit: [dimensions.height, dimensions.width],
    });
  });
  pdf.pipe(res);
  pdf.end();
};

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
  res.setHeader("Content-Type", "application/pdf");
  res.render("./pages/about.html");
});

app.post("/convert", multer().array("photos", 10), (req, res, next) => {
  converter(req.files, res);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The_flaSK Server Started At localhost:${PORT}/`);
});
