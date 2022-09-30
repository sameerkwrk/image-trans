import PDFDocument from "pdfkit";
import { createWriteStream } from "fs";
import { randomBytes } from "crypto";

const pdf = new PDFDocument();

const converter = (images) => {
  const tocken = randomBytes(64).toString("hex");
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
